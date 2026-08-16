window.FR_TYPES = window.FR_TYPES || {};
window.FR_TYPES["IEventAccessor"] = {
  "name": "IEventAccessor",
  "namespace": "FluentReflection.Accessors",
  "kind": "Interface",
  "since": "1.0.0.3",
  "declaration": "public interface IEventAccessor",
  "overline": "Namespace: FluentReflection.Accessors · Assembly: FluentReflection.NET",
  "sections": [
    {
      "heading": "Remarks",
      "html": "<p>Fluent accessor for interacting with events and their subscribers. Obtained via\n       <a href=\"../IClass/index.html#Event\">IClass.Event(string)</a>. Use it to introspect which\n       delegates are subscribed to a (potentially private) event without invoking it.</p><p>The accessor locates the backing delegate field using several naming conventions, and walks\n       the base-type hierarchy to support inherited events. Note: although the public contract is\n       the interface below, the concrete implementation (<code>EventAccessor</code>) is internal;\n       access it only through the fluent API.</p>"
    }
  ],
  "members": [
    {
      "name": "GetInvocationList()",
      "kind": "Method",
      "since": "1.0.0.3",
      "href": "getinvocationlist.html",
      "return": "Delegate[]",
      "desc": "Gets the invocation list of delegates subscribed to the event.",
      "declaration": "Delegate[] GetInvocationList()",
      "overline": "IEventAccessor · Returns: Delegate[]",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Gets the invocation list of delegates subscribed to the event.</p>"
        },
        {
          "heading": "Returns",
          "html": "<p>An array of delegates representing the event subscribers, or an empty array if there are no subscribers.</p>"
        },
        {
          "heading": "Remarks",
          "html": "<p>The backing field is located by trying, in order: the directly named field, the compiler-generated (<code>&lt;Name&gt;k__BackingField</code>), the underscore-prefixed (<code>_Name</code>) convention, then the event's declaring type.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingMemberException</td><td>No event or backing field with the given name was found on the target type.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Add(Delegate handler)",
      "kind": "Method",
      "since": "1.0.0.6",
      "href": "add.html",
      "return": "void",
      "desc": "Subscribes a delegate to the event.",
      "declaration": "void Add(Delegate handler)",
      "overline": "IEventAccessor · Returns: void",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Subscribes the given delegate to the event.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>handler</code></td><td>Delegate</td><td>The delegate to subscribe.</td></tr>\n</table>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Invokes the event's add accessor via reflection, supporting private and non-public add accessors.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingMemberException</td><td>No event with the given name exists on the target type, or it does not expose an add accessor.</td></tr></table>"
        }
      ]
    },
    {
      "name": "Remove(Delegate handler)",
      "kind": "Method",
      "since": "1.0.0.6",
      "href": "remove.html",
      "return": "void",
      "desc": "Unsubscribes a delegate from the event.",
      "declaration": "void Remove(Delegate handler)",
      "overline": "IEventAccessor · Returns: void",
      "sections": [
        {
          "heading": "Definition",
          "html": "<p>Unsubscribes the given delegate from the event.</p>"
        },
        {
          "heading": "Parameters",
          "html": "<p class=\"emphasized\"><b>Parameters</b></p><table><tr><th>Name</th><th>Type</th><th>Description</th></tr>\n<tr><td><code>handler</code></td><td>Delegate</td><td>The delegate to unsubscribe.</td></tr>\n</table>"
        },
        {
          "heading": "Remarks",
          "html": "<p>Invokes the event's remove accessor via reflection, supporting private and non-public remove accessors.</p>"
        },
        {
          "heading": "Exceptions",
          "html": "<table><tr><th>Type</th><th>Condition</th></tr><tr><td>MissingMemberException</td><td>No event with the given name exists on the target type, or it does not expose a remove accessor.</td></tr></table>"
        }
      ]
    }
  ],
  "properties": []
};
