(function () {
  "use strict";

  var VERSIONS = ["1.0.0.6", "1.0.0.5", "1.0.0.4", "1.0.0.3", "1.0.0.2", "1.0.0.1", "1.0.0.0"];

  function parseVersion(v) {
    return String(v || "").split(".").map(function (n) { return parseInt(n, 10) || 0; });
  }

  function isBeforeOrEqual(a, b) {
    var pa = parseVersion(a), pb = parseVersion(b);
    for (var i = 0; i < 4; i++) {
      if ((pa[i] || 0) > (pb[i] || 0)) return false;
      if ((pa[i] || 0) < (pb[i] || 0)) return true;
    }
    return true;
  }

  var select = document.getElementById("version-select");
  if (!select) return;

  var pageSince = (document.querySelector('meta[name="since-version"]') || {}).content || VERSIONS[0];

  VERSIONS.forEach(function (v) {
    var opt = document.createElement("option");
    opt.value = v;
    opt.textContent = "v" + v;
    select.appendChild(opt);
  });

  var stored = null;
  try { stored = localStorage.getItem("fr-docs-version"); } catch (e) {}
  var selected = VERSIONS.indexOf(stored) !== -1 ? stored : VERSIONS[0];
  select.value = selected;

  function renderSinceBadge() {
    var main = document.querySelector("main");
    if (!main || main.querySelector(".since-badge")) return;
    var badge = document.createElement("p");
    badge.className = "since-badge";
    badge.textContent = "Since v" + pageSince;
    var bc = main.querySelector(".breadcrumb");
    if (bc && bc.nextSibling) {
      main.insertBefore(badge, bc.nextSibling);
    } else {
      main.insertBefore(badge, main.firstChild);
    }
  }

  function apply() {
    var v = select.value;

    // sidebar member links
    document.querySelectorAll("a.meth[data-since]").forEach(function (a) {
      a.style.display = isBeforeOrEqual(a.getAttribute("data-since"), v) ? "" : "none";
    });

    // sidebar type blocks (hide whole details if the type is not in this version)
    document.querySelectorAll("details[data-since]").forEach(function (d) {
      d.style.display = isBeforeOrEqual(d.getAttribute("data-since"), v) ? "" : "none";
    });

    // index tables + detailed member blocks
    document.querySelectorAll("tr[data-since], .member[data-since]").forEach(function (el) {
      el.style.display = isBeforeOrEqual(el.getAttribute("data-since"), v) ? "" : "none";
    });

    // if the current page's member is newer than the selected version, hide its content
    var main = document.querySelector("main");
    if (main) {
      var notice = main.querySelector(".version-notice");
      if (!isBeforeOrEqual(pageSince, v)) {
        main.classList.add("filtered");
        if (!notice) {
          notice = document.createElement("p");
          notice.className = "version-notice";
          main.insertBefore(notice, main.firstChild);
        }
        notice.textContent =
          "This page documents a member introduced in v" + pageSince +
          ", which is not available in the selected version v" + v + ".";
      } else {
        main.classList.remove("filtered");
        if (notice) notice.remove();
      }
    }
  }

  select.addEventListener("change", function () {
    try { localStorage.setItem("fr-docs-version", select.value); } catch (e) {}
    apply();
  });

  renderSinceBadge();
  apply();
})();