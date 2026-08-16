# FluentReflection

[![Build & Test](https://img.shields.io/badge/.NET-10.0-purple.svg)](https://dotnet.microsoft.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-purple.svg)](https://ruisantos78.github.io/FluentReflection/)

Full API documentation: <https://ruisantos78.github.io/FluentReflection/>

A modern, expressive, and fluent .NET 10 framework designed for accessing private, internal, and public members (fields, auto-property backing fields, properties, methods, and events) using reflection. Created specifically to simplify unit testing by providing a clean, readable way to inspect and mutate encapsulated state, invoke non-public methods, and inspect event invocation lists without verbose reflection boilerplate.

---

## Key Features

- 🚀 **Fluent API**: Expressive, chainable syntax for interacting with objects and static types.
- 🔒 **Private Member Access**: Seamlessly read and write private fields, internal properties, and compiler-generated auto-property backing fields (`<Property>k__BackingField`).
- ⚡ **Synchronous & Asynchronous Method Invocation**: Cleanly invoke `void`, returning, `Task`, and `Task<TResult>` methods without array wrapping boilerplate.
- 📡 **Event Invocation Lists**: Inspect event subscribers and delegates on instance or static public/private events via `Event("Name").GetInvocationList()`.
- 📦 **Type Discovery**: Easily resolve types by name from loaded assemblies or specific assemblies (`Class.From(...)`).
- 🛠️ **Extension Method Ready**: Use `.AsClass()` directly on any object instance, `Type`, or `Assembly`.
- ⚠️ **Static Classes**: Because C# does not allow static classes as generic type arguments, `Class.Of<TClass>()` cannot target static classes. Use `Class.Of(typeof(MyStaticClass))` or `typeof(MyStaticClass).AsClass()` to access their static members.

---

## Installation

Add the library reference to your `.csproj` or install via NuGet:

```bash
dotnet add package FluentReflection.NET
```

---

## Quick Start & Usage

### 1. Creating a Class Wrapper

```csharp
using FluentReflection;
using FluentReflection.Extensions;

// Wrap an object instance
var instanceWrapper = Class.Of(myObject);
// OR via extension method
var instanceWrapper = myObject.AsClass();

// Wrap a static class / type
// NOTE: static classes cannot be used as generic type arguments (Class.Of<TClass>()),
// so use typeof or the AsClass() extension instead.
var staticWrapper = Class.Of(typeof(MyStaticClass));
var staticWrapper = typeof(MyStaticClass).AsClass();

// The generic overload only works with non-static classes (e.g. to target their static members)
var staticMembersWrapper = Class.Of<MyRegularClass>();

// Resolve type by name from current AppDomain or Assembly
var classWrapper = Class.From("MyNamespace.MyPrivateClass");
var classWrapper = Class.From(myAssembly, "MyPrivateClass");
var classWrapper = myAssembly.AsClass("MyPrivateClass");
```

---

## Member Access (Fields & Properties)

### Direct Shortcut Methods (`Get` & `Set`)

Automatically resolves fields, auto-property backing fields, and standard properties.

```csharp
// Read a private field or property
string secret = Class.Of(sample).Get<string>("_secretField");

// Write to a private field or property
Class.Of(sample).Set("_secretField", "NewSecretValue");

// Works seamlessly on auto-properties with private setters
Class.Of(sample).Set("AutoProperty", "UpdatedValue");
```

### Fluent Accessors (`Property` & `Field`)

```csharp
// Property Accessor
string propVal = Class.Of(sample).Property("AutoProperty").Get<string>();
Class.Of(sample).Property("AutoProperty").Set("NewValue");

// Field Accessor
int fieldVal = Class.Of(sample).Field("_counter").Get<int>();
Class.Of(sample).Field("_counter").Set(42);
```

---

## Event Access & Invocation Lists

Inspect event subscribers and backing delegates on instance or static events (including private events).

```csharp
// Direct shortcut to get subscribed delegates
Delegate[] delegates = Class.Of(sample).GetInvocationList("OnStateChanged");

// Via fluent event accessor
Delegate[] delegates = Class.Of(sample).Event("OnStateChanged").GetInvocationList();

// Works with static events as well (static classes require typeof / AsClass, not generic)
Delegate[] staticDelegates = typeof(MyStaticClass).AsClass().GetInvocationList("OnGlobalEvent");
```

---

## Method Invocation

Supports both instance and static methods, automatically binding method signatures based on target context and argument types.

### Synchronous Methods

```csharp
// Invoke a void method with parameters
Class.Of(sample).Invoke("ResetState", arg1, arg2);

// Invoke a method returning a result
string greeting = Class.Of(sample).Invoke<string>("CalculateGreeting", "Alice", 30);
```

### Asynchronous Methods (`Task` & `Task<TResult>`)

```csharp
// Invoke an async Task method
await Class.Of(sample).InvokeAsync("ExecuteProcessAsync", parameter);

// Invoke an async Task<TResult> method
string data = await Class.Of(sample).InvokeAsync<string>("FetchDataAsync", "id_123");
```

---

## Code Example

```csharp
using FluentReflection;
using FluentReflection.Extensions;

public class Service
{
    private string _apiKey = "secret_key_123";
    public string ServiceStatus { get; private set; } = "Initializing";

    public event EventHandler? StatusChanged;
    private event Action<string>? LogEvent;

    private string CalculateToken(string user) => $"{_apiKey}_{user}";
    private async Task ProcessAsync() => await Task.Delay(10);
}

// In your tests or framework code:
var service = new Service();
service.StatusChanged += (sender, args) => Console.WriteLine("Status changed!");

// Read private field using Class.Of
string key = Class.Of(service).Get<string>("_apiKey");

// Set private auto-property backing field using Class.Of
Class.Of(service).Set("ServiceStatus", "Ready");

// Inspect event invocation list
Delegate[] subscribers = Class.Of(service).GetInvocationList("StatusChanged");
Console.WriteLine($"Subscribers count: {subscribers.Length}"); // Output: 1

// Invoke private method using Class.Of
string token = Class.Of(service).Invoke<string>("CalculateToken", "Rui");

// Invoke private async method using Class.Of
await Class.Of(service).InvokeAsync("ProcessAsync");

// Or using .AsClass() extension
string keyExt = service.AsClass().Get<string>("_apiKey");
```

---

## License

This project is licensed under the MIT License.
