# FluentReflection

[![Build & Test](https://img.shields.io/badge/.NET-10.0-purple.svg)](https://dotnet.microsoft.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A modern, expressive, and fluent .NET 10 framework designed for accessing private, internal, and public members (fields, auto-property backing fields, properties, and methods) using reflection. Created specifically to simplify unit testing by providing a clean, readable way to inspect and mutate encapsulated state and invoke non-public methods without verbose reflection boilerplate.

---


## Key Features

- 🚀 **Fluent API**: Expressive, chainable syntax for interacting with objects and static types.
- 🔒 **Private Member Access**: Seamlessly read and write private fields, internal properties, and compiler-generated auto-property backing fields (`<Property>k__BackingField`).
- ⚡ **Synchronous & Asynchronous Method Invocation**: Cleanly invoke `void`, returning, `Task`, and `Task<TResult>` methods without array wrapping boilerplate.
- 📦 **Type Discovery**: Easily resolve types by name from loaded assemblies or specific assemblies (`Class.From(...)`).
- 🛠️ **Extension Method Ready**: Use `.AsClass()` directly on any object instance, `Type`, or `Assembly`.

---

## Installation

Add the library reference to your `.csproj` or install via NuGet:

```bash
dotnet add package FluentReflection
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
var staticWrapper = Class.Of<MyStaticClass>();
var staticWrapper = Class.Of(typeof(MyStaticClass));
var staticWrapper = typeof(MyStaticClass).AsClass();

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

    private string CalculateToken(string user) => $"{_apiKey}_{user}";
    private async Task ProcessAsync() => await Task.Delay(10);
}

// In your tests or framework code:
var service = new Service();

// Read private field using Class.Of
string key = Class.Of(service).Get<string>("_apiKey");

// Set private auto-property backing field using Class.Of
Class.Of(service).Set("ServiceStatus", "Ready");

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
