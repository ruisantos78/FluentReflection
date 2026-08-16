window.FR_TYPES = window.FR_TYPES || {};
window.FR_TYPES["IMethodAccessor"] = {
  "name": "IMethodAccessor",
  "namespace": "FluentReflection.Accessors",
  "kind": "Interface",
  "since": "1.0.0.0",
  "declaration": "public interface IMethodAccessor",
  "overline": "Namespace: FluentReflection.Accessors · Assembly: FluentReflection.NET",
  "sections": [
    {
      "heading": "Remarks",
      "html": "<p>Fluent accessor for invoking synchronous and asynchronous methods. Obtained via\n       <a href=\"../IClass/index.html#Method\">IClass.Method(string)</a>. When a method name has overloads,\n       the accessor automatically picks the overload whose parameter count and types best match\n       the supplied arguments.</p><p>Note: although the public contract is the interface below, the concrete implementation\n       (<code>MethodAccessor</code>) is internal. Access it only through the fluent API.</p>"
    }
  ],
  "members": [
    {
      "name": "Invoke(params object?[] args)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "invoke.html",
      "return": "void",
      "desc": "Invokes a void-returning method.",
      "declaration": "void Invoke(params object?[] args)",
      "overline": "IMethodAccessor · Returns: void",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Invokes a void-returning method.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>args</code></td><td>object?[]</td><td>Arguments passed to the invoked method.</td></tr>\n</table>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Invokes a void-returning method by name with the supplied arguments.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingMethodException</td><td>No method with the given name exists on the target type.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Invoke<TResult>(params object?[] args)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "invoke-tresult.html",
      "return": "TResult",
      "desc": "Invokes a method returningTResult.",
      "declaration": "TResult Invoke<TResult>(params object?[] args)",
      "overline": "IMethodAccessor · Returns: TResult",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Invokes a method returning <code>TResult</code>.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TResult</code></td><td>The type to cast the method result to.</td></tr>\n</table><p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>args</code></td><td>object?[]</td><td>Arguments passed to the invoked method.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The method result cast to <code>TResult</code>.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Invokes a method returning a result and casts it.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingMethodException</td><td>No method with the given name exists on the target type.</td></tr></table>"
        }
      ]
    },
    {
      "name": "InvokeAsync(params object?[] args)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "invokeasync.html",
      "return": "Task",
      "desc": "Invokes an async method returningTask.",
      "declaration": "Task InvokeAsync(params object?[] args)",
      "overline": "IMethodAccessor · Returns: Task",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Invokes an async method returning <code>Task</code>.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>args</code></td><td>object?[]</td><td>Arguments passed to the invoked method.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The <code>Task</code> returned by the invoked method.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>If the invoked method does not return a <code>Task</code>, a faulted task carrying an <code>InvalidOperationException</code> is returned.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>InvalidOperationException</td><td>Returned as a faulted task when the invoked method did not return a <code>Task</code>.</td></tr></table>"
        }
      ]
    },
    {
      "name": "InvokeAsync<TResult>(params object?[] args)",
      "kind": "Method",
      "since": "1.0.0.0",
      "href": "invokeasync-tresult.html",
      "return": "Task<TResult>",
      "desc": "Invokes an async method returningTask<TResult>.",
      "declaration": "Task<TResult> InvokeAsync<TResult>(params object?[] args)",
      "overline": "IMethodAccessor · Returns: Task<TResult>",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Invokes an async method returning <code>Task&lt;TResult&gt;</code>.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TResult</code></td><td>The type of the awaited result.</td></tr>\n</table><p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>args</code></td><td>object?[]</td><td>Arguments passed to the invoked method.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>A <code>Task&lt;TResult&gt;</code> resolving to the method's awaited result.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Supports unwrapping the <code>Result</code> from a non-generic <code>Task</code> whose runtime type exposes one.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>InvalidOperationException</td><td>The invoked method did not return a task with a compatible <code>Result</code>.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Attribute<TAttribute>()",
      "kind": "Method",
      "since": "1.0.0.6",
      "href": "attribute.html",
      "return": "TAttribute?",
      "desc": "Gets a custom attribute applied to the method.",
      "declaration": "TAttribute? Attribute<TAttribute>() where TAttribute : Attribute",
      "overline": "IMethodAccessor · Returns: TAttribute?",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets the custom attribute of type <code>TAttribute</code> applied to the method, or null if it is not present.</p>"
        },
        {
          "heading": "Type Parameters",
          "html": "<p class=\"emphasized\"><b>Type Parameters</b></p><table><tr><th>Name</th><th>Description</th></tr>\n<tr><td><code>TAttribute</code></td><td>The type of attribute to look up.</td></tr>\n</table>"
        },
        {
          "heading": "Returns",
          "html": "<p>The attribute instance, or <code>null</code> if the method does not carry the attribute.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>When overloads exist, the attribute is read from the first matching method.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingMethodException</td><td>No method with the given name was found on the target type.</td></tr></table>"
        }
      ]
    }
  ],
  "properties": []
};
