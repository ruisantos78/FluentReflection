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
- **`docs/`**: Hand-authored HTML API documentation site (mirrors the public API surface). Each public type has a directory under `docs/`, with one HTML page per member plus an `index.html`. All pages share a common sidebar listing every type and member.

## Documentation Duty
**Always keep the `docs/` folder in sync with the source code.** Whenever you create, remove, or update a public class, interface, property, or method, you must reflect that change in the HTML docs. Specifically:

1. **New public type** → create a `docs/<TypeName>/` directory with an `index.html` and one page per member, and add a link in the home `docs/index.html` Types table.
2. **New public member** → create a `docs/<TypeName>/<member>.html` page and add a sidebar entry in **every** page (all pages share the sidebar).
3. **Removed public type or member** → delete the corresponding HTML page(s) and remove all sidebar links and table rows referencing them.
4. **Changed signature/behavior** → update the relevant HTML page(s) (title, declaration, description, exceptions) and any affected sidebar text.
5. **XML doc comments in source** and the hand-authored HTML docs must stay consistent.

When in doubt, run a link check (e.g. grep the sidebar) to confirm no page references a missing file after your edits.

### Version Metadata Rules (always apply when editing docs)
Every page is versioned so a reader can select a version in the header dropdown and filter out members that did not exist yet. Whenever you add, remove, or update a public type/member, apply these rules:

1. **New type or member** → assign it the **next unreleased version** as its "since" version (the `<Version>` currently in `src/FluentReflection/FluentReflection.csproj`, before it is bumped), e.g. `1.0.0.6`.
2. **`since-version` meta** → every HTML page must carry `<meta name="since-version" content="X.Y.Z.W">` in its `<head>`, equal to the version that introduced that page's type/member. Index pages use the type's since-version; the home `docs/index.html` uses the latest version.
3. **`data-since` attributes** → every sidebar type link (`a.cls`), sidebar member link (`a.meth`), type `<details>` block, index table `<tr>`, and detailed member `<div class="member">` must carry `data-since="X.Y.Z.W"` so the JS can hide it for older selections.
4. **Version list** → keep `docs/js/version.js`'s `VERSIONS` array up to date, always adding the newest version at the front (descending order). New members are introduced at that newest version.
5. **Removed type/member** → remove its page(s), its sidebar `data-since` links and table rows, and any stale `since-version`/`data-since` references.
6. **Verified after editing** → confirm: the dropdown loads (`docs/index.html` uses `js/version.js`, subpages use `../js/version.js`), every page has a `since-version` meta, no `data-since` is empty, and no page links to a missing file.

The version rules above complement the release workflow: the since-version of new docs matches the version that will be released from `main` (see Release & Versioning Workflow below).

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
Follow these step-by-step instructions when releasing a new version. The `<Version>` already on `main` is the version that gets released; it is increased only as the final step.

1. **Validate Build & Tests**:
   ```bash
   dotnet build
   dotnet test
   ```
2. **Build Package Artifact**:
   ```bash
   dotnet pack src/FluentReflection/FluentReflection.csproj -c Release
   ```
3. **Commit & Tag**:
   ```bash
   git add .
   git commit -m "release: v<VERSION>"
   git tag v<VERSION> -m "Release v<VERSION>"
   ```
4. **Push & Create GitHub Release** (always generate the release description from the commits between tags):
   ```bash
   git push origin main --tags
   gh release create v<VERSION> src/FluentReflection/bin/Release/*.nupkg --generate-notes
   ```
5. **Docs Version (already current)**: The version displayed in `docs/index.html` install snippets is kept in sync with the version being released, so it is already `<VERSION>` on `main` and needs no further change — just confirm it matches before publishing.
6. **Bump Project Version (last step)**: After the tag is created and the package is built, increase the `<Version>` in [`src/FluentReflection/FluentReflection.csproj`](file:///Volumes/Users/ruisantos/Projects/fluent-reflection/src/FluentReflection/FluentReflection.csproj) to the next unreleased version (e.g. `1.0.0.6` → `1.0.0.7`) and commit it, ready for the next release. Any new source change made on `main` from that point on must update the docs (per the Documentation Duty above) and will ship in that next version.

> **Version Consistency**: The `<Version>` on `main` is the version to be released — build and tag it as-is, then increase it only after the release is complete. Keep `src/FluentReflection/FluentReflection.csproj` and the install snippets in `docs/index.html` in sync; the docs version (step 5) is already current on `main` and only needs to be confirmed, then the project version is bumped (step 6).
