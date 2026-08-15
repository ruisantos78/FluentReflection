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
