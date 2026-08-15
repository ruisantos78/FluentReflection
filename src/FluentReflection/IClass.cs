using FluentReflection.Accessors;

namespace FluentReflection;

/// <summary>
/// Fluent interface for interacting with members of a class or instance using reflection.
/// </summary>
public interface IClass
{
    /// <summary>
    /// Gets the target type being reflected upon.
    /// </summary>
    Type TargetType { get; }

    /// <summary>
    /// Gets the target instance object (or null for static access).
    /// </summary>
    object? TargetInstance { get; }

    /// <summary>
    /// Gets a property accessor for the given property name.
    /// </summary>
    IPropertyAccessor Property(string name);

    /// <summary>
    /// Gets a field accessor for the given field name.
    /// </summary>
    IFieldAccessor Field(string name);

    /// <summary>
    /// Gets a method accessor for the given method name.
    /// </summary>
    IMethodAccessor Method(string name);

    /// <summary>
    /// Gets an event accessor for the given event name.
    /// </summary>
    IEventAccessor Event(string name);

    /// <summary>
    /// Gets the invocation list of delegates subscribed to the event by name.
    /// </summary>
    Delegate[] GetInvocationList(string name);

    /// <summary>
    /// Gets a field, property, or backing field value directly by member name.
    /// </summary>
    TValue Get<TValue>(string name);

    /// <summary>
    /// Gets a field, property, or backing field value directly by member name as an object.
    /// </summary>
    object? Get(string name);

    /// <summary>
    /// Sets a field, property, or backing field value directly by member name.
    /// </summary>
    void Set(string name, object? value);

    /// <summary>
    /// Invokes a void method by name with optional arguments.
    /// </summary>
    void Invoke(string name, params object?[] args);

    /// <summary>
    /// Invokes a returning method by name with optional arguments.
    /// </summary>
    TResult Invoke<TResult>(string name, params object?[] args);

    /// <summary>
    /// Invokes an asynchronous Task method by name with optional arguments.
    /// </summary>
    Task InvokeAsync(string name, params object?[] args);

    /// <summary>
    /// Invokes an asynchronous Task&lt;TResult&gt; method by name with optional arguments.
    /// </summary>
    Task<TResult> InvokeAsync<TResult>(string name, params object?[] args);
}
