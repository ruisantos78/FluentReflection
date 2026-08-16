window.FR_TYPES = window.FR_TYPES || {};
window.FR_TYPES["IFieldAccessor"] = {
  "name": "IFieldAccessor",
  "namespace": "FluentReflection.Accessors",
  "kind": "Interface",
  "since": "1.0.0.0",
  "declaration": "public interface IFieldAccessor",
  "overline": "Namespace: FluentReflection.Accessors · Assembly: FluentReflection.NET",
  "sections": [
    {
      "heading": "Remarks",
      "html": "<p>Fluent accessor for reading and writing field values. Obtained via\n       <a href=\"../IClass/index.html#Field\">IClass.Field(string)</a>. It resolves named fields directly\n       and also supports compiler-generated backing fields (<code>&lt;Name&gt;k__BackingField</code>),\n       for both instance and static scopes.</p><p>Note: although the public contract is the interface below, the concrete implementation\n       (<code>FieldAccessor</code>) is internal. Access it only through the fluent API.</p>"
    }
  ],
  "members": [
    {
      "name": "Get<TValue>()",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "get-tvalue.html",
      "return": "TValue",
      "desc": "Gets the field value cast toTValue.",
      "declaration": "TValue Get<TValue>()",
      "overline": "IFieldAccessor · Returns: TValue",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets the field value cast to <code>TValue</code>.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TValue</code></td><td>The type to cast the field value to.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The field value cast to <code>TValue</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Falls back to the compiler-generated backing field (<code>&lt;Name&gt;k__BackingField</code>) when no direct field is found.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingFieldException</td><td>The field and its backing field do not exist on the target type.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Get()",
      "kind": "Method",
      "since": "1.0.0.1",
      "href": "get-object.html",
      "return": "object?",
      "desc": "Gets the field value as an object.",
      "declaration": "object? Get()",
      "overline": "IFieldAccessor · Returns: object?",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets the field value as an object.</p>"
        },
        {
          "heading": "Returns",
          "html": "<p>The field value, or <code>null</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Returns the field value as an object.</p>"
        }
      ]
    },
    {
      "name": "Set(object? value)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "set.html",
      "return": "void",
      "desc": "Sets the field value.",
      "declaration": "void Set(object? value)",
      "overline": "IFieldAccessor · Returns: void",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Sets the field value.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>value</code></td><td>object?</td><td>The value to assign to the field.</td></tr>\n</table>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Resolves the backing field automatically when the given name refers to an auto-property.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingFieldException</td><td>The field and its backing field do not exist on the target type.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Attribute<TAttribute>()",
      "kind": "Method",
      "since": "1.0.0.6",
      "href": "attribute.html",
      "return": "TAttribute?",
      "desc": "Gets a custom attribute applied to the field.",
      "declaration": "TAttribute? Attribute<TAttribute>() where TAttribute : Attribute",
      "overline": "IFieldAccessor · Returns: TAttribute?",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets the custom attribute of type <code>TAttribute</code> applied to the field, or null if it is not present.</p>"
        },
        {
          "heading": "Type Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TAttribute</code></td><td>The type of attribute to look up.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The attribute instance, or <code>null</code> if the field does not carry the attribute.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Resolves the backing field automatically when the given name refers to an auto-property.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingFieldException</td><td>The field and its backing field do not exist on the target type.</td></tr></table>"
        }
      ]
    }
  ],
  "properties": []
};
