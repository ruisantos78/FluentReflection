// FluentReflection.NET docs SPA.
// Renders all content from the JS data globals defined in ./data (see scripts/convert.py).
// The data files are loaded via <script> tags in index.html, so the site works over
// both file:// and HTTPS with no build step and no fetch()/CORS issues.
(function () {
  "use strict";

  var api = window.FR_API;
  var types = window.FR_TYPES || {};  // name -> type data
  var currentVersion = null;
  var state = { type: null, member: null };

  // ---------- helpers ----------
  function isBeforeOrEqual(a, b) {
    var pa = (a || "").split(".").map(function (n) { return parseInt(n, 10) || 0; });
    var pb = (b || "").split(".").map(function (n) { return parseInt(n, 10) || 0; });
    for (var i = 0; i < 4; i++) {
      if ((pa[i] || 0) > (pb[i] || 0)) return false;
      if ((pa[i] || 0) < (pb[i] || 0)) return true;
    }
    return true;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function memberKey(m) {
    if (m.href) return m.href.replace(/\.html$/, "");
    // properties and members without a page: slugify the name
    return "prop-" + m.name.replace(/[^A-Za-z0-9]+/g, "-").toLowerCase();
  }

  function typeInVersion(typeName) {
    var t = types[typeName];
    return t && isBeforeOrEqual(t.since, currentVersion);
  }

  function memberInVersion(m) {
    return isBeforeOrEqual(m.since, currentVersion);
  }

  // ---------- data (loaded synchronously via <script> globals) ----------

  // ---------- version dropdown ----------
  function initVersion() {
    var select = document.getElementById("version-select");
    api.versions.forEach(function (v) {
      var opt = document.createElement("option");
      opt.value = v;
      opt.textContent = "v" + v;
      select.appendChild(opt);
    });
    var stored = null;
    try { stored = localStorage.getItem("fr-docs-version"); } catch (e) {}
    var selected = api.versions.indexOf(stored) !== -1 ? stored : api.versions[0];
    select.value = selected;
    currentVersion = selected;
    select.addEventListener("change", function () {
      currentVersion = select.value;
      try { localStorage.setItem("fr-docs-version", currentVersion); } catch (e) {}
      buildSidebar();
      render();
    });
  }

  // ---------- sidebar ----------
  function buildSidebar() {
    var tree = document.getElementById("sidebar-tree");
    tree.innerHTML = "";
    api.namespaces.forEach(function (ns) {
      var visibleTypes = ns.types.filter(typeInVersion);
      if (!visibleTypes.length) return;
      var nl = document.createElement("div");
      nl.className = "ns-label";
      nl.textContent = ns.name;
      tree.appendChild(nl);

      visibleTypes.forEach(function (tn) {
        var t = types[tn];
        var details = document.createElement("details");
        details.setAttribute("data-since", t.since);

        var summary = document.createElement("summary");
        var link = document.createElement("a");
        link.className = "cls";
        link.href = "#/" + encodeURIComponent(tn);
        link.textContent = t.name;
        summary.appendChild(link);
        details.appendChild(summary);

        var branch = document.createElement("div");
        branch.className = "tree-branch";
        t.members.forEach(function (m) {
          if (!memberInVersion(m)) return;
          var a = document.createElement("a");
          a.className = "meth";
          a.href = "#/" + encodeURIComponent(tn) + "/" + encodeURIComponent(memberKey(m));
          a.setAttribute("data-since", m.since);
          a.setAttribute("data-key", memberKey(m));
          a.textContent = m.name;
          branch.appendChild(a);
        });
        details.appendChild(branch);

        // open + highlight the active type/member
        if (state.type === tn) {
          details.open = true;
          link.classList.add("active");
          if (state.member) {
            var act = branch.querySelector('a[data-key="' + cssEscape(state.member) + '"]');
            if (act) act.classList.add("active");
          }
        }
        tree.appendChild(details);
      });
    });
  }

  function cssEscape(s) {
    return String(s).replace(/["\\]/g, "\\$&");
  }

  // ---------- renderers ----------
  function sectionHtml(sections) {
    return (sections || []).map(function (s) {
      var out = "<h2>" + esc(s.heading) + "</h2>" + s.html;
      return out;
    }).join("");
  }

  function memberSummaryTable(typeName) {
    var t = types[typeName];
    var rows = t.members.filter(memberInVersion).map(function (m) {
      return '<tr data-since="' + esc(m.since) + '"><td><a href="#/' + encodeURIComponent(typeName) +
             '/' + encodeURIComponent(memberKey(m)) + '"><code>' + esc(m.name) + "</code></a></td>" +
             "<td>" + esc(m.return) + "</td><td>" + esc(m.desc) + "</td></tr>";
    }).join("\n");
    if (!rows) return "";
    return "<h2>Methods</h2><table><tr><th>Name</th><th>Return</th><th>Description</th></tr>\n" +
           rows + "\n</table>";
  }

  function propertyBlocks(typeName) {
    var t = types[typeName];
    if (!t.properties || !t.properties.length) return "";
    var props = t.properties.filter(memberInVersion);
    if (!props.length) return "";

    var summary = props.map(function (p) {
      return '<tr data-since="' + esc(p.since) + '"><td><a href="#/' + encodeURIComponent(typeName) +
             '/' + encodeURIComponent(memberKey(p)) + '"><code>' + esc(p.name) + "</code></a></td>" +
             "<td>" + esc(p.declaration) + "</td><td>" + esc(p.desc) + "</td></tr>";
    }).join("\n");

    var detailed = props.map(function (p) {
      return '<div class="member" data-since="' + esc(p.since) + '" id="' + esc(memberKey(p)) + '">' +
             "<h3>" + esc(p.name) + "</h3>" +
             '<div class="declaration"><pre><code>' + esc(p.declaration) + "</code></pre></div>" +
             "<p>" + esc(p.desc) + "</p></div>";
    }).join("\n");

    return "<h2>Properties</h2><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n" +
           summary + "\n</table><h2>Properties (Detailed)</h2>" + detailed;
  }

  function renderHome() {
    var main = document.getElementById("content");
    main.innerHTML =
      "<h2>FluentReflection.NET</h2>" +
      "<p>An expressive, fluent reflection API for .NET 10 that exposes private, internal, and public " +
      "members (fields, backing fields, properties, methods, and events) to make unit testing easier — " +
      "no internal constructors or <code>[InternalsVisibleTo]</code> required.</p>" +
      renderInstall() +
      renderTypesTable() +
      "<h2>Quick Example</h2><div class=\"card\"><pre><code>using FluentReflection;\n\n" +
      "var name   = Class.Of(obj).Property(\"Name\").Get&lt;string&gt;();\n" +
      "var count  = Class.Of(obj).Field(\"_count\").Get&lt;int&gt;();\n" +
      "var result = Class.Of(obj).Method(\"HiddenMethod\").Invoke&lt;string&gt;(\"arg\");\n" +
      "var subs   = Class.Of(obj).Event(\"Changed\").GetInvocationList();</code></pre></div>";
  }

  function renderInstall() {
    var id = api.install.id;
    var cmd = [
      { key: "dotnet-cli", label: ".NET CLI", script: "dotnet add package " + id, header: "" },
      { key: "package-manager", label: "PMC", script: "NuGet\\Install-Package " + id, header: "",
        note: "This command is intended to be used within the Package Manager Console in Visual Studio, as it uses the NuGet module's version of <a href=\"https://docs.microsoft.com/nuget/reference/ps-reference/ps-ref-install-package\" target=\"_blank\" rel=\"noopener\">Install-Package</a>." },
      { key: "package-reference", label: "PackageReference", script: "&lt;PackageReference Include=\"" + id + "\" /&gt;", header: "",
        note: "For projects that support <a href=\"https://docs.microsoft.com/nuget/consume-packages/package-references-in-project-files\" target=\"_blank\" rel=\"noopener\">PackageReference</a>, copy this XML node into the project file to reference the package." },
      { key: "package-version", label: "CPM", script: "&lt;PackageVersion Include=\"" + id + "\" /&gt;", header: "Directory.Packages.props",
        script2: "&lt;PackageReference Include=\"" + id + "\" /&gt;", header2: "Project file",
        note: "For projects that support <a href=\"https://learn.microsoft.com/en-us/nuget/consume-packages/central-package-management\" target=\"_blank\" rel=\"noopener\">Central Package Management (CPM)</a>, copy this XML node into the solution Directory.Packages.props file to version the package." },
      { key: "paket-cli", label: "Paket CLI", script: "paket add " + id, header: "",
        warn: "The NuGet Team does not provide support for this client. Please contact its <a href=\"https://fsprojects.github.io/Paket/contact.html\" target=\"_blank\" rel=\"noopener\">maintainers</a> for support." },
      { key: "script-interactive", label: "Script & Interactive", script: "#r \"nuget: " + id + "\"", header: "",
        note: "#r directive can be used in F# Interactive and Polyglot Notebooks. Copy this into the interactive tool or source code of the script to reference the package." },
      { key: "dotnet-run-file", label: "File-Based Apps", script: "#:package " + id, header: "",
        note: "#:package directive can be used in C# file-based apps starting in .NET 10 preview 4. Copy this into a .cs file before any lines of code to reference the package." },
      { key: "cake", label: "Cake", script: "#addin nuget:?package=" + id, header: "Install as a Cake Addin",
        script2: "#tool nuget:?package=" + id, header2: "Install as a Cake Tool",
        warn: "The NuGet Team does not provide support for this client. Please contact its <a href=\"https://cakebuild.net/support/nuget\" target=\"_blank\" rel=\"noopener\">maintainers</a> for support." }
    ];

    var tabs = '<ul class="nav nav-tabs" role="tablist">';
    var panes = "";
    cmd.forEach(function (c, i) {
      tabs += '<li role="presentation"' + (i === 0 ? ' class="active"' : "") + '><a href="#' + c.key +
              '" id="' + c.key + '-tab" class="package-manager-tab" aria-selected="' + (i === 0) +
              '" tabindex="' + (i === 0 ? "0" : "-1") + '" aria-controls="' + c.key +
              '" role="tab" data-toggle="tab">' + esc(c.label) + "</a></li>";
      var rows = '<div class="install-script-row"><pre class="install-script" id="' + c.key +
                 '-0001-text"><span class="install-command-row">' + c.script + "</span></pre>" +
                 '<div class="copy-button">' + (c.header ? '<span class="package-manager-command-header">' + esc(c.header) + "</span>" : "") +
                 '<button id="' + c.key + '-0001-button" class="btn btn-brand-icon" type="button" aria-label="Copy command"><span aria-hidden="true"></span><span>Copy</span></button></div></div>';
      if (c.script2) {
        rows += '<div class="install-script-row"><pre class="install-script" id="' + c.key +
                '-0002-text"><span class="install-command-row">' + c.script2 + "</span></pre>" +
                '<div class="copy-button">' + (c.header2 ? '<span class="package-manager-command-header">' + esc(c.header2) + "</span>" : "") +
                '<button id="' + c.key + '-0002-button" class="btn btn-brand-icon" type="button" aria-label="Copy command"><span aria-hidden="true"></span><span>Copy</span></button></div></div>';
      }
      if (c.note) rows += '<div class="icon-text alert alert-brand-info"><i aria-hidden="true"></i> ' + c.note + "</div>";
      if (c.warn) rows += '<div class="icon-text alert alert-brand-warning" role="alert" aria-live="assertive"><i aria-hidden="true"></i> ' + c.warn + "</div>";
      panes += '<div role="tabpanel" class="tab-pane' + (i === 0 ? " active" : "") + '" id="' + c.key + '">' + rows + "</div>";
    });
    tabs += "</ul>";

    return '<div class="card install"><div class="install-body">' +
           "<h3>Install from NuGet</h3>" +
           "<p>Package: <a href=\"" + esc(api.install.url) + "\" target=\"_blank\" rel=\"noopener\">" + esc(id) + "</a></p>" +
           '<div class="install-tabs">' + tabs + '<div class="tab-content">' + panes + "</div></div></div></div>";
  }

  function renderTypesTable() {
    var rows = [];
    api.namespaces.forEach(function (ns) {
      ns.types.filter(typeInVersion).forEach(function (tn) {
        var t = types[tn];
        rows.push('<tr data-since="' + esc(t.since) + '"><td><a href="#/' + encodeURIComponent(tn) +
                  '">' + esc(tn) + "</a></td><td>" + esc(t.kind) + "</td><td>" + esc(typeDescription(tn)) + "</td></tr>");
      });
    });
    return "<h2>Types</h2><table><tr><th>Type</th><th>Kind</th><th>Description</th></tr>\n" +
           rows.join("\n") + "\n</table>";
  }

  function typeDescription(tn) {
    var t = types[tn];
    if (tn === "Class") return "Static factory providing entry points into the fluent API.";
    if (tn === "IClass") return "Fluent wrapper over a class or instance exposing member accessors.";
    if (tn === "IFieldAccessor") return "Reads and writes field and backing-field values.";
    if (tn === "IPropertyAccessor") return "Reads and writes property and backing-field values.";
    if (tn === "IMethodAccessor") return "Invokes synchronous and asynchronous methods.";
    if (tn === "IEventAccessor") return "Inspects, subscribes to, and unsubscribes from events.";
    if (tn === "ObjectExtensions") return "Extension methods for objects, types, and assemblies.";
    return t.kind;
  }

  function renderType(typeName) {
    var t = types[typeName];
    if (!t) { renderNotFound(); return; }
    var main = document.getElementById("content");
    var sinceBadge = '<p class="since-badge">Since v' + esc(t.since) + "</p>";
    main.innerHTML =
      '<nav class="breadcrumb"><a href="#/">Home</a> &#9654; <b>' + esc(typeName) + "</b></nav>" +
      sinceBadge +
      "<h2>" + esc(typeName) + " Class</h2>" +
      '<div class="declaration"><pre><code>' + esc(t.declaration) + "</code></pre></div>" +
      '<p class="overline">' + esc(t.overline) + "</p>" +
      sectionHtml(t.sections) +
      propertyBlocks(typeName) +
      memberSummaryTable(typeName) +
      '<p class="back"><a href="#/">&#8592; Back to Home</a></p>';
  }

  function renderMember(typeName, key) {
    var t = types[typeName];
    if (!t) { renderNotFound(); return; }
    var m = null;
    t.members.forEach(function (mm) { if (memberKey(mm) === key) m = mm; });
    t.properties.forEach(function (mm) { if (memberKey(mm) === key) m = mm; });
    if (!m) { renderNotFound(); return; }

    var main = document.getElementById("content");
    var title = m.name + " " + m.kind;
    main.innerHTML =
      '<nav class="breadcrumb"><a href="#/">Home</a> &#9654; <a href="#/' + encodeURIComponent(typeName) +
      '">' + esc(typeName) + "</a> &#9654; <b>" + esc(m.name) + "</b></nav>" +
      '<p class="since-badge">Since v' + esc(m.since) + "</p>" +
      "<h2>" + esc(title) + "</h2>" +
      '<div class="declaration"><pre><code>' + esc(m.declaration) + "</code></pre></div>" +
      '<p class="overline">' + esc(typeName) + (m.overline ? " &#183; " + esc(m.overline) : "") + "</p>" +
      sectionHtml(m.sections) +
      '<p class="back"><a href="#/' + encodeURIComponent(typeName) + '">&#8592; Back to ' + esc(typeName) + "</a></p>";
  }

  function renderNotFound() {
    document.getElementById("content").innerHTML =
      "<h2>Page not found</h2><p>The requested documentation page does not exist.</p>" +
      '<p class="back"><a href="#/">&#8592; Back to Home</a></p>';
  }

  // ---------- routing ----------
  function parseHash() {
    var hash = window.location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/").filter(Boolean).map(decodeURIComponent);
    state = { type: parts[0] || null, member: parts[1] || null };
  }

  function render() {
    parseHash();
    buildSidebar();
    var main = document.getElementById("content");
    if (!state.type) {
      renderHome();
    } else if (state.member) {
      renderMember(state.type, state.member);
    } else {
      renderType(state.type);
    }
    bindInstall();
    scrollToTop();
  }

  function scrollToTop() { window.scrollTo(0, 0); }

  // ---------- install tabs + copy ----------
  function bindInstall() {
    document.querySelectorAll(".install-tabs .package-manager-tab").forEach(function (tab) {
      tab.addEventListener("click", function (e) {
        e.preventDefault();
        var targetId = tab.getAttribute("href").substring(1);
        var container = tab.closest(".install-tabs");
        container.querySelectorAll(".nav-tabs li").forEach(function (li) {
          li.classList.remove("active");
          var link = li.querySelector("a");
          if (link) { link.setAttribute("aria-selected", "false"); link.setAttribute("tabindex", "-1"); }
        });
        tab.parentElement.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        tab.setAttribute("tabindex", "0");
        container.querySelectorAll(".tab-pane").forEach(function (pane) {
          pane.classList.toggle("active", pane.id === targetId);
        });
      });
    });

    document.querySelectorAll(".copy-button button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var row = btn.closest(".install-script-row");
        if (!row) return;
        var script = row.querySelector(".install-script");
        if (!script) return;
        var textToCopy = script.textContent.replace("Copy", "").trim();
        navigator.clipboard.writeText(textToCopy).then(function () {
          var span = btn.querySelector("span:last-child");
          var originalText = span ? span.textContent : "Copy";
          if (span) span.textContent = "Copied!";
          btn.classList.add("copied");
          setTimeout(function () {
            if (span) span.textContent = originalText;
            btn.classList.remove("copied");
          }, 2000);
        }).catch(function (err) { console.error("Copy failed: ", err); });
      });
    });
  }

  // ---------- search ----------
  function buildSearchIndex() {
    var idx = [];
    api.namespaces.forEach(function (ns) {
      ns.types.forEach(function (tn) {
        var t = types[tn];
        idx.push({ path: tn, label: t.name, desc: typeDescription(tn), kind: t.kind, since: t.since });
        t.members.forEach(function (m) {
          idx.push({ path: tn, label: m.name, desc: m.desc || "", kind: m.kind, since: m.since, key: memberKey(m) });
        });
        (t.properties || []).forEach(function (m) {
          idx.push({ path: tn, label: m.name, desc: m.desc || "", kind: "Property", since: m.since, key: memberKey(m) });
        });
      });
    });
    return idx;
  }

  function initSearch() {
    var input = document.getElementById("search");
    var results = document.getElementById("search-results");
    if (!input || !results) return;
    var index = buildSearchIndex();

    function show(hits) {
      if (!hits.length) {
        results.innerHTML = '<div class="no-result">No results</div>';
        results.hidden = false;
        return;
      }
      results.innerHTML = hits.map(function (h) {
        var href = h.key
          ? "#/" + encodeURIComponent(h.path) + "/" + encodeURIComponent(h.key)
          : "#/" + encodeURIComponent(h.path);
        return '<a href="' + href + '"><span class="r-kind">' + esc(h.kind) + "</span>" +
               '<span class="r-label">' + esc(h.label) + "</span></a>";
      }).join("");
      results.hidden = false;
    }

    input.addEventListener("input", function () {
      var term = input.value.trim().toLowerCase();
      if (!term) { results.hidden = true; return; }
      var hits = index.filter(function (e) {
        return (e.label + " " + e.desc + " " + e.path).toLowerCase().indexOf(term) !== -1;
      }).filter(function (e) { return isBeforeOrEqual(e.since, currentVersion); }).slice(0, 24);
      show(hits);
    });

    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") {
        var first = results.querySelector("a");
        if (first) { window.location.hash = first.getAttribute("href"); results.hidden = true; }
      } else if (ev.key === "Escape") {
        input.value = ""; results.hidden = true; input.blur();
      }
    });

    document.addEventListener("click", function (ev) {
      if (!results.contains(ev.target) && ev.target !== input) results.hidden = true;
    });
  }

  // ---------- boot ----------
  document.addEventListener("DOMContentLoaded", function () {
    var main = document.getElementById("content");
    if (!api || !Object.keys(types).length) {
      main.innerHTML = "<h2>Failed to load documentation</h2>" +
        "<p>The documentation data files were not loaded. Open this site over HTTP/HTTPS " +
        "(e.g. via GitHub Pages) rather than directly from the local file system.</p>";
      return;
    }
    var fv = document.getElementById("footer-version");
    if (fv) fv.textContent = "v" + api.current;
    initVersion();
    initSearch();
    window.addEventListener("hashchange", render);
    render();
  });
})();