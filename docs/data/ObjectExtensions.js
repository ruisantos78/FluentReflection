window.FR_TYPES = window.FR_TYPES || {};
window.FR_TYPES["ObjectExtensions"] = {
  "name": "ObjectExtensions",
  "namespace": "FluentReflection.Extensions",
  "kind": "Static Class",
  "since": "1.0.0.0",
  "declaration": "public static class ObjectExtensions",
  "overline": "Namespace: FluentReflection.Extensions · Assembly: FluentReflection.NET",
  "sections": [
    {
      "heading": "Remarks",
      "html": "<p>Fluent extension methods for objects, types, and assemblies that provide shorthand access\n       to the <a href=\"../Class/index.html\">Class</a> factory, enabling a more conversational, chainable\n       API such as <code>instance.AsClass().Property(\"Name\").Get()</code>.</p>"
    }
  ],
  "members": [
    {
      "name": "AsClass(this object instance)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "asclass-object.html",
      "return": "IClass",
      "desc": "Wraps an instance object into anIClasswrapper.",
      "declaration": "public static IClass AsClass(this object instance)",
      "overline": "ObjectExtensions · Returns: IClass",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Wraps an instance object into an <code>IClass</code> wrapper.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>instance</code></td><td>object</td><td>The object to wrap.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IClass/index.html\">IClass</a> wrapper for the instance.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Equivalent to <code>Class.Of(instance)</code>.</p>"
        }
      ]
    },
    {
      "name": "AsClass(this Type type)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "asclass-type.html",
      "return": "IClass",
      "desc": "Wraps aTypeinto anIClasswrapper for static access.",
      "declaration": "public static IClass AsClass(this Type type)",
      "overline": "ObjectExtensions · Returns: IClass",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Wraps a <code>Type</code> into an <code>IClass</code> wrapper for static access.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>type</code></td><td>Type</td><td>The type to wrap.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IClass/index.html\">IClass</a> wrapper for static access to <code>type</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Equivalent to <code>Class.Of(type)</code>.</p>"
        }
      ]
    },
    {
      "name": "AsClass(this Assembly assembly, string typeName)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "asclass-assembly-string.html",
      "return": "IClass",
      "desc": "Searches an assembly for a type and returns a wrapper.",
      "declaration": "public static IClass AsClass(this Assembly assembly, string typeName)",
      "overline": "ObjectExtensions · Returns: IClass",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Searches an assembly for a type and returns a wrapper.</p>"
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
          "html": "<p>Equivalent to <code>Class.From(assembly, typeName)</code>.</p>"
        }
      ]
    }
  ],
  "properties": []
};
