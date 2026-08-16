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
- **`docs/`**: Static **single-page application (SPA)** documentation site (mirrors the public API surface). It is pure HTML + client-side JS + JS data — **no build step, no Python/Node at runtime**. GitHub Pages serves `docs/` directly and the browser loads the data via `<script>` tags. All content lives in data files:
  - `docs/index.html` — the single HTML shell (header, version dropdown, sidebar container, content area).
  - `docs/js/app.js` — the SPA: loads `data/*.js`, builds the sidebar, routes by URL hash (`#/TypeName` and `#/TypeName/member`), renders pages, applies version filtering, and powers search.
  - `docs/data/api.js` — registry global `window.FR_API`: `versions` (descending), `current`, `namespaces` (ordered), and `install` metadata.
  - `docs/data/<TypeName>.js` — one file per public type; assigns `window.FR_TYPES["<TypeName>"]` with `name`, `namespace`, `kind`, `since`, `declaration`, `overline`, ordered `sections` (HTML), `members[]`, and `properties[]`.
  - `docs/scripts/convert.py` — dev-time only: one-off migration script that parsed the original static HTML into the JS data. Not used at runtime.
  - `docs/style.css`, `docs/icon.png`.

## Documentation Duty
**Always keep the `docs/` data files in sync with the source code.** Because the site is data-driven, adding/removing a class or member touches only the JS data files (plus the registry) — not every page. Whenever you create, remove, or update a public class, interface, property, or method:

1. **New public type** → create `docs/data/<TypeName>.js` and add it (under the correct namespace) to the `namespaces` array in `docs/data/api.js`.
2. **New public member** → add an entry to the `members` array (or `properties` array) of the type's `docs/data/<TypeName>.js`. It appears automatically in the sidebar, the type's methods table, and search.
3. **Removed public type or member** → delete it from the corresponding JS data file(s) and from `api.js`'s `namespaces`.
4. **Changed signature/behavior** → update the type/member's `declaration`, `sections` (Definition/Parameters/Returns/Remarks/Exceptions), and description in the data.
5. **XML doc comments in source** and the JS data must stay consistent.

The `sections` array stores HTML fragments (paragraphs, tables) rendered verbatim by `app.js`, preserving rich formatting. Follow the schema already present in existing `data/*.js` files.

### Version Metadata Rules (always apply when editing docs)
Every type/member carries a `since` version so a reader can select a version in the header dropdown and hide members that did not exist yet. Whenever you add, remove, or update a public type/member, apply these rules:

1. **New type or member** → set its `since` field to the **next unreleased version** (the `<Version>` currently in `src/FluentReflection/FluentReflection.csproj`, before it is bumped), e.g. `1.0.0.6`.
2. **New version released** → prepend it to the `versions` array in `docs/data/api.js` (descending order, newest first) and update `current`. New members introduced that release carry that version as their `since`.
3. **Removed type/member** → remove its entry from the data and from `api.js`'s `namespaces`.
4. **Verified after editing** → confirm: `docs/data/api.js` and every `docs/data/*.js` define valid globals (e.g. load `docs/index.html` locally or in the browser), no `since` is empty, and every entry's `name`/`members` are routable. The SPA filters sidebar, tables, and search by `since` against the selected version automatically.

The version rules above complement the release workflow: the `since` of new docs matches the version that will be released from `main` (see Release & Versioning Workflow below).

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
- **GitHub Packages publishing**: The `.github/workflows/publish.yml` workflow publishes the package to the GitHub Packages NuGet registry (`https://nuget.pkg.github.com/ruisantos78/index.json`) automatically when a version tag (`v*`) is pushed. It uses the `GITHUB_TOKEN` (no PAT needed), builds/tests/packs in Release, and pushes the `.nupkg`. The package is private by default on GitHub Packages — change visibility via repo → Packages → `FluentReflection.NET` → Package settings. The `RepositoryUrl` in `FluentReflection.csproj` auto-links the package to the `ruisantos78/FluentReflection` repo.

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
