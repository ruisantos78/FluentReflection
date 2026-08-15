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
}

internal class FieldAccessor(Type targetType, object? instance, string name) : IFieldAccessor
{
    private System.Reflection.BindingFlags Flags => 
        System.Reflection.BindingFlags.NonPublic | 
        System.Reflection.BindingFlags.Public | 
        (instance is null ? System.Reflection.BindingFlags.Static : System.Reflection.BindingFlags.Instance);


    public object? Get() => Get<object?>();

    public TValue Get<TValue>()
    {
        if (targetType.GetField(name, Flags) is { } field)
        {
            return (TValue)field.GetValue(instance)!;
        }

        if (targetType.GetField($"<{name}>k__BackingField", Flags) is { } backingField)
        {
            return (TValue)backingField.GetValue(instance)!;
        }

        throw new MissingFieldException($"Field '{name}' not found on type '{targetType.FullName}'.");
    }

    public void Set(object? value)
    {
        if (targetType.GetField(name, Flags) is { } field)
        {
            field.SetValue(instance, value);
            return;
        }

        if (targetType.GetField($"<{name}>k__BackingField", Flags) is { } backingField)
        {
            backingField.SetValue(instance, value);
            return;
        }

        throw new MissingFieldException($"Field '{name}' not found on type '{targetType.FullName}'.");
    }
}
