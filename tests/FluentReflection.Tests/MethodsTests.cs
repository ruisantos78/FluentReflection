using FluentReflection;

namespace FluentReflection.Tests;

public class MethodsTests
{
    private class Target
    {
        private string _executedResult = string.Empty;

        public string GetExecutedResult() => _executedResult;

        private string Multiply(string prefix, int times)
        {
            return string.Concat(Enumerable.Repeat(prefix, times));
        }

        private void SetState(string newState)
        {
            _executedResult = newState;
        }

        private async Task<string> FetchDataAsync(string code)
        {
            await Task.Yield();
            return $"Data_{code}";
        }

        private async Task ProcessStateAsync(string newState)
        {
            await Task.Yield();
            _executedResult = $"Async_{newState}";
        }
    }

    [Fact]
    public void Invoke_ReturningMethod_WorksCorrectly()
    {
        var target = new Target();

        string result = Class.Of(target).Invoke<string>("Multiply", "Abc", 3);

        Assert.Equal("AbcAbcAbc", result);
    }

    [Fact]
    public void Invoke_VoidMethod_WorksCorrectly()
    {
        var target = new Target();

        Class.Of(target).Invoke("SetState", "NewStateValue");

        Assert.Equal("NewStateValue", target.GetExecutedResult());
    }

    [Fact]
    public async Task InvokeAsync_GenericTaskMethod_WorksCorrectly()
    {
        var target = new Target();

        string result = await Class.Of(target).InvokeAsync<string>("FetchDataAsync", "999");

        Assert.Equal("Data_999", result);
    }

    [Fact]
    public async Task InvokeAsync_TaskVoidMethod_WorksCorrectly()
    {
        var target = new Target();

        await Class.Of(target).InvokeAsync("ProcessStateAsync", "Processed");

        Assert.Equal("Async_Processed", target.GetExecutedResult());
    }

    [Fact]
    public void FluentMethodAccessor_WorksCorrectly()
    {
        var target = new Target();

        string result = Class.Of(target).Method("Multiply").Invoke<string>("X", 4);
        Assert.Equal("XXXX", result);

        Class.Of(target).Method("SetState").Invoke("FluentState");
        Assert.Equal("FluentState", target.GetExecutedResult());
    }
}
