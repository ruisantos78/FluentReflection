// Client-side search for FluentReflection.NET docs.
var SEARCH_INDEX = [
  {path:"Class/index.html",label:"Class",desc:"Static factory providing entry points into the fluent API.",kind:"Static Class"},
  {path:"Class/of-object.html",label:"Of(object instance)",desc:"Wraps an instance object using its runtime type.",kind:"Method"},
  {path:"Class/of-type.html",label:"Of(Type type)",desc:"Wraps a target static type.",kind:"Method"},
  {path:"Class/of-tclass.html",label:"Of&lt;TClass&gt;()",desc:"Wraps a generic static type.",kind:"Method"},
  {path:"Class/of-tclass-object.html",label:"Of&lt;TClass&gt;(object instance)",desc:"Wraps an instance enforcing an explicit target type.",kind:"Method"},
  {path:"Class/from-string.html",label:"From(string typeName)",desc:"Resolves a type by name across all loaded assemblies.",kind:"Method"},
  {path:"Class/from-assembly-string.html",label:"From(Assembly assembly, string typeName)",desc:"Resolves a type by name in a specific assembly.",kind:"Method"},
  {path:"IClass/index.html",label:"IClass",desc:"Fluent wrapper over a class or instance exposing member accessors.",kind:"Interface"},
  {path:"IClass/property.html",label:"Property(string name)",desc:"Gets a property accessor.",kind:"Method"},
  {path:"IClass/field.html",label:"Field(string name)",desc:"Gets a field accessor.",kind:"Method"},
  {path:"IClass/method.html",label:"Method(string name)",desc:"Gets a method accessor.",kind:"Method"},
  {path:"IClass/event.html",label:"Event(string name)",desc:"Gets an event accessor.",kind:"Method"},
  {path:"IClass/getinvocationlist.html",label:"GetInvocationList(string name)",desc:"Gets event subscribers by name.",kind:"Method"},
  {path:"IClass/get-tvalue.html",label:"Get&lt;TValue&gt;(string name)",desc:"Gets a member value by name.",kind:"Method"},
  {path:"IClass/get-object.html",label:"Get(string name)",desc:"Gets a member value as object.",kind:"Method"},
  {path:"IClass/set.html",label:"Set(string name, object? value)",desc:"Sets a member value by name.",kind:"Method"},
  {path:"IClass/invoke.html",label:"Invoke(string name, params object?[] args)",desc:"Invokes a void-returning method.",kind:"Method"},
  {path:"IClass/invoke-tresult.html",label:"Invoke&lt;TResult&gt;(string name, params object?[] args)",desc:"Invokes a returning method.",kind:"Method"},
  {path:"IClass/invokeasync.html",label:"InvokeAsync(string name, params object?[] args)",desc:"Invokes an async Task method.",kind:"Method"},
  {path:"IClass/invokeasync-tresult.html",label:"InvokeAsync&lt;TResult&gt;(string name, params object?[] args)",desc:"Invokes an async Task&lt;TResult&gt; method.",kind:"Method"},
  {path:"IFieldAccessor/index.html",label:"IFieldAccessor",desc:"Reads and writes field and backing-field values.",kind:"Interface"},
  {path:"IFieldAccessor/get-tvalue.html",label:"Get&lt;TValue&gt;()",desc:"Gets the field value cast to <code>TValue</code>.",kind:"Method"},
  {path:"IFieldAccessor/get-object.html",label:"Get()",desc:"Gets the field value as an object.",kind:"Method"},
  {path:"IFieldAccessor/set.html",label:"Set(object? value)",desc:"Sets the field value.",kind:"Method"},
  {path:"IPropertyAccessor/index.html",label:"IPropertyAccessor",desc:"Reads and writes property and backing-field values.",kind:"Interface"},
  {path:"IPropertyAccessor/get-tvalue.html",label:"Get&lt;TValue&gt;()",desc:"Gets the property value cast to <code>TValue</code>.",kind:"Method"},
  {path:"IPropertyAccessor/get-object.html",label:"Get()",desc:"Gets the property value as an object.",kind:"Method"},
  {path:"IPropertyAccessor/set.html",label:"Set(object? value)",desc:"Sets the property value.",kind:"Method"},
  {path:"IMethodAccessor/index.html",label:"IMethodAccessor",desc:"Invokes synchronous and asynchronous methods.",kind:"Interface"},
  {path:"IMethodAccessor/invoke.html",label:"Invoke(params object?[] args)",desc:"Invokes a void-returning method.",kind:"Method"},
  {path:"IMethodAccessor/invoke-tresult.html",label:"Invoke&lt;TResult&gt;(params object?[] args)",desc:"Invokes a method returning <code>TResult</code>.",kind:"Method"},
  {path:"IMethodAccessor/invokeasync.html",label:"InvokeAsync(params object?[] args)",desc:"Invokes an async method returning <code>Task</code>.",kind:"Method"},
  {path:"IMethodAccessor/invokeasync-tresult.html",label:"InvokeAsync&lt;TResult&gt;(params object?[] args)",desc:"Invokes an async method returning <code>Task&lt;TResult&gt;</code>.",kind:"Method"},
  {path:"IEventAccessor/index.html",label:"IEventAccessor",desc:"Inspects events and their subscribers.",kind:"Interface"},
  {path:"IEventAccessor/getinvocationlist.html",label:"GetInvocationList()",desc:"Gets the invocation list of delegates subscribed to the event.",kind:"Method"},
  {path:"ObjectExtensions/index.html",label:"ObjectExtensions",desc:"Extension methods for objects, types, and assemblies.",kind:"Static Class"},
  {path:"ObjectExtensions/asclass-object.html",label:"AsClass(this object instance)",desc:"Wraps an instance object into an <code>IClass</code> wrapper.",kind:"Method"},
  {path:"ObjectExtensions/asclass-type.html",label:"AsClass(this Type type)",desc:"Wraps a <code>Type</code> into an <code>IClass</code> wrapper for static access.",kind:"Method"},
  {path:"ObjectExtensions/asclass-assembly-string.html",label:"AsClass(this Assembly assembly, string typeName)",desc:"Searches an assembly for a type and returns a wrapper.",kind:"Method"}
];

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", function () {
  var input = document.getElementById("search");
  var results = document.getElementById("search-results");
  if (!input || !results) return;

  // Compute the docs-root prefix relative to the current page from the Home link.
  var prefix = "";
  var home = document.querySelector("nav.sidebar a.home");
  if (home) {
    var h = home.getAttribute("href");
    prefix = h.substring(0, h.lastIndexOf("/") + 1);
  }

  input.addEventListener("input", function () {
    var term = input.value.trim().toLowerCase();
    if (!term) { results.hidden = true; return; }
    var hits = SEARCH_INDEX.filter(function (e) {
      return (e.label + " " + e.desc + " " + e.path).toLowerCase().indexOf(term) !== -1;
    }).slice(0, 24);
    if (!hits.length) {
      results.innerHTML = '<div class="no-result">No results</div>';
      results.hidden = false;
      return;
    }
    results.innerHTML = hits.map(function (e) {
      return '<a href="' + prefix + e.path + '">' +
             '<span class="r-kind">' + e.kind + '</span>' +
             '<span class="r-label">' + e.label + '</span></a>';
    }).join("");
    results.hidden = false;
  });

  input.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") {
      var first = results.querySelector("a");
      if (first) { window.location.href = first.getAttribute("href"); }
    } else if (ev.key === "Escape") {
      input.value = ""; results.hidden = true; input.blur();
    }
  });

  document.addEventListener("click", function (ev) {
    if (!results.contains(ev.target) && ev.target !== input) results.hidden = true;
  });

  // Tab switching logic
  document.querySelectorAll(".install-tabs .package-manager-tab").forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = tab.getAttribute("href").substring(1);
      var container = tab.closest(".install-tabs");

      container.querySelectorAll(".nav-tabs li").forEach(function (li) {
        li.classList.remove("active");
        var link = li.querySelector("a");
        if (link) {
          link.setAttribute("aria-selected", "false");
          link.setAttribute("tabindex", "-1");
        }
      });

      tab.parentElement.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      tab.setAttribute("tabindex", "0");

      container.querySelectorAll(".tab-pane").forEach(function (pane) {
        if (pane.id === targetId) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });
    });
  });

  // Copy button logic
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
      }).catch(function (err) {
        console.error("Copy failed: ", err);
      });
    });
  });
});
