using FluentReflection;
using System.Reflection;

namespace FluentReflection.Tests;

public class AssembliesTests
{
    private class EmbeddedTarget
    {
        private static string Identifier => "Embedded_OK";

        public static string GetIdentifier() => Identifier;
    }

    [Fact]
    public void ClassFrom_AssemblyAndTypeName_ResolvesTargetType()
    {
        var assembly = Assembly.GetExecutingAssembly();
        var wrapper = Class.From(assembly, nameof(EmbeddedTarget));

        Assert.NotNull(wrapper);
        Assert.Equal(typeof(EmbeddedTarget), wrapper.TargetType);
        Assert.Equal("Embedded_OK", wrapper.Get<string>("Identifier"));
    }

    [Fact]
    public void ClassFrom_TypeName_ResolvesTargetTypeFromAppDomain()
    {
        var wrapper = Class.From(nameof(EmbeddedTarget));

        Assert.NotNull(wrapper);
        Assert.Equal(typeof(EmbeddedTarget), wrapper.TargetType);
        Assert.Equal("Embedded_OK", wrapper.Get<string>("Identifier"));
    }
}
