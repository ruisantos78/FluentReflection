using FluentReflection;

namespace FluentReflection.Tests;

public class PropertiesTests
{
    private class Target
    {
        public string AutoProp { get; private set; } = "initial_auto";
        private string CustomProp => "custom_value";
        private static string StaticProp { get; set; } = "initial_static";

        public static string GetStaticProp() => StaticProp;
    }

    [Fact]
    public void GetAndSet_AutoPropertyBackingField_WorksCorrectly()
    {
        var target = new Target();

        Assert.Equal("initial_auto", Class.Of(target).Get<string>("AutoProp"));

        Class.Of(target).Set("AutoProp", "updated_auto");

        Assert.Equal("updated_auto", Class.Of(target).Get<string>("AutoProp"));
        Assert.Equal("updated_auto", target.AutoProp);
    }

    [Fact]
    public void FluentPropertyAccessor_GetAndSet_WorksCorrectly()
    {
        var target = new Target();

        Assert.Equal("initial_auto", Class.Of(target).Property("AutoProp").Get<string>());

        Class.Of(target).Property("AutoProp").Set("fluent_auto");

        Assert.Equal("fluent_auto", Class.Of(target).Property("AutoProp").Get<string>());
        Assert.Equal("fluent_auto", target.AutoProp);
    }

    [Fact]
    public void NonGenericGet_AutoProperty_WorksCorrectly()
    {
        var target = new Target();

        Assert.Equal("initial_auto", Class.Of(target).Get("AutoProp"));
        Assert.Equal("initial_auto", Class.Of(target).Property("AutoProp").Get());
    }

    [Fact]
    public void Get_CustomProperty_WorksCorrectly()
    {
        var target = new Target();

        Assert.Equal("custom_value", Class.Of(target).Get<string>("CustomProp"));
    }

    [Fact]
    public void GetAndSet_StaticProperty_WorksCorrectly()
    {
        Assert.Equal("initial_static", Class.Of<Target>().Get<string>("StaticProp"));

        Class.Of<Target>().Set("StaticProp", "updated_static");

        Assert.Equal("updated_static", Class.Of<Target>().Get<string>("StaticProp"));
        Assert.Equal("updated_static", Target.GetStaticProp());
    }
}
