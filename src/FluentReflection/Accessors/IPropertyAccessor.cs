namespace FluentReflection.Accessors;

/// <summary>
/// Fluent accessor for reading and writing property values.
/// </summary>
public interface IPropertyAccessor
{
    /// <summary>
    /// Gets the property value cast to <typeparamref name="TValue"/>.
    /// </summary>
    TValue Get<TValue>();

    /// <summary>
    /// Sets the property value.
    /// </summary>
    void Set(object? value);
}

internal class PropertyAccessor(Type targetType, object? instance, string name) : IPropertyAccessor
{
    private System.Reflection.BindingFlags Flags => 
        System.Reflection.BindingFlags.NonPublic | 
        System.Reflection.BindingFlags.Public | 
        (instance is null ? System.Reflection.BindingFlags.Static : System.Reflection.BindingFlags.Instance);


    public TValue Get<TValue>()
    {
        if (targetType.GetProperty(name, Flags) is { } property)
        {
            return (TValue)property.GetValue(instance)!;
        }

        if (targetType.GetField($"<{name}>k__BackingField", Flags) is { } backingField)
        {
            return (TValue)backingField.GetValue(instance)!;
        }

        throw new MissingMemberException($"Property or backing field '{name}' not found on type '{targetType.FullName}'.");
    }

    public void Set(object? value)
    {
        if (targetType.GetProperty(name, Flags) is { } property)
        {
            if (property.CanWrite)
            {
                property.SetValue(instance, value);
                return;
            }
        }

        if (targetType.GetField($"<{name}>k__BackingField", Flags) is { } backingField)
        {
            backingField.SetValue(instance, value);
            return;
        }

        if (targetType.GetProperty(name, Flags) is { } readOnlyProp)
        {
            readOnlyProp.SetValue(instance, value);
            return;
        }

        throw new MissingMemberException($"Property or backing field '{name}' not found on type '{targetType.FullName}'.");
    }
}
