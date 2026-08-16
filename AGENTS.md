# FluentReflection - Agent Guidelines & Repository Context

## Project Overview
`FluentReflection.NET` is a fluent, intuitive .NET 10 library designed to simplify unit testing by providing an expressive way to access private, internal, and public members (fields, backing fields, properties, methods) using reflection.

## Repository Layout
- **`src/FluentReflection/`**: Main library source code targeting `net10.0`.
  - `Class.cs`: Primary static entry point (`Class.Of(...)`, `Class.From(...)`).
  - `ClassWrapper.cs`: Core reflection implementation wrapping types and instances.
  - `Accessors/`: Member access interfaces (`IFieldAccessor`, `IPropertyAccessor`, etc.).
  - `Extensions/`: Fluent extension methods for member discovery and invocation.
  - `icon.png`: Package icon.
- **`tests/FluentReflection.Tests/`**: Unit test suite powered by `net10.0` and xUnit.

## Build, Test & Package Commands
- **Build Solution**: `dotnet build`
- **Run Unit Tests**: `dotnet test`
- **Package NuGet**: `dotnet pack src/FluentReflection/FluentReflection.csproj -c Release`

## Coding & Architectural Conventions
1. **Target Framework**: .NET 10 (`net10.0`) with C# 13 standard language features.
2. **Nullability & Documentation**: Enforce `<Nullable>enable</Nullable>` and XML doc comments (`<GenerateDocumentationFile>true</GenerateDocumentationFile>`).
3. **Fluent API Design**: Entry points should be chainable and intuitive (`Class.Of(obj).Property("Name").Get()`).
4. **Member Resolution Scopes**: Always handle instance and static reflection correctly, supporting private, backing fields (`<Field>k__BackingField`), internal, and public members.

## Packaging & Releases
- Package ID: `FluentReflection.NET`
- Always verify `icon.png` is included when updating NuGet metadata in `FluentReflection.csproj`.
- Ensure all unit tests pass via `dotnet test` prior to bumping version or creating release tags.

## Release & Versioning Workflow
Follow these step-by-step instructions when releasing a new version:

1. **Bump Version**: Update the `<Version>` element in [`src/FluentReflection/FluentReflection.csproj`](file:///Volumes/Users/ruisantos/Projects/fluent-reflection/src/FluentReflection/FluentReflection.csproj) (e.g. `1.0.0.2`).
2. **Validate Build & Tests**:
   ```bash
   dotnet build
   dotnet test
   ```
3. **Build Package Artifact**:
   ```bash
   dotnet pack src/FluentReflection/FluentReflection.csproj -c Release
   ```
4. **Commit & Tag**:
   ```bash
   git add .
   git commit -m "release: v<VERSION>"
   git tag v<VERSION> -m "Release v<VERSION>"
   ```
5. **Push & Create GitHub Release**:
   ```bash
   git push origin main --tags
   gh release create v<VERSION> src/FluentReflection/bin/Release/*.nupkg --generate-notes
   ```

