using System.Reflection;

namespace FluentReflection.Extensions;

/// <summary>
/// Fluent extension methods for objects, types, and assemblies.
/// </summary>
public static class ObjectExtensions
{
    /// <summary>
    /// Wraps an instance object into an <see cref="IClass"/> fluent reflection wrapper.
    /// </summary>
    public static IClass AsClass(this object instance) => Class.Of(instance);

    /// <summary>
    /// Wraps a <see cref="Type"/> into an <see cref="IClass"/> fluent reflection wrapper.
    /// </summary>
    public static IClass AsClass(this Type type) => Class.Of(type);

    /// <summary>
    /// Searches for a type in the given <see cref="Assembly"/> by name and returns an <see cref="IClass"/> wrapper.
    /// </summary>
    public static IClass AsClass(this Assembly assembly, string typeName) => Class.From(assembly, typeName);
}
