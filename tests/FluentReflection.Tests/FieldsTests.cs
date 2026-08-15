using FluentReflection;

namespace FluentReflection.Tests;

public class FieldsTests
{
    private class Target
    {
        private string _privateField = "initial_private";
        public string PublicField = "initial_public";
        private static int _staticField = 100;

        public string GetPrivateField() => _privateField;
        public static int GetStaticField() => _staticField;
    }

    [Fact]
    public void GetAndSet_PrivateInstanceField_WorksCorrectly()
    {
        var target = new Target();

        Assert.Equal("initial_private", Class.Of(target).Get<string>("_privateField"));

        Class.Of(target).Set("_privateField", "updated_private");

        Assert.Equal("updated_private", Class.Of(target).Get<string>("_privateField"));
        Assert.Equal("updated_private", target.GetPrivateField());
    }

    [Fact]
    public void FluentFieldAccessor_GetAndSet_WorksCorrectly()
    {
        var target = new Target();

        Assert.Equal("initial_private", Class.Of(target).Field("_privateField").Get<string>());

        Class.Of(target).Field("_privateField").Set("fluent_private");

        Assert.Equal("fluent_private", Class.Of(target).Field("_privateField").Get<string>());
        Assert.Equal("fluent_private", target.GetPrivateField());
    }

    [Fact]
    public void GetAndSet_StaticField_WorksCorrectly()
    {
        Assert.Equal(100, Class.Of<Target>().Get<int>("_staticField"));

        Class.Of<Target>().Set("_staticField", 250);

        Assert.Equal(250, Class.Of<Target>().Get<int>("_staticField"));
        Assert.Equal(250, Target.GetStaticField());
    }
}
