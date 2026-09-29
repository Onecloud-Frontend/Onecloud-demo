# One Enterprise Cloud — Frontend Architecture & 3-Team Base Setup

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Architecture](https://img.shields.io/badge/Architecture-Official%20OEC-success.svg)](#2-architecture)

This repository is the official demonstration of the **One Enterprise Cloud Frontend Architecture** and our **3-Team Git Collaboration Workflow**.

The base application setup provides the common application shell and clean feature foundations for three teams:
- **Team A → ERP** (`src/features/erp/`)
- **Team B → CRM** (`src/features/crm/`)
- **Team C → HRMS** (`src/features/hrms/`)

---

## Table of Contents
1. [Project Purpose](#1-project-purpose)
2. [Architecture](#2-architecture)
3. [Folder Structure](#3-folder-structure)
4. [Three-Team Model](#4-three-team-model)
5. [Common Application Shell & Login](#5-common-application-shell--login)
6. [Git Workflow & Branching](#6-git-workflow--branching)
7. [Team Ownership Matrix](#7-team-ownership-matrix)
8. [Architectural Dependency Rules](#8-architectural-dependency-rules)
9. [How to Run Locally](#9-how-to-run-locally)
10. [What This Demo Intentionally Does NOT Contain](#10-what-this-demo-intentionally-does-not-contain)

---

## 1. Project Purpose

The purpose of this base setup is to establish the common application shell and clean feature foundations before domain business functionality is developed.

Key demonstration aspects:
- **Official frontend architecture** and directory boundaries.
- **Domain-based feature separation** across ERP, CRM, HRMS, and supporting domains.
- **3-team parallel development** without merge conflicts or ownership confusion.
- **Git feature-branch workflow** and pull request review gates.
- **dev/main branch integration strategy**.
- **Strict architectural dependency rules** (allowed vs prohibited imports).
- **Clear team ownership boundaries**.

---

## 2. Architecture

The frontend is a **single, unified enterprise web application** built with React, TypeScript, and Vite.
Backend microservices do NOT require separate repositories or micro-frontends.

The architecture is structured across four primary layers:
1. **`app/` — Application Orchestration:** Top-level bootstrap, application config, routes, layout assembly (Header, Sidebar, Footer), guards, and error boundaries.
2. **`core/` — Technical Infrastructure:** Shared cross-cutting technical concerns (Auth session, Tenant context, Permissions RBAC, API client contracts, Storage, Telemetry). Pure technical infrastructure — never contains business domain logic.
3. **`features/` — Business Domains:** 19 isolated business domain folders:
   - **Team A:** `erp` (primary), `subscription`, `revenue`, `reporting`, `platform-admin`
   - **Team B:** `crm` (primary), `workflow`, `notifications`, `calendar`
   - **Team C:** `hrms` (primary), `finance`, `dms`, `integrations`, `search`, `monitoring`, `security`, `developer`, `portals`, `ai`
4. **`shared/` — Reusable Domain-Agnostic Assets:** Design system primitives (Button, Card, PageHeader, Badge, Input), formatting helpers, generic hooks, and utility types. Completely agnostic of any business domain.

---

## 3. Folder Structure

```
src/
├── app/
│   ├── bootstrap/
│   │   └── index.tsx          # Application root mount
│   ├── config/                # Environment, feature flags, application metadata
│   ├── auth-pages/            # Clean enterprise LoginPage.tsx
│   ├── error-pages/           # 404 Not Found, 403 Forbidden views
│   ├── layouts/               # Header, Sidebar, Footer, AppLayout shell
│   ├── pages/                 # OverviewPage, TeamOwnershipPage, GitWorkflowPage, etc.
│   ├── providers/             # React providers composition (Router + AuthProvider)
│   ├── router/                # App routing table (routes.tsx)
│   └── guards/                # Route authorization guards (AuthGuard.tsx)
│
├── core/
│   ├── api/                   # HTTP transport client contracts & interceptors
│   ├── auth/                  # User identity session, useAuth hook, local demo flow
│   ├── errors/                # Normalized error classes
│   ├── permissions/           # RBAC & PBAC evaluation
│   ├── tenant/                # Multi-tenant context and partitioning
│   ├── storage/               # Namespaced storage wrappers
│   ├── telemetry/             # Tracing and event dispatcher
│   └── security/              # Input sanitization and CSP compliance
│
├── features/                  # Business Domains
│   ├── erp/                   # Team A Workspace (pages, components, hooks, services, types, routes)
│   ├── crm/                   # Team B Workspace (pages, components, hooks, services, types, routes)
│   ├── hrms/                  # Team C Workspace (pages, components, hooks, services, types, routes)
│   └── supporting-domains...
│
├── shared/
│   ├── components/            # Button, Card, PageHeader, Badge, Input
│   ├── hooks/                 # useDebounce, etc.
│   ├── utils/                 # formatCurrency, formatDate, etc.
│   ├── types/                 # EntityId, Nullable, SelectOption
│   └── constants/             # App constants
│
├── styles/                    # tokens.css, colors.ts, globals.css
├── assets/                    # Static images, SVGs
└── tests/                     # e2e, integration, fixtures
```

---

## 4. Three-Team Model

Development ownership across the three primary business domains:
- **Team A → ERP** (`src/features/erp/`)  
  Branch: `feature/team-a-erp-demo`
- **Team B → CRM** (`src/features/crm/`)  
  Branch: `feature/team-b-crm-demo`
- **Team C → HRMS** (`src/features/hrms/`)  
  Branch: `feature/team-c-hrms-demo`

---

## 5. Common Application Shell & Login

- **Login Page (`src/app/auth-pages/LoginPage.tsx`):**  
  Enterprise login with email/password fields, show/hide password toggle, remember me, validation, loading state, error banner, and clear demo auth notification.
- **Header (`src/app/layouts/Header.tsx`):**  
  Top enterprise bar with brand logo, dynamic domain indicator ("ERP Team Workspace", "CRM Team Workspace", "HRMS Team Workspace"), universal search, notifications placeholder, active tenant badge, and user profile menu with sign-out.
- **Sidebar (`src/app/layouts/Sidebar.tsx`):**  
  Collapsible navigation displaying Dashboard, the 3 Primary Business Modules (ERP, CRM, HRMS with team badges), and Architecture Standards links.
- **Footer (`src/app/layouts/Footer.tsx`):**  
  Application copyright, version, demo environment indicator, and support links.

---

## 6. Git Workflow & Branching

```
main (Production / Stable Branch)
  ▲
  │ [Pull Request: Release Cut & Integration Verification]
dev (Development Baseline / Integration Branch)
  ▲
  ├── [Pull Request] ── feature/team-a-erp-demo (Team A)
  ├── [Pull Request] ── feature/team-b-crm-demo (Team B)
  └── [Pull Request] ── feature/team-c-hrms-demo (Team C)
```

### Branch Naming Convention:
- Team A: `feature/team-a-erp-<task>` (e.g. `feature/team-a-erp-dashboard`)
- Team B: `feature/team-b-crm-<task>` (e.g. `feature/team-b-crm-customers`)
- Team C: `feature/team-c-hrms-<task>` (e.g. `feature/team-c-hrms-employees`)

---

## 7. Team Ownership Matrix

Each team owns its assigned domain folder:
- **ERP Team:** Works inside `src/features/erp/`.
- **CRM Team:** Works inside `src/features/crm/`.
- **HRMS Team:** Works inside `src/features/hrms/`.

---

## 8. Architectural Dependency Rules

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
  erp      ──✕──> crm / hrms (no cross-feature imports between teams)
  business logic in shared or core
```

---

## 9. How to Run Locally

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

## 10. What This Demo Intentionally Does NOT Contain

1. **NO Premature Business Modules:** No fake accounting, leads, or payroll modules.
2. **NO Real Backend APIs:** No live API URLs, no Axios/Fetch clients making actual network calls.
3. **NO Fake API Servers:** No mock servers (MSW, Mirage) simulating endpoints.
4. **NO Database Schemas:** No database connections, ORM models, or direct DB queries.
5. **NO Personal Git Branches:** Branches represent tasks, not people.
6. **NO Micro-Frontend Fragmentation:** Built as a clean, cohesive, scalable monorepo.
