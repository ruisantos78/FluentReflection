using System.Reflection;

namespace FluentReflection;

/// <summary>
/// Static factory class providing entry points to FluentReflection.
/// </summary>
public static class Class
{
    /// <summary>
    /// Creates a fluent wrapper for an instance object.
    /// </summary>
    public static IClass Of(object instance)
    {
        ArgumentNullException.ThrowIfNull(instance);
        return new ClassWrapper(instance.GetType(), instance);
    }

    /// <summary>
    /// Creates a fluent wrapper for a target static type.
    /// </summary>
    public static IClass Of(Type type)
    {
        ArgumentNullException.ThrowIfNull(type);
        return new ClassWrapper(type, null);
    }

    /// <summary>
    /// Creates a fluent wrapper for a generic type <typeparamref name="TClass"/>.
    /// </summary>
    public static IClass Of<TClass>() => new ClassWrapper(typeof(TClass), null);

    /// <summary>
    /// Creates a fluent wrapper for an instance object enforcing a explicit target type <typeparamref name="TClass"/>.
    /// </summary>
    public static IClass Of<TClass>(TClass instance) => new ClassWrapper(typeof(TClass), instance);

    /// <summary>
    /// Searches for a type by name across all currently loaded assemblies in the current AppDomain and creates a fluent wrapper.
    /// </summary>
    public static IClass From(string typeName)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(typeName);

        var type = Type.GetType(typeName);

        if (type is null)
        {
            foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies())
            {
                type = assembly.GetType(typeName, false, ignoreCase: false) 
                    ?? assembly.GetTypes().FirstOrDefault(t => t.Name == typeName || t.FullName == typeName);

                if (type is not null)
                {
                    break;
                }
            }
        }

        if (type is null)
        {
            throw new TypeLoadException($"Type '{typeName}' could not be found in loaded assemblies.");
        }

        return new ClassWrapper(type, null);
    }

    /// <summary>
    /// Searches for a type by name in a specific assembly and creates a fluent wrapper.
    /// </summary>
    public static IClass From(Assembly assembly, string typeName)
    {
        ArgumentNullException.ThrowIfNull(assembly);
        ArgumentException.ThrowIfNullOrWhiteSpace(typeName);

        var type = assembly.GetType(typeName, false, ignoreCase: false)
            ?? assembly.GetTypes().FirstOrDefault(t => t.Name == typeName || t.FullName == typeName);

        if (type is null)
        {
            throw new TypeLoadException($"Type '{typeName}' could not be found in assembly '{assembly.FullName}'.");
        }

        return new ClassWrapper(type, null);
    }
}
