# One Enterprise Cloud — Frontend Architecture & Team Collaboration Demo

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Architecture](https://img.shields.io/badge/Architecture-Official%20OEC-success.svg)](#2-architecture)

This repository is a clean, standalone demonstration of the **Official One Enterprise Cloud Frontend Architecture** and our **3-Team Git Collaboration Workflow**.

---

## Table of Contents
1. [Project Purpose](#1-project-purpose)
2. [Architecture](#2-architecture)
3. [Folder Structure](#3-folder-structure)
4. [Three-Team Model](#4-three-team-model)
5. [Git Workflow](#5-git-workflow)
6. [Branch Naming Strategy](#6-branch-naming-strategy)
7. [Commit Conventions](#7-commit-conventions)
8. [Pull Request Workflow](#8-pull-request-workflow)
9. [Team Ownership Matrix](#9-team-ownership-matrix)
10. [Architectural Dependency Rules](#10-architectural-dependency-rules)
11. [How to Run Locally](#11-how-to-run-locally)
12. [What This Demo Intentionally Does NOT Contain](#12-what-this-demo-intentionally-does-not-contain)

---

## 1. Project Purpose

The purpose of this project is **NOT** to migrate existing application screens, nor to build completed functional modules.

The purpose is to demonstrate:
- **Official frontend architecture** and directory boundaries
- **Domain-based feature separation** across 19 enterprise domains
- **3-team parallel development** without merge conflicts or ownership confusion
- **Git feature-branch workflow** and pull request review gates
- **dev/main branch integration strategy**
- **Strict architectural dependency rules** (allowed vs prohibited imports)
- **Clear team ownership boundaries**
- **A scalable, enterprise-grade unified frontend organization**

---

## 2. Architecture

The frontend is a **unified enterprise web application** built with React, TypeScript, and Vite.

### Core Architectural Principle
> **The frontend is a single, unified enterprise application.**  
> Backend microservices do NOT require one frontend project per microservice.  
> Frontend boundaries follow business domains and user workflows, not backend deployment topologies.

The architecture is structured across four primary layers:
1. **`app/` — Application Orchestration:** Top-level bootstrap, application config, routes, layout assembly, guards, and error boundaries.
2. **`core/` — Technical Infrastructure:** Shared cross-cutting technical concerns (Auth session, Tenant context, Permissions RBAC, API client contracts, Storage, Telemetry). Pure technical infrastructure — never contains business domain logic.
3. **`features/` — Business Domains:** 19 isolated business domain folders (HRMS, CRM, Finance, Platform Admin, etc.). Each domain contains its own UI components, hooks, services, types, and unit tests.
4. **`shared/` — Reusable Domain-Agnostic Assets:** Design system primitives (Button, Card, PageHeader, Badge), formatting helpers, generic hooks, and utility types. Completely agnostic of any business domain.

Additional cross-cutting layers:
- **`styles/`:** Global CSS variables, design tokens, and typography resets.
- **`assets/`:** Static brand logos, SVG symbols, and media.
- **`tests/`:** System-level E2E tests, integration suites, and test fixtures.

---

## 3. Folder Structure

```
src/
├── app/
│   ├── bootstrap/
│   │   └── index.tsx          # Application root mount
│   ├── config/
│   │   ├── environment/       # Env variables and runtime config
│   │   ├── feature-flags/     # Domain feature flags
│   │   └── application/       # Metadata and application invariants
│   ├── auth-pages/            # SSO Login and MFA screens
│   ├── error-pages/           # 404 Not Found, 403 Forbidden views
│   ├── layouts/               # Header, Sidebar, AppLayout shell
│   ├── providers/             # React providers composition
│   ├── router/                # App routing table (routes.tsx)
│   └── guards/                # Route authorization guards
│
├── core/
│   ├── api/
│   │   ├── client/            # HTTP transport client configuration
│   │   ├── interceptors/      # Request/response interceptor pipeline
│   │   ├── query/             # Server-state caching configuration
│   │   └── types/             # API envelopes and pagination contracts
│   ├── auth/                  # User identity session and tokens
│   ├── errors/                # Normalized error classes
│   ├── permissions/           # RBAC & PBAC evaluation
│   ├── tenant/                # Multi-tenant context and partitioning
│   ├── storage/               # Namespaced storage wrappers
│   ├── telemetry/             # Tracing and event dispatcher
│   └── security/              # Input sanitization and CSP compliance
│
├── features/                  # 19 Autonomous Business Domains
│   ├── platform-admin/        # Team A
│   ├── subscription/          # Team A
│   ├── revenue/               # Team A
│   ├── reporting/             # Team A
│   ├── hrms/                  # Team B
│   ├── crm/                   # Team B
│   ├── workflow/              # Team B
│   ├── notifications/         # Team B
│   ├── calendar/              # Team B
│   ├── erp/                   # Team C
│   ├── finance/               # Team C
│   ├── dms/                   # Team C
│   ├── integrations/          # Team C
│   ├── search/                # Team C
│   ├── monitoring/            # Team C
│   ├── security/              # Team C
│   ├── developer/             # Team C
│   ├── portals/               # Team C
│   └── ai/                    # Team C
│
├── shared/
│   ├── components/            # Button, Card, PageHeader, Badge
│   ├── hooks/                 # useDebounce, etc.
│   ├── utils/                 # formatCurrency, formatDate, etc.
│   ├── types/                 # EntityId, Nullable, SelectOption
│   └── constants/             # App constants
│
├── styles/
│   ├── theme/                 # CSS variables, tokens, colors
│   └── globals.css            # Base stylesheet
│
├── assets/                    # Static images, SVGs
│
└── tests/
    ├── e2e/                   # End-to-end test specs
    ├── integration/           # Cross-boundary integration tests
    └── fixtures/              # Mock datasets
```

---

## 4. Three-Team Model

To support concurrent velocity without friction, development ownership across the 19 business domains is distributed among three generic frontend teams:

- **Team A (Platform & Revenue):**  
  `platform-admin`, `subscription`, `revenue`, `reporting`
- **Team B (Workforce & Collaboration):**  
  `hrms`, `crm`, `workflow`, `notifications`, `calendar`
- **Team C (Operations & Systems):**  
  `erp`, `finance`, `dms`, `integrations`, `search`, `monitoring`, `security`, `developer`, `portals`, `ai`

> **Demonstration Ownership Notice:**  
> These team assignments are demonstration models and can be rebalanced by the Project Lead as priorities shift. The architectural domain boundaries of each folder remain permanent.

---

## 5. Git Workflow

```
main (Production / Stable Branch)
  ▲
  │ [Pull Request: Release Cut & Integration Verification]
dev (Development Baseline / Integration Branch)
  ▲
  ├── [Pull Request] ── feature/team-a-platform-dashboard
  ├── [Pull Request] ── feature/team-b-hrms-users
  ├── [Pull Request] ── feature/team-c-finance-reports
  ├── [Pull Request] ── bugfix/team-b-leave-calculation
  └── [Pull Request] ── hotfix/production-auth-interceptor (into main & backported to dev)
```

### Branch Roles:
- **`main`**: Production-ready code. Always stable, fully tested, and deployable.
- **`dev`**: Integration branch. All features merge into `dev` via Pull Request.
- **`feature/*`**: Scoped branch for an individual task.
- **`bugfix/*`**: Defect correction targeting `dev`.
- **`hotfix/*`**: Urgent production patch branched directly from `main`.

### Mandatory Git Safety Rules:
- **NO Direct Push to `main`**
- **NO Direct Push to `dev`**
- **NO Force Push (`--force`) on shared branches**
- **NO Destructive Resets on shared branches**
- **NO Personal Named Branches (e.g. `john-dev`)**
- **Every task branches off the latest `dev`**

---

## 6. Branch Naming Strategy

Branches represent **work, tasks, and domain boundaries** — NOT individual developers.

Format:
`<type>/<team-or-domain>-<short-description>`

Examples:
- `feature/team-a-platform-dashboard`
- `feature/team-b-hrms-users`
- `feature/team-c-finance-reports`
- `bugfix/team-a-subscription-counter`
- `hotfix/auth-header-case-sensitivity`

---

## 7. Commit Conventions

Follow Conventional Commits:

| Prefix | Usage | Example |
|---|---|---|
| `feat:` | New domain functionality | `feat: add team A platform module shell` |
| `fix:` | Defect correction | `fix: correct router configuration` |
| `refactor:` | Code adjustment without behavior change | `refactor: optimize permission check cache` |
| `docs:` | Documentation updates | `docs: update team workflow guidelines` |
| `test:` | Adding or fixing test suites | `test: add unit tests for date formatters` |
| `chore:` | Build or tool configuration | `chore: upgrade vite build config` |

---

## 8. Pull Request Workflow

1. **Feature PRs:** Authored inside `src/features/<domain>/`. Reviewed and approved by peers within the assigned team.
2. **Shared PRs (`src/shared/`):** Requires multi-team review to ensure domain-agnostic reusability.
3. **Core / Architecture PRs (`src/core/`, `src/app/`):** Requires explicit approval from the Lead Frontend Architect.
4. **CI Checks:** Automated `npm run typecheck` and `npm run build` must pass with 0 errors before merge.

---

## 9. Team Ownership Matrix

Each team owns its assigned domain folders:

**Teams MAY:**
- Create domain-specific components, hooks, services, types, and unit tests inside their domain folder.
- Consume approved core APIs and context from `@core`.
- Consume shared design system primitives from `@shared`.

**Teams SHOULD NOT:**
- Modify another team's domain folder without prior cross-team coordination.
- Place business-specific logic in `shared/` or `core/`.
- Duplicate shared components instead of proposing improvements to `shared/`.
- Bypass core API transport or make direct database calls.
- Deeply import internal files from sibling features.

---

## 10. Architectural Dependency Rules

```
Allowed:
  app      ──> core
  app      ──> shared
  app      ──> features
  features ──> core
  features ──> shared
  core     ──> infrastructure only
  shared   ──> domain-agnostic primitives only

Prohibited:
  core     ──✕──> features
  shared   ──✕──> features
  features ──✕──> app
  featureA ──✕──> featureB (deep internal imports)
  business logic in shared or core
```

---

## 11. How to Run Locally

```bash
# 1. Navigate to the project directory
cd D:\one-enterprise-cloud-team-demo

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev
# Server starts at http://localhost:3000

# 4. Run TypeScript typecheck
npm run typecheck

# 5. Run production build bundle
npm run build
```

---

## 12. What This Demo Intentionally Does NOT Contain

To ensure this project serves strictly as an architectural benchmark and collaboration model:
1. **NO Real Backend APIs:** No live API URLs, no Axios/Fetch clients making actual network calls.
2. **NO Fake API Servers:** No mock servers (MSW, Mirage) simulating endpoints.
3. **NO Database Schemas:** No database connections, ORM models, or direct DB queries.
4. **NO Copied Legacy Code:** Zero migrated screens or legacy business implementations.
5. **NO Personal Git Branches:** Branches represent tasks, not people.
6. **NO External Micro-Frontend Complexity:** Built as a clean, cohesive, scalable monorepo.
