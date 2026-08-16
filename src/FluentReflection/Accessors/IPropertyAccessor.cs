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
    /// Gets the property value as an object.
    /// </summary>
    object? Get();

    /// <summary>
    /// Sets the property value.
    /// </summary>
    void Set(object? value);

    /// <summary>
    /// Gets the custom attribute of type <typeparamref name="TAttribute"/> applied to the property, or null if not present.
    /// </summary>
    TAttribute? Attribute<TAttribute>() where TAttribute : Attribute;
}

internal class PropertyAccessor(Type targetType, object? instance, string name) : AccessorBase(targetType, instance, name), IPropertyAccessor
{
    public object? Get() => Get<object?>();

    public TValue Get<TValue>()
    {
        if (TargetType.GetProperty(Name, Flags) is { } property)
        {
            return (TValue)property.GetValue(Instance)!;
        }

        if (TargetType.GetField($"<{Name}>k__BackingField", Flags) is { } backingField)
        {
            return (TValue)backingField.GetValue(Instance)!;
        }

        throw new MissingMemberException($"Property or backing field '{Name}' not found on type '{TargetType.FullName}'.");
    }

    public void Set(object? value)
    {
        if (TargetType.GetProperty(Name, Flags) is { } property)
        {
            if (property.CanWrite)
            {
                property.SetValue(Instance, value);
                return;
            }
        }

        if (TargetType.GetField($"<{Name}>k__BackingField", Flags) is { } backingField)
        {
            backingField.SetValue(Instance, value);
            return;
        }

        if (TargetType.GetProperty(Name, Flags) is { } readOnlyProp)
        {
            readOnlyProp.SetValue(Instance, value);
            return;
        }

        throw new MissingMemberException($"Property or backing field '{Name}' not found on type '{TargetType.FullName}'.");
    }

    public TAttribute? Attribute<TAttribute>() where TAttribute : Attribute
    {
        var property = TargetType.GetProperty(Name, Flags)
            ?? throw new MissingMemberException($"Property '{Name}' not found on type '{TargetType.FullName}'.");

        return GetAttribute<TAttribute>(property);
    }
}
