using FluentReflection.Accessors;

namespace FluentReflection;

internal class ClassWrapper : IClass
{
    private readonly System.Reflection.BindingFlags _flags;

    public Type TargetType { get; }
    public object? TargetInstance { get; }

    public ClassWrapper(Type targetType, object? targetInstance)
    {
        TargetType = targetType ?? throw new ArgumentNullException(nameof(targetType));
        TargetInstance = targetInstance;
        _flags = targetInstance is null
            ? System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Public
            : System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Public;
    }



    public IPropertyAccessor Property(string name) => new PropertyAccessor(TargetType, TargetInstance, name);

    public IFieldAccessor Field(string name) => new FieldAccessor(TargetType, TargetInstance, name);

    public IMethodAccessor Method(string name) => new MethodAccessor(TargetType, TargetInstance, name);

    public object? Get(string name) => Get<object?>(name);

    public TValue Get<TValue>(string name)
    {
        var members = TargetType.GetMember(name, System.Reflection.MemberTypes.Field | System.Reflection.MemberTypes.Property, _flags);

        if (members.FirstOrDefault(m => m is System.Reflection.FieldInfo) is System.Reflection.FieldInfo field)
        {
            return (TValue)field.GetValue(TargetInstance)!;
        }

        if (members.FirstOrDefault(m => m is System.Reflection.PropertyInfo) is System.Reflection.PropertyInfo property)
        {
            return (TValue)property.GetValue(TargetInstance)!;
        }

        if (TargetType.GetField($"<{name}>k__BackingField", _flags) is { } backingField)
        {
            return (TValue)backingField.GetValue(TargetInstance)!;
        }

        throw new MissingMemberException($"Field, property, or backing field '{name}' not found on type '{TargetType.FullName}'.");
    }

    public void Set(string name, object? value)
    {
        var members = TargetType.GetMember(name, System.Reflection.MemberTypes.Field | System.Reflection.MemberTypes.Property, _flags);

        if (members.FirstOrDefault(m => m is System.Reflection.FieldInfo) is System.Reflection.FieldInfo field)
        {
            field.SetValue(TargetInstance, value);
            return;
        }

        if (TargetType.GetField($"<{name}>k__BackingField", _flags) is { } backingField)
        {
            backingField.SetValue(TargetInstance, value);
            return;
        }

        if (members.FirstOrDefault(m => m is System.Reflection.PropertyInfo) is System.Reflection.PropertyInfo property)
        {
            property.SetValue(TargetInstance, value);
            return;
        }

        throw new MissingMemberException($"Field, property, or backing field '{name}' not found on type '{TargetType.FullName}'.");
    }



    public void Invoke(string name, params object?[] args) => Method(name).Invoke(args);

    public TResult Invoke<TResult>(string name, params object?[] args) => Method(name).Invoke<TResult>(args);

    public Task InvokeAsync(string name, params object?[] args) => Method(name).InvokeAsync(args);

    public Task<TResult> InvokeAsync<TResult>(string name, params object?[] args) => Method(name).InvokeAsync<TResult>(args);
}
