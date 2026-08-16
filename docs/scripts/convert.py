#!/usr/bin/env python3
"""One-time migration: converts the hand-authored static HTML docs into
canonical JS data files consumed by the docs SPA. Each file assigns a JSON
literal to a global so the docs load over both file:// and HTTPS via <script>
tags (no fetch, no build step).

Outputs:
  docs/data/api.js           -> window.FR_API: registry, versions, namespaces, install
  docs/data/<Type>.js        -> window.FR_TYPES["<Type>"]: per public type
"""
import json
import re
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent  # docs/
DATA = ROOT / "data"
DATA.mkdir(exist_ok=True)

TYPE_META = {
    "Class": ("FluentReflection", "Static Class"),
    "IClass": ("FluentReflection", "Interface"),
    "IFieldAccessor": ("FluentReflection.Accessors", "Interface"),
    "IPropertyAccessor": ("FluentReflection.Accessors", "Interface"),
    "IMethodAccessor": ("FluentReflection.Accessors", "Interface"),
    "IEventAccessor": ("FluentReflection.Accessors", "Interface"),
    "ObjectExtensions": ("FluentReflection.Extensions", "Static Class"),
}

# Preserve the sidebar ordering defined by the current docs (namespace order).
NS_ORDER = ["FluentReflection", "FluentReflection.Accessors", "FluentReflection.Extensions"]


def code_text(soup_el):
    c = soup_el.select_one("pre code") if soup_el else None
    return c.get_text() if c else ""


def overline_text(soup_el):
    if soup_el is None:
        return ""
    return soup_el.get_text(strip=True)


def collect_sections(main):
    """Iterate the main container and group content into ordered sections
    keyed by their preceding <h2>. Returns (title_h2, breadcrumb, declaration,
    overline, [ {heading, html} ])."""
    title_el = None
    bc_el = None
    decl_el = None
    ov_el = None
    sections = []
    current = None
    h2_count = 0

    for el in main.find_all(recursive=False):
        tag = el.name
        if tag == "nav" and "breadcrumb" in (el.get("class") or []):
            bc_el = el
            continue
        if tag == "h2":
            h2_count += 1
            if h2_count == 1:
                title_el = el  # first h2 is the page title
                continue
            current = {"heading": el.get_text(" ", strip=True), "html": []}
            sections.append(current)
            continue
        # Declaration + overline belong to the header (before the first section h2).
        if h2_count <= 1:
            if tag == "div" and "declaration" in (el.get("class") or []):
                decl_el = el
                continue
            if tag == "p" and "overline" in (el.get("class") or []):
                ov_el = el
                continue
        if tag == "p" and "back" in (el.get("class") or []):
            continue
        if current is not None:
            current["html"].append(str(el))
        else:
            # Content that appears before any section heading after the title
            # (e.g. intro). Attach to a synthetic section.
            current = {"heading": "Overview", "html": [str(el)]}
            sections.append(current)

    result = {
        "title": title_el.get_text(" ", strip=True) if title_el else "",
        "breadcrumb": str(bc_el) if bc_el else "",
        "declaration": code_text(decl_el) if decl_el else "",
        "overline": overline_text(ov_el) if ov_el else "",
        "sections": [],
    }
    for s in sections:
        if s["html"]:
            result["sections"].append({"heading": s["heading"], "html": "".join(s["html"])})
    return result


def parse_type_index(dir_path, type_name):
    idx = dir_path / "index.html"
    soup = BeautifulSoup(idx.read_text(encoding="utf-8"), "html.parser")
    main = soup.find("main")
    info = collect_sections(main)

    since = "1.0.0.0"
    meta = soup.find("meta", attrs={"name": "since-version"})
    if meta:
        since = meta.get("content") or since

    # Parse the member summary tables (Properties / Methods / Fields / Events).
    members = []
    for table in main.find_all("table"):
        head = table.find("tr")
        if not head:
            continue
        cols = [th.get_text(strip=True) for th in head.find_all("th")]
        if cols[:1] != ["Name"]:
            continue
        rows = table.find_all("tr")[1:]
        kind = "Member"
        # infer kind from header set
        if "Return" in cols:
            kind = "Method"
        elif "Type" in cols and "Description" in cols:
            kind = "Property"
        for tr in rows:
            tds = tr.find_all("td")
            a = tds[0].find("a")
            href = a.get("href") if a else ""
            if not href:
                # Skip summary rows without a link (e.g. inline property rows);
                # detailed properties are captured separately from div.member.
                continue
            name = a.get_text() if a else tds[0].get_text()
            r_since = tr.get("data-since") or since
            members.append({
                "name": name.strip(),
                "kind": kind,
                "since": r_since,
                "href": href,
                "return": tds[1].get_text(strip=True) if len(tds) > 1 else "",
                "desc": tds[2].get_text(strip=True) if len(tds) > 2 else "",
            })

    namespace, kind = TYPE_META[type_name]

    # Strip summary sections that are rendered dynamically from structured data:
    # Properties / Properties (Detailed) -> propertyBlocks
    # Methods / Fields / Events -> memberSummaryTable
    info["sections"] = [
        s for s in info["sections"]
        if s["heading"] not in ("Properties", "Properties (Detailed)", "Methods", "Fields", "Events")
    ]

    # Extract detailed properties from "Properties (Detailed)" style blocks
    # (<div class="member">), which are not separate pages.
    properties = []
    for div in main.find_all("div", class_="member"):
        h3 = div.find("h3")
        if not h3:
            continue
        p_since = div.get("data-since") or since
        decl = code_text(div)
        # description is the first plain paragraph after the declaration
        desc_p = None
        for p in div.find_all("p", recursive=False):
            if "emphasized" not in (p.get("class") or []):
                desc_p = p.get_text(" ", strip=True)
                break
        properties.append({
            "name": h3.get_text(strip=True),
            "since": p_since,
            "declaration": decl,
            "desc": desc_p or "",
            "id": h3.get("id") or h3.get_text(strip=True),
        })

    return {
        "name": type_name,
        "namespace": namespace,
        "kind": kind,
        "since": since,
        "declaration": info["declaration"],
        "overline": info["overline"],
        "sections": info["sections"],
        "members": members,
        "properties": properties,
    }


def parse_member_page(path, type_name):
    soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
    main = soup.find("main")
    info = collect_sections(main)

    since = "1.0.0.0"
    meta = soup.find("meta", attrs={"name": "since-version"})
    if meta:
        since = meta.get("content") or since

    # title like "Of(object instance) Method"
    title = info["title"]
    kind = "Method"
    m = re.match(r"^(.*)\s(Method|Property|Field|Event|Constructor)\s*$", title)
    name = title
    if m:
        name = m.group(1).strip()
        kind = m.group(2)

    return {
        "name": name,
        "kind": kind,
        "since": since,
        "declaration": info["declaration"],
        "overline": info["overline"],
        "sections": info["sections"],
    }


def main():
    versions = []
    all_types = {}
    ns_map = {ns: [] for ns in NS_ORDER}

    # Build version list from api.js (generated by this script) if version.js missing.
    api_js = ROOT / "data" / "api.js"
    if api_js.exists():
        m = re.search(r'"versions"\s*:\s*\[([^\]]*)\]', api_js.read_text(encoding="utf-8"))
        if m:
            versions = [v.strip().strip('"\'') for v in m.group(1).split(",")]
    else:
        vjs = ROOT / "js" / "version.js"
        if vjs.exists():
            m = re.search(r'VERSIONS\s*=\s*\[([^\]]*)\]', vjs.read_text(encoding="utf-8"))
            if m:
                versions = [v.strip().strip('"\'') for v in m.group(1).split(",")]

    for dir_path in sorted(ROOT.iterdir()):
        if not dir_path.is_dir() or not (dir_path / "index.html").exists():
            continue
        type_name = dir_path.name
        if type_name not in TYPE_META:
            continue

        type_data = parse_type_index(dir_path, type_name)

        # Attach detailed member data from each member page.
        detailed = {}
        for mp in dir_path.glob("*.html"):
            if mp.name == "index.html":
                continue
            d = parse_member_page(mp, type_name)
            key = mp.stem
            detailed[key] = d

        # Merge member summaries with details.
        merged_members = []
        for mem in type_data["members"]:
            key = mem["href"].replace(".html", "")
            if key in detailed:
                det = detailed.pop(key)
                merged_members.append({**mem, **det})
            else:
                merged_members.append(mem)
        # Any remaining detail pages (members not listed in index table).
        for key, det in detailed.items():
            merged_members.append(det)

        type_data["members"] = merged_members
        all_types[type_name] = type_data
        ns_map[type_data["namespace"]].append(type_name)

        # Write per-type data file. Emitted as a JS global (loaded via <script>)
        # so the docs work over file:// as well as HTTPS, with no build step.
        # The payload is a JSON literal, so the file remains trivially editable.
        with (DATA / f"{type_name}.js").open("w", encoding="utf-8") as f:
            f.write("window.FR_TYPES = window.FR_TYPES || {};\n")
            f.write("window.FR_TYPES[")
            f.write(json.dumps(type_name))
            f.write("] = ")
            json.dump(type_data, f, indent=2, ensure_ascii=False)
            f.write(";\n")

    namespaces = [{"name": ns, "types": ns_map[ns]} for ns in NS_ORDER]

    # docs/index.html install metadata
    home = ROOT / "index.html"
    meta = None
    if home.exists():
        hsoup = BeautifulSoup(home.read_text(encoding="utf-8"), "html.parser")
        meta = hsoup.find("meta", attrs={"name": "documentation-version"})
    current = meta.get("content") if meta else (versions[0] if versions else "1.0.0.6")

    api = {
        "versions": versions,
        "current": current,
        "namespaces": namespaces,
        "install": {
            "id": "FluentReflection.NET",
            "url": "https://www.nuget.org/packages/FluentReflection.NET",
        },
    }
    with (DATA / "api.js").open("w", encoding="utf-8") as f:
        f.write("window.FR_API = ")
        json.dump(api, f, indent=2, ensure_ascii=False)
        f.write(";\n")

    print(f"Converted {len(all_types)} types -> {DATA}")
    print("Versions:", versions)


if __name__ == "__main__":
    main()