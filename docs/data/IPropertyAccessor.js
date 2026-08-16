window.FR_TYPES = window.FR_TYPES || {};
window.FR_TYPES["IPropertyAccessor"] = {
  "name": "IPropertyAccessor",
  "namespace": "FluentReflection.Accessors",
  "kind": "Interface",
  "since": "1.0.0.0",
  "declaration": "public interface IPropertyAccessor",
  "overline": "Namespace: FluentReflection.Accessors · Assembly: FluentReflection.NET",
  "sections": [
    {
      "heading": "Remarks",
      "html": "<p>Fluent accessor for reading and writing property values. Obtained via\n       <a href=\"../IClass/index.html#Property\">IClass.Property(string)</a>. Supports reading and writing\n       both exposed properties and their underlying backing fields, as well as read-only and\n       otherwise inaccessible private setters.</p><p>Note: although the public contract is the interface below, the concrete implementation\n       (<code>PropertyAccessor</code>) is internal. Access it only through the fluent API.</p>"
    }
  ],
  "members": [
    {
      "name": "Get<TValue>()",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "get-tvalue.html",
      "return": "TValue",
      "desc": "Gets the property value cast toTValue.",
      "declaration": "TValue Get<TValue>()",
      "overline": "IPropertyAccessor · Returns: TValue",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets the property value cast to <code>TValue</code>.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TValue</code></td><td>The type to cast the property value to.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The property value cast to <code>TValue</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>First looks for a direct property, then falls back to the property's compiler-generated backing field (<code>&lt;Name&gt;k__BackingField</code>).</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingMemberException</td><td>No property or backing field exists on the target type.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Get()",
      "kind": "Method",
      "since": "1.0.0.1",
      "href": "get-object.html",
      "return": "object?",
      "desc": "Gets the property value as an object.",
      "declaration": "object? Get()",
      "overline": "IPropertyAccessor · Returns: object?",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets the property value as an object.</p>"
        },
        {
          "heading": "Returns",
          "html": "<p>The property value, or <code>null</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Returns the property value as an object.</p>"
        }
      ]
    },
    {
      "name": "Set(object? value)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "set.html",
      "return": "void",
      "desc": "Sets the property value.",
      "declaration": "void Set(object? value)",
      "overline": "IPropertyAccessor · Returns: void",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Sets the property value.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>value</code></td><td>object?</td><td>The value to assign to the property.</td></tr>\n</table>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Write strategy: (1) use the writable setter if available, (2) fall back to the backing field, (3) force-write via the reflection setter for read-only/init-only auto-properties.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingMemberException</td><td>No property or backing field exists on the target type.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Attribute<TAttribute>()",
      "kind": "Method",
      "since": "1.0.0.6",
      "href": "attribute.html",
      "return": "TAttribute?",
      "desc": "Gets a custom attribute applied to the property.",
      "declaration": "TAttribute? Attribute<TAttribute>() where TAttribute : Attribute",
      "overline": "IPropertyAccessor · Returns: TAttribute?",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets the custom attribute of type <code>TAttribute</code> applied to the property, or null if it is not present.</p>"
        },
        {
          "heading": "Type Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TAttribute</code></td><td>The type of attribute to look up.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The attribute instance, or <code>null</code> if the property does not carry the attribute.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Attributes are read from the property declaration itself, not its backing field.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingMemberException</td><td>No property with the given name was found on the target type.</td></tr></table>"
        }
      ]
    }
  ],
  "properties": []
};
