---
name: Bun
description: Use when building JavaScript/TypeScript applications, setting up HTTP servers, managing dependencies, bundling code, running tests, or deploying full-stack applications. Agents should reach for this skill when working with Bun projects, optimizing runtime performance, configuring package management, or troubleshooting module resolution issues.
metadata:
    mintlify-proj: bun
    version: "1.0"
---

# Bun Skill Reference

## Product summary

Bun is a single-binary JavaScript runtime, package manager, bundler, and test runner built for speed. It replaces Node.js, npm, webpack, and Jest with a unified toolchain. Key files: `bunfig.toml` (Bun configuration), `package.json` (project metadata), `tsconfig.json` (TypeScript settings), `bun.lock` (lockfile). Core commands: `bun run <file>`, `bun install`, `bun build`, `bun test`. Bun is 100% Node.js compatible for npm packages and APIs. Primary docs: https://bun.com/docs

## When to use

- **Running code**: Execute TypeScript, JSX, or JavaScript files directly without compilation steps
- **HTTP servers**: Build servers with `Bun.serve()` for high-performance APIs and web apps
- **Package management**: Replace `npm install` with `bun install` for faster dependency resolution
- **Bundling**: Use `bun build` to bundle applications for production or create standalone executables
- **Testing**: Run tests with `bun test` using Jest-like syntax
- **Development**: Enable hot reloading with `--watch` or `--hot` flags for rapid iteration
- **Monorepos**: Configure workspaces in `package.json` for multi-package projects
- **File I/O**: Use `Bun.file()` and `Bun.write()` for optimized file operations
- **Environment setup**: Load `.env` files automatically for configuration management

## Quick reference

### Essential CLI commands

| Task | Command | Notes |
|------|---------|-------|
| Initialize project | `bun init` | Creates `package.json`, `tsconfig.json`, `index.ts` |
| Create from template | `bun create <template>` | React, Library, or custom templates |
| Run file | `bun <file.ts>` | Executes TypeScript/JavaScript directly |
| Run script | `bun run <script>` | Executes named script from `package.json` |
| Watch mode | `bun --watch <file.ts>` | Auto-restarts on file changes |
| Hot reload | `bun --hot run <script>` | Preserves state during development |
| Install deps | `bun install` | Reads `package.json`, creates `bun.lock` |
| Add package | `bun add <pkg>` | Adds to dependencies |
| Add dev package | `bun add -d <pkg>` | Adds to devDependencies |
| Remove package | `bun remove <pkg>` | Removes from dependencies |
| Run tests | `bun test` | Finds `*.test.ts`, `*.spec.ts` files |
| Build bundle | `bun build <entry>` | Bundles for browser/server |
| Compile executable | `bun build --compile <entry>` | Creates standalone binary |

### Configuration files

| File | Purpose | When needed |
|------|---------|-------------|
| `bunfig.toml` | Bun-specific settings | Optional; only for Bun-specific config |
| `package.json` | Project metadata, scripts, dependencies | Always required |
| `tsconfig.json` | TypeScript compiler options | Recommended for type checking |
| `.env` | Environment variables | When using secrets or config |
| `bun.lock` | Dependency lockfile | Auto-generated; commit to version control |

### Common bunfig.toml sections

```toml
[install]
linker = "hoisted"  # or "isolated" for monorepos
optional = true
dev = true
peer = true

[run]
# Configuration for bun run

[test]
# Configuration for bun test

[jsx]
jsx = "react-jsx"
jsxImportSource = "react"
```

### File type loaders

| Extension | Loader | Behavior |
|-----------|--------|----------|
| `.ts` | `ts` | TypeScript → JavaScript |
| `.tsx` | `tsx` | TypeScript + JSX → JavaScript |
| `.js` | `js` | JavaScript (no transform) |
| `.jsx` | `jsx` | JavaScript + JSX → JavaScript |
| `.json` | `json` | Parsed as module |
| `.yaml`, `.yml` | `yaml` | Parsed at build time |
| `.toml` | `toml` | Parsed at build time |
| `.html` | `html` | Imported as string or bundled |

## Decision guidance

### When to use hoisted vs. isolated installs

| Aspect | Hoisted | Isolated |
|--------|---------|----------|
| **Best for** | Single projects, legacy code | Monorepos, strict dependency isolation |
| **Phantom deps** | ❌ Possible | ✅ Prevented |
| **Disk usage** | ✅ Lower | Similar (uses symlinks) |
| **Node.js compat** | ✅ Standard | ✅ Compatible via symlinks |
| **Configuration** | `linker = "hoisted"` | `linker = "isolated"` |

### When to use bun run vs. bun <file>

| Scenario | Use | Command |
|----------|-----|---------|
| Execute package.json script | `bun run` | `bun run dev` |
| Run TypeScript file directly | `bun <file>` | `bun server.ts` |
| Run executable from node_modules | `bun <bin>` | `bun tsc` |
| Avoid name collision with built-in | `bun run` | `bun run test` (not `bun test`) |

### When to use --watch vs. --hot

| Flag | Use case | Behavior |
|------|----------|----------|
| `--watch` | File watching, auto-restart | Restarts process on file change |
| `--hot` | Development servers | Preserves state, hot module replacement |
| Neither | Production, one-off runs | Runs once and exits |

### When to bundle vs. compile

| Task | Use | Command |
|------|-----|---------|
| Create browser bundle | `bun build` | `bun build app.ts --outdir dist` |
| Create standalone binary | `--compile` | `bun build --compile app.ts --outfile app` |
| Full-stack executable | `--compile` with HTML import | `bun build --compile server.ts --outfile app` |

## Workflow

### 1. Initialize a new Bun project

```bash
bun init my-app
cd my-app
```

This creates:
- `package.json` with default metadata
- `tsconfig.json` with recommended Bun settings
- `index.ts` as entry point
- `.gitignore` and `README.md`

### 2. Install dependencies

```bash
bun install
```

Bun reads `package.json`, resolves versions, and creates `bun.lock`. This is a drop-in replacement for `npm install`.

### 3. Add packages

```bash
bun add express
bun add -d @types/node
```

Bun updates `package.json` and `bun.lock` automatically.

### 4. Write code with TypeScript/JSX support

Bun transpiles on the fly. No separate build step needed for development:

```typescript
// index.ts - TypeScript works out of the box
const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello!");
  },
});
```

### 5. Run during development

```bash
bun --watch index.ts
# or with hot reloading
bun --hot run dev
```

Bun watches files and restarts automatically.

### 6. Configure scripts in package.json

```json
{
  "scripts": {
    "dev": "bun --hot index.ts",
    "build": "bun build index.ts --outdir dist",
    "test": "bun test"
  }
}
```

### 7. Run tests

```bash
bun test
bun test --watch
bun test -t "pattern"  // filter by name
```

Tests use Jest-like syntax: `test()`, `describe()`, `expect()`.

### 8. Build for production

```bash
# Bundle for browser/server
bun build index.ts --outdir dist

# Create standalone executable
bun build --compile index.ts --outfile myapp
./myapp
```

### 9. Deploy

Push the built artifacts or executable to your deployment target. Bun binaries are self-contained and don't require Node.js.

## Common gotchas

- **Watch flag placement**: Use `bun --watch run dev`, not `bun run dev --watch`. Flags must come after `bun`, before the command.
- **Module resolution**: Bun supports both ESM and CommonJS. Mix freely, but be aware of `package.json` `type` field. If not set, `.js` files are treated as CommonJS.
- **TypeScript without tsconfig.json**: Bun works without it, but install `@types/bun` for IDE autocomplete on Bun APIs.
- **Lockfile conflicts**: `bun.lock` is binary. Don't edit manually. Use `bun install` to regenerate.
- **Environment variables**: Bun loads `.env`, `.env.local`, `.env.[NODE_ENV]` automatically. Access via `process.env` or `Bun.env`.
- **Phantom dependencies**: With hoisted installs, packages can access undeclared dependencies. Use isolated installs in monorepos to prevent this.
- **Hot reload limitations**: Only `fetch`, `error`, and `routes` can be updated in `Bun.serve()` without full restart.
- **Bundler vs. runtime**: `bun build` is for bundling; `bun run` is for executing. Don't confuse them.
- **Test file discovery**: Bun finds `*.test.ts`, `*_test.ts`, `*.spec.ts`, `*_spec.ts`. Other patterns won't run.
- **JSX configuration**: Bun reads `tsconfig.json` for JSX settings. If missing, defaults to `react-jsx`. Set explicitly in `bunfig.toml` if needed.

## Verification checklist

Before submitting work with Bun:

- [ ] Run `bun install` to verify dependencies resolve without errors
- [ ] Execute `bun run <script>` to confirm scripts work
- [ ] Run `bun test` to ensure all tests pass
- [ ] Check `bun.lock` is committed (if using version control)
- [ ] Verify `bunfig.toml` has correct settings for your use case
- [ ] Test with `bun --watch` to confirm hot reloading works
- [ ] Build with `bun build` and verify output in `dist/` or specified `--outdir`
- [ ] If creating executable, test `bun build --compile` and run the binary
- [ ] Check `.env` files are in `.gitignore` (don't commit secrets)
- [ ] Verify TypeScript types with `@types/bun` installed for Bun API autocomplete

## Resources

- **Comprehensive navigation**: https://bun.com/docs/llms.txt — Full page-by-page index for all Bun documentation
- **Runtime API reference**: https://bun.com/docs/runtime/bun-apis — Bun-specific APIs like `Bun.serve()`, `Bun.file()`, `Bun.spawn()`
- **Package manager guide**: https://bun.com/docs/pm/cli/install — Complete documentation for `bun install`, workspaces, and dependency management
- **Bundler documentation**: https://bun.com/docs/bundler/index — Build, bundle, and compile options

---

> For additional documentation and navigation, see: https://bun.com/docs/llms.txt