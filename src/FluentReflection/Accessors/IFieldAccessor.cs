namespace FluentReflection.Accessors;

/// <summary>
/// Fluent accessor for reading and writing field values.
/// </summary>
public interface IFieldAccessor
{
    /// <summary>
    /// Gets the field value cast to <typeparamref name="TValue"/>.
    /// </summary>
    TValue Get<TValue>();

    /// <summary>
    /// Gets the field value as an object.
    /// </summary>
    object? Get();

    /// <summary>
    /// Sets the field value.
    /// </summary>
    void Set(object? value);

    /// <summary>
    /// Gets the custom attribute of type <typeparamref name="TAttribute"/> applied to the field, or null if not present.
    /// </summary>
    TAttribute? Attribute<TAttribute>() where TAttribute : Attribute;
}

internal class FieldAccessor(Type targetType, object? instance, string name) : AccessorBase(targetType, instance, name), IFieldAccessor
{
    public object? Get() => Get<object?>();

    public TValue Get<TValue>()
    {
        if (TargetType.GetField(Name, Flags) is { } field)
        {
            return (TValue)field.GetValue(Instance)!;
        }

        if (TargetType.GetField($"<{Name}>k__BackingField", Flags) is { } backingField)
        {
            return (TValue)backingField.GetValue(Instance)!;
        }

        throw new MissingFieldException($"Field '{Name}' not found on type '{TargetType.FullName}'.");
    }

    public void Set(object? value)
    {
        if (TargetType.GetField(Name, Flags) is { } field)
        {
            field.SetValue(Instance, value);
            return;
        }

        if (TargetType.GetField($"<{Name}>k__BackingField", Flags) is { } backingField)
        {
            backingField.SetValue(Instance, value);
            return;
        }

        throw new MissingFieldException($"Field '{Name}' not found on type '{TargetType.FullName}'.");
    }

    public TAttribute? Attribute<TAttribute>() where TAttribute : Attribute
    {
        var field = TargetType.GetField(Name, Flags)
            ?? TargetType.GetField($"<{Name}>k__BackingField", Flags)
            ?? throw new MissingFieldException($"Field '{Name}' not found on type '{TargetType.FullName}'.");

        return GetAttribute<TAttribute>(field);
    }
}
