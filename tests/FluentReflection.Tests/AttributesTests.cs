using FluentReflection;

namespace FluentReflection.Tests;

public class AttributesTests
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Field | AttributeTargets.Property | AttributeTargets.Method)]
    private sealed class TestAttribute(string value) : Attribute
    {
        public string Value { get; } = value;
    }

    [Test("TypeLevel")]
    private class Target
    {
        [Test("FieldLevel")]
        private string _field = "x";

        [Test("PropertyLevel")]
        public string Prop { get; set; } = "y";

        [Test("MethodLevel")]
        public void DoWork() { }
    }

    [Fact]
    public void Attribute_OnClass_ReturnsTypeAttribute()
    {
        var attr = Class.Of(typeof(Target)).Attribute<TestAttribute>();

        Assert.NotNull(attr);
        Assert.Equal("TypeLevel", attr!.Value);
    }

    [Fact]
    public void Attribute_OnClass_ReturnsNull_WhenNotPresent()
    {
        Assert.Null(Class.Of(typeof(Target)).Attribute<ObsoleteAttribute>());
    }

    [Fact]
    public void Attribute_OnField_ReturnsFieldAttribute()
    {
        var target = new Target();

        var attr = Class.Of(target).Field("_field").Attribute<TestAttribute>();

        Assert.NotNull(attr);
        Assert.Equal("FieldLevel", attr!.Value);
    }

    [Fact]
    public void Attribute_OnProperty_ReturnsPropertyAttribute()
    {
        var target = new Target();

        var attr = Class.Of(target).Property("Prop").Attribute<TestAttribute>();

        Assert.NotNull(attr);
        Assert.Equal("PropertyLevel", attr!.Value);
    }

    [Fact]
    public void Attribute_OnMethod_ReturnsMethodAttribute()
    {
        var target = new Target();

        var attr = Class.Of(target).Method("DoWork").Attribute<TestAttribute>();

        Assert.NotNull(attr);
        Assert.Equal("MethodLevel", attr!.Value);
    }

    [Fact]
    public void Attribute_OnField_ReturnsNull_WhenNotPresent()
    {
        var target = new Target();

        Assert.Null(Class.Of(target).Field("_field").Attribute<ObsoleteAttribute>());
    }
}