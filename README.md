# Monorepo DDD Modulith Template

A production-ready, empty monorepo template for building DDD (Domain-Driven Design) modulith applications with NX, TypeScript, Changesets, and a modern CI/CD pipeline.

---

## 🚀 Stack

| Tool | Purpose |
|------|---------|
| **NX** | Monorepo orchestration, affected detection, caching |
| **pnpm** | Fast, disk-efficient package manager |
| **TypeScript** | Strict type-safe development |
| **tsup** | Ultra-fast package builds (esbuild-based) |
| **Changesets** | Version management & changelog generation |
| **ESLint** | Linting with DDD boundary enforcement |
| **Prettier** | Code formatting |

---

## 📁 Directory Structure

```
monorepo-modulith-template/
├── apps/                          # Deployable applications (NestJS, Next.js, etc.)
│   └── <app-name>/
│       ├── src/
│       ├── Dockerfile
│       ├── package.json           # Must include "version" for Docker tagging
│       ├── project.json           # NX project config with tags
│       └── tsconfig.json
│
├── packages/                      # Shared packages (Bounded Contexts layers)
│   ├── shared-kernel/             # Cross-cutting types shared by all BCs (flat — no DDD layers)
│   │   └── src/
│   │       ├── types/             # Shared interfaces and type aliases
│   │       ├── value-objects/     # Common Value Objects (e.g. Email, Money, DateRange)
│   │       └── utils/             # Pure helper functions (ids, dates, etc.)
│   │
│   └── <bc-name>/                 # A Bounded Context (e.g. catalog, orders)
│       ├── domain/                # Entities, VOs, Aggregates, Domain Events
│       │   └── src/
│       ├── application/           # Use Cases, Ports, Application Services
│       │   └── src/
│       └── infrastructure/        # Adapters, Repositories impl, External Services
│           └── src/
│
├── .changeset/
│   └── config.json                # Changesets configuration
│
├── .github/
│   └── workflows/
│       ├── changesets.yml         # Auto-creates "Version Packages" PR
│       ├── docker-publish.yml     # Builds & pushes Docker images (affected only)
│       └── integration.yml        # Tests + Lint in parallel on every PR
│
├── eslint.config.js               # ESLint with DDD boundary rules
├── nx.json                        # NX workspace configuration
├── package.json                   # Root scripts & devDependencies
├── pnpm-workspace.yaml            # pnpm workspace definition
├── tsconfig.base.json             # Strict TypeScript base config
└── README.md
```

---

## 🏗️ DDD Architecture Conventions

### Bounded Context (BC) Structure

Each domain is organized as a BC with three layers:

```
packages/<bc-name>/
  ├── domain/        # type:domain  — Pure business logic, no dependencies
  ├── application/   # type:application — Use cases, depends on domain + shared-kernel
  └── infrastructure/ # type:infrastructure — Adapters, depends on domain + application + shared-kernel
```

### Shared-Kernel Structure

`shared-kernel` is **not** a Bounded Context. It is a flat package with **no DDD layers**, containing shared types, Value Objects, and utilities reused across multiple BCs.

```
packages/shared-kernel/
  ├── src/
  │   ├── types/          # Shared interfaces and type aliases
  │   ├── value-objects/  # Common Value Objects (e.g. Email, Money, DateRange)
  │   └── utils/          # Pure helper functions (ids, dates, etc.)
  └── src/index.ts        # Barrel export
```

**When to put something in shared-kernel vs a BC's domain layer:**

| Criterion | shared-kernel | BC domain layer |
|-----------|--------------|-----------------|
| Used by **multiple** BCs | ✅ | ❌ |
| Specific to **one** BC | ❌ | ✅ |
| Pure types / VOs / utils | ✅ | ✅ |
| Has business rules tied to a specific context | ❌ | ✅ |

If you create multiple shared-kernel packages, keep them **independent**: a shared-kernel must not depend on another shared-kernel. Use clear names such as `shared-kernel-auth` or `shared-kernel-billing`.

### NX Project Tags

Every project **must** declare tags in its `project.json`:

```json
{
  "tags": ["type:domain", "scope:catalog"]
}
```

| Tag | Description |
|-----|-------------|
| `type:domain` | Pure domain layer |
| `type:application` | Application / use case layer |
| `type:infrastructure` | Infrastructure / adapter layer |
| `type:app` | Deployable application |
| `type:shared-kernel` | Shared kernel package (flat, no DDD layers) |
| `scope:<bc-name>` | Bounded Context name (e.g. `scope:catalog`) |
| `scope:shared` | Shared kernel (any `packages/shared-kernel*/` package) |

### Allowed Dependency Flow

```
shared-kernel    ←  domain  ←  application  ←  infrastructure  ←  app
```

**Full boundary rule matrix:**

| Source → Target | domain | application | infrastructure | app | shared-kernel |
|---|---|---|---|---|---|
| **domain** | ✅ own BC | ❌ | ❌ | ❌ | ✅ |
| **application** | ✅ own BC | ✅ own BC | ❌ | ❌ | ✅ |
| **infrastructure** | ✅ own BC | ✅ own BC | ✅ own BC | ❌ | ✅ |
| **app** | ❌ | ✅ any | ✅ any | ✅ own | ✅ |
| **shared-kernel** | ❌ | ❌ | ❌ | ❌ | ❌ |

**Strictly forbidden:**
- ❌ `domain` → `application`
- ❌ `domain` → `infrastructure`
- ❌ `application` → `infrastructure`
- ❌ Cross-BC imports (except via `shared-kernel`)
- ❌ `shared-kernel` → `shared-kernel`

These rules are **enforced automatically** by `eslint-plugin-boundaries`.

### Advanced Boundary Cases

#### Infrastructure → shared-kernel

**Allowed and intentional.** Infrastructure may import shared-kernel types to reconstitute
stored or serialized representations of domain events and value objects — for example when
reading from an outbox table, replaying events in an event-sourced system, or mapping a DB
row back into a rich Value Object.

This is **not a model-smell** as long as:
- The shared-kernel types are pure value types (no side effects, no infrastructure dependencies).
- The dependency flows in one direction only: infrastructure reads shared-kernel, never the reverse.

#### shared-kernel → shared-kernel

**Forbidden.** A shared-kernel package must not depend on another shared-kernel package.

Rationale:
- It introduces **transitive coupling** between bounded contexts.
- It increases the **coordination cost** of every change.
- It turns shared-kernels into a dependency chain instead of a small, explicit contract.

If two shared-kernels start sharing concepts, prefer either:
- merging them into a single shared-kernel, or
- extracting a smaller common package and having BCs depend on it directly instead of chaining shared-kernels.

Every `packages/shared-kernel*/` directory is matched by the ESLint boundary element pattern, but each generated `project.json` must still carry the correct tags (`type:shared-kernel,scope:shared`).

---

## ⚙️ CI/CD Workflows

### 1. `changesets.yml` — Version Packages

Triggered on every push to `main`. Uses `changesets/action` to automatically create or update a "Version Packages" PR when changesets are present.

**Flow:**
1. Developer adds a changeset to their PR: `pnpm changeset`
2. PR is merged to `main`
3. Changesets action creates/updates a "Version Packages" PR
4. The PR bumps all affected packages + cascades to dependent apps (`updateInternalDependencies: "patch"`)

### 2. `docker-publish.yml` — Build & Push Docker Images

Triggered on every push to `main`. Uses `nx affected` to detect which apps changed, then builds and pushes Docker images **only for those apps**.

**Tags applied:**
- `ghcr.io/<org>/<repo>/<app>:<version>` (from `package.json`)
- `ghcr.io/<org>/<repo>/<app>:latest`

**Requirements per app:**
- Must have a `Dockerfile` at `apps/<app-name>/Dockerfile`
- Must have a `version` field in `apps/<app-name>/package.json`

### 3. `integration.yml` — Tests & Lint in Parallel

Triggered on every PR targeting `main`. Runs unit tests and lint **in parallel** (two independent jobs), only for affected projects.

---

## 🔧 Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9

```bash
npm install -g pnpm@latest
```

### Install dependencies

```bash
pnpm install
```

### Adding a new Bounded Context

```bash
# Create a domain package
pnpm nx g @nx/js:library bc-catalog-domain \
  --directory=packages/bc-catalog/domain \
  --bundler=tsup \
  --tags="type:domain,scope:catalog"

# Create an application package
pnpm nx g @nx/js:library bc-catalog-application \
  --directory=packages/bc-catalog/application \
  --bundler=tsup \
  --tags="type:application,scope:catalog"

# Create an infrastructure package
pnpm nx g @nx/js:library bc-catalog-infrastructure \
  --directory=packages/bc-catalog/infrastructure \
  --bundler=tsup \
  --tags="type:infrastructure,scope:catalog"
```

### Adding a new Shared-Kernel package

```bash
pnpm nx g @nx/js:library shared-kernel-auth \
  --directory=packages/shared-kernel-auth \
  --bundler=tsup \
  --tags="type:shared-kernel,scope:shared"
```

The `packages/shared-kernel*/` glob is recognized automatically by the ESLint boundary rules, but these shared-kernel packages must remain independent from one another.

### Adding a new Application

```bash
pnpm nx g @nx/node:application api-gateway \
  --directory=apps/api-gateway \
  --tags="type:app,scope:api-gateway"
```

Don't forget to add a `Dockerfile` for Docker builds.

### Creating a changeset

```bash
pnpm changeset
# Select the packages that changed
# Choose patch/minor/major
# Write a summary
```

---

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `pnpm build` | Build all projects |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint all projects |
| `pnpm changeset` | Create a new changeset |
| `pnpm version-packages` | Bump versions (used by CI) |
| `pnpm format` | Format code with Prettier |

---

## 🐳 Docker

Each app in `apps/` should have its own `Dockerfile`. The CI pipeline automatically builds and pushes images for apps whose version has changed after a "Version Packages" PR is merged.

Example `Dockerfile` location:
```
apps/
  └── api-gateway/
      └── Dockerfile    ← build context is the monorepo root
```

The Docker image is built with the monorepo root as the build context, so you can reference shared files and run NX build commands inside the container.

---

## 📋 Changeset Configuration

Key settings in `.changeset/config.json`:

- **`updateInternalDependencies: "patch"`** — When a BC package is bumped, all apps that depend on it are automatically bumped (at minimum as a patch). This ensures Docker images are always rebuilt when their dependencies change.
- **`access: "restricted"`** — Packages are private by default (not published to npm). Apps are versioned only for Docker tagging purposes.
