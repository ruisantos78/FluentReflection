window.FR_TYPES = window.FR_TYPES || {};
window.FR_TYPES["Class"] = {
  "name": "Class",
  "namespace": "FluentReflection",
  "kind": "Static Class",
  "since": "1.0.0.0",
  "declaration": "public static class Class",
  "overline": "Namespace: FluentReflection · Assembly: FluentReflection.NET",
  "sections": [
    {
      "heading": "Remarks",
      "html": "<p>Static factory class providing all entry points to FluentReflection.NET.\n       Use <code>Class.Of(...)</code> to create a fluent wrapper over a concrete instance\n       or a static type, and <code>Class.From(...)</code> to resolve a type dynamically\n       by name across loaded assemblies. All factory methods return an\n       <a href=\"../IClass/index.html\">IClass</a> wrapper that exposes fluent member accessors.</p>"
    }
  ],
  "members": [
    {
      "name": "Of(object instance)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "of-object.html",
      "return": "IClass",
      "desc": "Wraps an instance object using its runtime type.",
      "declaration": "public static IClass Of(object instance)",
      "overline": "Class · Returns: IClass",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Wraps an instance object using its runtime type.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>instance</code></td><td>object</td><td>The object whose members are to be reflected upon.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IClass/index.html\">IClass</a> wrapper for the given instance.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>The wrapper uses the object's runtime type and configures member resolution for instance (public and non-public) members.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>ArgumentNullException</td><td><code>instance</code> is <code>null</code>.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Of(Type type)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "of-type.html",
      "return": "IClass",
      "desc": "Wraps a target static type.",
      "declaration": "public static IClass Of(Type type)",
      "overline": "Class · Returns: IClass",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Wraps a target static type.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>type</code></td><td>Type</td><td>The type whose static members are to be reflected upon.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IClass/index.html\">IClass</a> wrapper for static access to <code>type</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>The wrapper resolves static (public and non-public) members and sets the target instance to <code>null</code>.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>ArgumentNullException</td><td><code>type</code> is <code>null</code>.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Of<TClass>()",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "of-tclass.html",
      "return": "IClass",
      "desc": "Wraps a generic type (not usable with static classes).",
      "declaration": "public static IClass Of<TClass>()",
      "overline": "Class · Returns: IClass",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Wraps a generic type to reflect upon its (possibly static) members.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TClass</code></td><td>The type whose members (including static members) are to be reflected upon.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IClass/index.html\">IClass</a> wrapper for <code>TClass</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Provides static member access without needing a <code>Type</code> instance.</p>"
        },
        {
          "heading": "Important Note",
          "html": "<p><b>Static classes cannot be used as generic type arguments in C#</b>, so <code>Of&lt;TClass&gt;()</code> cannot target a static class. To access the static members of a static class, use <a href=\"of-type.html\">Of(Type)</a> with <code>typeof</code> or the <a href=\"../ObjectExtensions/asclass-type.html\">AsClass()</a> extension:</p><div class=\"declaration\"><pre><code>var wrapper = Class.Of(typeof(MyStaticClass));\nvar wrapper = typeof(MyStaticClass).AsClass();</code></pre></div><p>The generic overload <code>Of&lt;TClass&gt;()</code> only works with non-static classes (e.g. to reflect their static members).</p>"
        }
      ]
    },
    {
      "name": "Of<TClass>(object instance)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "of-tclass-object.html",
      "return": "IClass",
      "desc": "Wraps an instance enforcing an explicit target type.",
      "declaration": "public static IClass Of<TClass>(object instance)",
      "overline": "Class · Returns: IClass",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Wraps an instance enforcing an explicit target type.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TClass</code></td><td>The explicit target type used for member lookup.</td></tr>\n</table><p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>instance</code></td><td>object</td><td>The object whose members are to be reflected upon.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IClass/index.html\">IClass</a> wrapper targeting <code>TClass</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>The specified <code>TClass</code> is used for member resolution, useful when reflecting over a base type or interface of the runtime instance.</p>"
        }
      ]
    },
    {
      "name": "From(string typeName)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "from-string.html",
      "return": "IClass",
      "desc": "Resolves a type by name across all loaded assemblies.",
      "declaration": "public static IClass From(string typeName)",
      "overline": "Class · Returns: IClass",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Resolves a type by name across all loaded assemblies.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>typeName</code></td><td>string</td><td>The name or fully qualified name of the type to resolve.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IClass/index.html\">IClass</a> wrapper for the resolved type.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>First attempts <code>Type.GetType(typeName)</code>, then scans each loaded assembly for a matching type name or full name.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>ArgumentException</td><td><code>typeName</code> is <code>null</code>, empty, or whitespace.</td></tr><tr><td>TypeLoadException</td><td>The type could not be found in any loaded assembly.</td></tr></table>"
        }
      ]
    },
    {
      "name": "From(Assembly assembly, string typeName)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "from-assembly-string.html",
      "return": "IClass",
      "desc": "Resolves a type by name in a specific assembly.",
      "declaration": "public static IClass From(Assembly assembly, string typeName)",
      "overline": "Class · Returns: IClass",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Resolves a type by name in a specific assembly.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>assembly</code></td><td>Assembly</td><td>The assembly to search for the type.</td></tr>\n<tr><td><code>typeName</code></td><td>string</td><td>The name or fully qualified name of the type to resolve.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IClass/index.html\">IClass</a> wrapper for the resolved type.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Looks for an exact assembly-qualified type, then falls back to matching by simple name or full name.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>ArgumentNullException</td><td><code>assembly</code> is <code>null</code>.</td></tr><tr><td>ArgumentException</td><td><code>typeName</code> is <code>null</code>, empty, or whitespace.</td></tr><tr><td>TypeLoadException</td><td>The type could not be found in <code>assembly</code>.</td></tr></table>"
        }
      ]
    }
  ],
  "properties": []
};
