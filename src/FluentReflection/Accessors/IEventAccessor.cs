using System.Reflection;

namespace FluentReflection.Accessors;

/// <summary>
/// Fluent accessor for interacting with events and their subscribers.
/// </summary>
public interface IEventAccessor
{
    /// <summary>
    /// Gets the invocation list of delegates subscribed to the event.
    /// </summary>
    /// <returns>An array of delegates representing the event subscribers, or an empty array if there are no subscribers.</returns>
    Delegate[] GetInvocationList();

    /// <summary>
    /// Subscribes the given delegate to the event.
    /// </summary>
    /// <param name="handler">The delegate to subscribe.</param>
    void Add(Delegate handler);

    /// <summary>
    /// Unsubscribes the given delegate from the event.
    /// </summary>
    /// <param name="handler">The delegate to unsubscribe.</param>
    void Remove(Delegate handler);
}

internal class EventAccessor(Type targetType, object? instance, string name) : IEventAccessor
{
    private BindingFlags Flags =>
        BindingFlags.NonPublic |
        BindingFlags.Public |
        (instance is null ? BindingFlags.Static : BindingFlags.Instance);

    public Delegate[] GetInvocationList()
    {
        FieldInfo? field = GetFieldInfo(targetType, name)
            ?? GetFieldInfo(targetType, $"<{name}>k__BackingField")
            ?? GetFieldInfo(targetType, $"_{name}");

        if (field is null)
        {
            var eventInfo = GetEventInfo(targetType, name);
            if (eventInfo is not null && eventInfo.DeclaringType is { } declaringType)
            {
                field = GetFieldInfo(declaringType, name)
                    ?? GetFieldInfo(declaringType, $"<{name}>k__BackingField")
                    ?? GetFieldInfo(declaringType, $"_{name}");
            }
        }

        if (field is null)
        {
            throw new MissingMemberException($"Event or backing field for event '{name}' not found on type '{targetType.FullName}'.");
        }

        var fieldValue = field.GetValue(instance);
        if (fieldValue is Delegate del)
        {
            return del.GetInvocationList();
        }

        return Array.Empty<Delegate>();
    }

    private FieldInfo? GetFieldInfo(Type type, string fieldName)
    {
        Type? current = type;
        while (current != null)
        {
            var field = current.GetField(fieldName, Flags);
            if (field != null) return field;
            current = current.BaseType;
        }
        return null;
    }

    public void Add(Delegate handler)
    {
        var eventInfo = GetEventInfo(targetType, name)
            ?? throw new MissingMemberException($"Event '{name}' not found on type '{targetType.FullName}'.");

        var addMethod = eventInfo.GetAddMethod(true)
            ?? throw new MissingMemberException($"Event '{name}' does not expose an add accessor.");

        addMethod.Invoke(instance, [handler]);
    }

    public void Remove(Delegate handler)
    {
        var eventInfo = GetEventInfo(targetType, name)
            ?? throw new MissingMemberException($"Event '{name}' not found on type '{targetType.FullName}'.");

        var removeMethod = eventInfo.GetRemoveMethod(true)
            ?? throw new MissingMemberException($"Event '{name}' does not expose a remove accessor.");

        removeMethod.Invoke(instance, [handler]);
    }

    private EventInfo? GetEventInfo(Type type, string eventName)
    {
        Type? current = type;
        while (current != null)
        {
            var eventInfo = current.GetEvent(eventName, Flags);
            if (eventInfo != null) return eventInfo;
            current = current.BaseType;
        }
        return null;
    }
}
