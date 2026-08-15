namespace FluentReflection.Tests;

public class EventsTests
{
    private class TargetClass
    {
        public event EventHandler? OnLoad;
        public event Action<int>? OnNumberChanged;
        private event EventHandler? OnPrivateEvent;
        public static event EventHandler? OnStaticEvent;

        public void RaiseOnLoad() => OnLoad?.Invoke(this, EventArgs.Empty);
        public void RaiseOnNumberChanged(int val) => OnNumberChanged?.Invoke(val);
        public void RaiseOnPrivateEvent() => OnPrivateEvent?.Invoke(this, EventArgs.Empty);
        public static void RaiseOnStaticEvent() => OnStaticEvent?.Invoke(null, EventArgs.Empty);
        public static void ResetStaticEvent() => OnStaticEvent = null;
    }

    [Fact]
    public void GetInvocationList_ReturnsEmpty_WhenNoSubscribers()
    {
        var target = new TargetClass();

        var list1 = Class.Of(target).Event("OnLoad").GetInvocationList();
        var list2 = Class.Of(target).GetInvocationList("OnLoad");

        Assert.Empty(list1);
        Assert.Empty(list2);
    }

    [Fact]
    public void GetInvocationList_ReturnsSubscribers_WhenSubscribed()
    {
        var target = new TargetClass();
        EventHandler handler1 = (sender, args) => { };
        EventHandler handler2 = (sender, args) => { };

        target.OnLoad += handler1;
        target.OnLoad += handler2;

        var invocationList = Class.Of(target).Event("OnLoad").GetInvocationList();

        Assert.Equal(2, invocationList.Length);
        Assert.Contains(handler1, invocationList);
        Assert.Contains(handler2, invocationList);
    }

    [Fact]
    public void GetInvocationList_Shortcut_ReturnsSubscribers()
    {
        var target = new TargetClass();
        Action<int> handler = (val) => { };

        target.OnNumberChanged += handler;

        var list = Class.Of(target).GetInvocationList("OnNumberChanged");

        Assert.Single(list);
        Assert.Equal(handler, list[0]);
    }

    [Fact]
    public void GetInvocationList_WorksWithPrivateEvents()
    {
        var target = new TargetClass();
        EventHandler handler = (sender, args) => { };

        // Subscribe to private event via reflection field or property/event setter or directly in test
        var privateEventField = typeof(TargetClass).GetField("OnPrivateEvent", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
        privateEventField!.SetValue(target, handler);

        var list = Class.Of(target).Event("OnPrivateEvent").GetInvocationList();

        Assert.Single(list);
        Assert.Equal(handler, list[0]);
    }

    [Fact]
    public void GetInvocationList_WorksWithStaticEvents()
    {
        TargetClass.ResetStaticEvent();
        EventHandler handler = (sender, args) => { };

        TargetClass.OnStaticEvent += handler;

        try
        {
            var list = Class.Of<TargetClass>().Event("OnStaticEvent").GetInvocationList();
            var shortcutList = Class.Of<TargetClass>().GetInvocationList("OnStaticEvent");

            Assert.Single(list);
            Assert.Equal(handler, list[0]);
            Assert.Single(shortcutList);
            Assert.Equal(handler, shortcutList[0]);
        }
        finally
        {
            TargetClass.ResetStaticEvent();
        }
    }

    [Fact]
    public void GetInvocationList_ThrowsMissingMemberException_WhenEventDoesNotExist()
    {
        var target = new TargetClass();

        Assert.Throws<MissingMemberException>(() => Class.Of(target).Event("NonExistentEvent").GetInvocationList());
        Assert.Throws<MissingMemberException>(() => Class.Of(target).GetInvocationList("NonExistentEvent"));
    }
}
