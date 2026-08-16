window.FR_TYPES = window.FR_TYPES || {};
window.FR_TYPES["IClass"] = {
  "name": "IClass",
  "namespace": "FluentReflection",
  "kind": "Interface",
  "since": "1.0.0.0",
  "declaration": "public interface IClass",
  "overline": "Namespace: FluentReflection · Assembly: FluentReflection.NET",
  "sections": [
    {
      "heading": "Remarks",
      "html": "<p>Fluent interface for interacting with members of a class or instance using reflection.\n       Every entry point returned by the <a href=\"../Class/index.html\">Class</a> factory or\n       <a href=\"../ObjectExtensions/index.html\">ObjectExtensions</a> exposes this contract. It provides\n       direct member access (<code>Get</code>/<code>Set</code>), method invocation\n       (<code>Invoke</code>), and dedicated accessors for properties, fields, methods, and events.</p><p>Member resolution automatically handles private, internal, public, and compiler-generated\n       backing fields (<code>&lt;Name&gt;k__BackingField</code>), for both instance and static scopes.</p>"
    }
  ],
  "members": [
    {
      "name": "Property(string name)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "property.html",
      "return": "IPropertyAccessor",
      "desc": "Gets a property accessor.",
      "declaration": "IPropertyAccessor Property(string name)",
      "overline": "IClass · Returns: IPropertyAccessor",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets a property accessor.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The property name.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IPropertyAccessor/index.html\">IPropertyAccessor</a> for the named property.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Enables fluent read/write access including the underlying backing field.</p>"
        }
      ]
    },
    {
      "name": "Field(string name)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "field.html",
      "return": "IFieldAccessor",
      "desc": "Gets a field accessor.",
      "declaration": "IFieldAccessor Field(string name)",
      "overline": "IClass · Returns: IFieldAccessor",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets a field accessor.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The field name.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IFieldAccessor/index.html\">IFieldAccessor</a> for the named field.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Supports named fields as well as compiler-generated backing fields (<code>&lt;Name&gt;k__BackingField</code>).</p>"
        }
      ]
    },
    {
      "name": "Method(string name)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "method.html",
      "return": "IMethodAccessor",
      "desc": "Gets a method accessor.",
      "declaration": "IMethodAccessor Method(string name)",
      "overline": "IClass · Returns: IMethodAccessor",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets a method accessor.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The method name.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IMethodAccessor/index.html\">IMethodAccessor</a> for the named method.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Enables synchronous and asynchronous invocation with automatic overload resolution.</p>"
        }
      ]
    },
    {
      "name": "Event(string name)",
      "kind": "Method",
      "since": "1.0.0.3",
      "href": "event.html",
      "return": "IEventAccessor",
      "desc": "Gets an event accessor.",
      "declaration": "IEventAccessor Event(string name)",
      "overline": "IClass · Returns: IEventAccessor",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets an event accessor.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The event name.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An <a href=\"../IEventAccessor/index.html\">IEventAccessor</a> for the named event.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Used to inspect subscribers via their invocation lists.</p>"
        }
      ]
    },
    {
      "name": "GetInvocationList(string name)",
      "kind": "Method",
      "since": "1.0.0.3",
      "href": "getinvocationlist.html",
      "return": "Delegate[]",
      "desc": "Gets event subscribers by name.",
      "declaration": "Delegate[] GetInvocationList(string name)",
      "overline": "IClass · Returns: Delegate[]",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets event subscribers by name.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The event name.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>An array of delegates subscribed to the event, or an empty array if none.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Equivalent to calling <code>Event(name).GetInvocationList()</code>.</p>"
        }
      ]
    },
    {
      "name": "Get<TValue>(string name)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "get-tvalue.html",
      "return": "TValue",
      "desc": "Gets a member value by name.",
      "declaration": "TValue Get<TValue>(string name)",
      "overline": "IClass · Returns: TValue",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets a member value by name.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TValue</code></td><td>The type to cast the member value to.</td></tr>\n</table><p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The field or property name.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The member value cast to <code>TValue</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Gets a field, property, or backing field value. Fields are preferred over properties, with backing fields as a fallback.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingMemberException</td><td>No matching field, property, or backing field exists.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Get(string name)",
      "kind": "Method",
      "since": "1.0.0.1",
      "href": "get-object.html",
      "return": "object?",
      "desc": "Gets a member value as object.",
      "declaration": "object? Get(string name)",
      "overline": "IClass · Returns: object?",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets a member value as object.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The field or property name.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The member value as an object, or <code>null</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Gets a field, property, or backing field value directly by member name as an object.</p>"
        }
      ]
    },
    {
      "name": "Set(string name, object? value)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "set.html",
      "return": "void",
      "desc": "Sets a member value by name.",
      "declaration": "void Set(string name, object? value)",
      "overline": "IClass · Returns: void",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Sets a member value by name.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The field or property name.</td></tr>\n<tr><td><code>value</code></td><td>object?</td><td>The value to assign to the member.</td></tr>\n</table>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Sets a field, property, or backing field value directly by member name.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingMemberException</td><td>No matching field, property, or backing field exists.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Invoke(string name, params object?[] args)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "invoke.html",
      "return": "void",
      "desc": "Invokes a void-returning method.",
      "declaration": "void Invoke(string name, params object?[] args)",
      "overline": "IClass · Returns: void",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Invokes a void-returning method.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The method name.</td></tr>\n<tr><td><code>args</code></td><td>object?[]</td><td>Optional arguments passed to the method.</td></tr>\n</table>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Invokes a void method by name with optional arguments.</p>"
        }
      ]
    },
    {
      "name": "Invoke<TResult>(string name, params object?[] args)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "invoke-tresult.html",
      "return": "TResult",
      "desc": "Invokes a returning method.",
      "declaration": "TResult Invoke<TResult>(string name, params object?[] args)",
      "overline": "IClass · Returns: TResult",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Invokes a returning method.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TResult</code></td><td>The type to cast the method result to.</td></tr>\n</table><p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The method name.</td></tr>\n<tr><td><code>args</code></td><td>object?[]</td><td>Optional arguments passed to the method.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The method result cast to <code>TResult</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Invokes a returning method by name with optional arguments and casts the result.</p>"
        }
      ]
    },
    {
      "name": "InvokeAsync(string name, params object?[] args)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "invokeasync.html",
      "return": "Task",
      "desc": "Invokes an async Task method.",
      "declaration": "Task InvokeAsync(string name, params object?[] args)",
      "overline": "IClass · Returns: Task",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Invokes an async Task method.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The method name.</td></tr>\n<tr><td><code>args</code></td><td>object?[]</td><td>Optional arguments passed to the method.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The <code>Task</code> returned by the invoked method.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Invokes an asynchronous <code>Task</code> method by name.</p>"
        }
      ]
    },
    {
      "name": "InvokeAsync<TResult>(string name, params object?[] args)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "invokeasync-tresult.html",
      "return": "Task<TResult>",
      "desc": "Invokes an async Task<TResult> method.",
      "declaration": "Task<TResult> InvokeAsync<TResult>(string name, params object?[] args)",
      "overline": "IClass · Returns: Task<TResult>",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Invokes an async Task&lt;TResult&gt; method.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TResult</code></td><td>The type of the awaited result.</td></tr>\n</table><p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>name</code></td><td>string</td><td>The method name.</td></tr>\n<tr><td><code>args</code></td><td>object?[]</td><td>Optional arguments passed to the method.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>A <code>Task&lt;TResult&gt;</code> resolving to the method's awaited result.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Invokes an asynchronous <code>Task&lt;TResult&gt;</code> method and awaits its result.</p>"
        }
      ]
    },
    {
      "name": "Attribute<TAttribute>()",
      "kind": "Method",
      "since": "1.0.0.6",
      "href": "attribute.html",
      "return": "TAttribute?",
      "desc": "Gets a custom attribute applied to the target type.",
      "declaration": "TAttribute? Attribute<TAttribute>() where TAttribute : Attribute",
      "overline": "IClass · Returns: TAttribute?",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets the custom attribute of type <code>TAttribute</code> applied to the target type, or null if it is not present.</p>"
        },
        {
          "heading": "Type Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TAttribute</code></td><td>The type of attribute to look up.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The attribute instance, or <code>null</code> if the target type does not carry the attribute.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Reads attributes from the target <a href=\"#TargetType\">TargetType</a> itself, independent of whether an instance is present.</p>"
        }
      ]
    }
  ],
  "properties": [
    {
      "name": "TargetType",
      "since": "1.0.0.0",
      "declaration": "Type TargetType { get; }",
      "desc": "Gets the target type being reflected upon.",
      "id": "TargetType"
    },
    {
      "name": "TargetInstance",
      "since": "1.0.0.0",
      "declaration": "object? TargetInstance { get; }",
      "desc": "Gets the target instance object, or null when performing static access.",
      "id": "TargetInstance"
    }
  ]
};
