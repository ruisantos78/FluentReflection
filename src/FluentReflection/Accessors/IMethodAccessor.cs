namespace FluentReflection.Accessors;

/// <summary>
/// Fluent accessor for invoking synchronous and asynchronous methods.
/// </summary>
public interface IMethodAccessor
{
    /// <summary>
    /// Invokes a void-returning method.
    /// </summary>
    void Invoke(params object?[] args);

    /// <summary>
    /// Invokes a method returning <typeparamref name="TResult"/>.
    /// </summary>
    TResult Invoke<TResult>(params object?[] args);

    /// <summary>
    /// Invokes an asynchronous method returning <see cref="Task"/>.
    /// </summary>
    Task InvokeAsync(params object?[] args);

    /// <summary>
    /// Invokes an asynchronous method returning <see cref="Task{TResult}"/>.
    /// </summary>
    Task<TResult> InvokeAsync<TResult>(params object?[] args);

    /// <summary>
    /// Gets the custom attribute of type <typeparamref name="TAttribute"/> applied to the method, or null if not present.
    /// </summary>
    TAttribute? Attribute<TAttribute>() where TAttribute : Attribute;
}

internal class MethodAccessor(Type targetType, object? instance, string name) : AccessorBase(targetType, instance, name), IMethodAccessor
{
    public void Invoke(params object?[] args)
    {
        var method = FindMatchingMethod(args);
        method.Invoke(Instance, args);
    }

    public TResult Invoke<TResult>(params object?[] args)
    {
        var method = FindMatchingMethod(args);
        var result = method.Invoke(Instance, args);
        return (TResult)result!;
    }

    public Task InvokeAsync(params object?[] args)
    {
        var method = FindMatchingMethod(args);
        var result = method.Invoke(Instance, args);

        if (result is Task task)
        {
            return task;
        }

        return Task.FromException(new InvalidOperationException($"Method '{Name}' did not return a Task."));
    }

    public async Task<TResult> InvokeAsync<TResult>(params object?[] args)
    {
        var method = FindMatchingMethod(args);
        var result = method.Invoke(Instance, args);

        if (result is Task<TResult> genericTask)
        {
            return await genericTask;
        }

        if (result is Task task)
        {
            await task;
            var resultProp = task.GetType().GetProperty("Result");
            if (resultProp is not null)
            {
                return (TResult)resultProp.GetValue(task)!;
            }
        }

        throw new InvalidOperationException($"Method '{Name}' did not return a Task<{typeof(TResult).Name}>.");
    }

    public TAttribute? Attribute<TAttribute>() where TAttribute : Attribute
    {
        var methods = TargetType.GetMethods(Flags)
            .Where(m => m.Name == Name)
            .ToList();

        if (methods.Count == 0)
        {
            throw new MissingMethodException($"Method '{Name}' not found on type '{TargetType.FullName}'.");
        }

        return GetAttribute<TAttribute>(methods[0]);
    }

    private System.Reflection.MethodInfo FindMatchingMethod(object?[] args)
    {
        var methods = TargetType.GetMethods(Flags)
            .Where(m => m.Name == Name)
            .ToList();

        if (methods.Count == 0)
        {
            throw new MissingMethodException($"Method '{Name}' not found on type '{TargetType.FullName}'.");
        }

        if (methods.Count == 1)
        {
            return methods[0];
        }

        foreach (var method in methods)
        {
            var parameters = method.GetParameters();
            if (parameters.Length != args.Length)
            {
                continue;
            }

            bool matches = true;
            for (int i = 0; i < parameters.Length; i++)
            {
                if (args[i] is null)
                {
                    if (parameters[i].ParameterType.IsValueType && Nullable.GetUnderlyingType(parameters[i].ParameterType) is null)
                    {
                        matches = false;
                        break;
                    }
                }
                else if (!parameters[i].ParameterType.IsAssignableFrom(args[i]!.GetType()))
                {
                    matches = false;
                    break;
                }
            }

            if (matches)
            {
                return method;
            }
        }

        return methods[0];
    }
}
