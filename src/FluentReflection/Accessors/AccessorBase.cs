using System.Reflection;

namespace FluentReflection.Accessors;

/// <summary>
/// Base class for fluent accessors, sharing the target type, instance, member name, and binding flags.
/// </summary>
internal abstract class AccessorBase(Type targetType, object? instance, string name)
{
    /// <summary>
    /// Gets the target type being reflected upon.
    /// </summary>
    protected Type TargetType { get; } = targetType;

    /// <summary>
    /// Gets the target instance object (or null for static access).
    /// </summary>
    protected object? Instance { get; } = instance;

    /// <summary>
    /// Gets the member name being reflected upon.
    /// </summary>
    protected string Name { get; } = name;

    /// <summary>
    /// Gets the binding flags used to resolve members, honoring instance/static and accessibility.
    /// </summary>
    protected BindingFlags Flags =>
        BindingFlags.NonPublic |
        BindingFlags.Public |
        (Instance is null ? BindingFlags.Static : BindingFlags.Instance);

    /// <summary>
    /// Resolves a custom attribute of type <typeparamref name="TAttribute"/> from the given member.
    /// </summary>
    protected TAttribute? GetAttribute<TAttribute>(MemberInfo member)
        where TAttribute : Attribute
        => member.GetCustomAttribute<TAttribute>();
}