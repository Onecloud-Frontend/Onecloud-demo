# One Enterprise Cloud — Frontend Development Foundation

## 1. Architectural Overview & Philosophy

The One Enterprise Cloud frontend is organized as a **single, unified enterprise web application** built with React 19, TypeScript 5.8, and Vite 6.2.

Key architectural tenets:
- **Unified Monorepo:** All four engineering teams (Team 1 — ERP, Team 2 — CRM, Team 3 — HRMS, Team 4 — Finance (24 developers)) work inside the same cohesive frontend application.
- **No Micro-Frontends / No Separate Repositories:** Simplifies shared state, authentication, design system consistency, and build validation.
- **Pre-Backend Decoupling:** Development proceeds at full velocity against typed contracts and an in-memory mock adapter before backend microservices are deployed.
- **Strict Domain Boundaries:** Each team owns its assigned domain folder in `src/features/` without cross-domain leakage.

---

## 2. The Four Architectural Pillars

```
src/
├── app/                  # Application Orchestration
│   ├── bootstrap/        # Application root mount and mock initialization
│   ├── config/           # Navigation, environment, and feature flags
│   ├── layouts/          # Header, Sidebar, Footer, AppLayout
│   ├── router/           # Application router composing domain routes
│   └── guards/           # Auth and tenant guards
│
├── core/                 # Technical Infrastructure
│   ├── api/              # Standardized API transport client and types
│   ├── auth/             # Identity session state and useAuth hook
│   ├── tenant/           # Multi-tenant context resolution
│   ├── permissions/      # RBAC / PBAC evaluation
│   └── storage/          # Namespace-aware storage wrappers
│
├── features/             # Business Domains
│   ├── erp/              # Team 1 (ERP) Workspace (pages, components, hooks, services, types, routes)
│   ├── crm/              # Team 2 (CRM) Workspace (pages, components, hooks, services, types, routes)
│   ├── hrms/             # Team 3 (HRMS) Workspace (pages, components, hooks, services, types, routes)
│   └── supporting-domains
│
└── shared/               # Domain-Agnostic Assets
    ├── components/       # Button, Card, PageHeader, Input, LoadingState, EmptyState, ErrorState
    ├── hooks/            # useDebounce, etc.
    ├── utils/            # formatCurrency, formatDate, etc.
    └── types/            # common.ts (EntityId, Nullable, SelectOption)
```

---

## 3. Types-First & Contract-First Principle

To ensure stability across concurrent team workflows:
```
Requirement
    ↓
TypeScript Type
    ↓
API Contract (Envelope & Params)
    ↓
Mock Data & Handler
    ↓
Feature Service
    ↓
UI Component
```

### Rule on Unconfirmed Requirements:
If a business module, entity field, or API endpoint is not yet provided by an approved SRS or backend contract:
> **It MUST be explicitly marked as: `TBD — Requirement/Backend Contract Required`.**  
> Never invent fields, endpoints, or business workflows using assumptions.

---

## 4. Common State Conventions

Every data-driven page must support standard state transitions using shared components from `@shared/components`:

| State | Component | Purpose |
|---|---|---|
| **Loading** | `<LoadingState message="..." />` | Accessible spinner / message while awaiting asynchronous service response |
| **Success** | Custom domain UI | Rendered when `response.success === true` with data populated |
| **Empty** | `<EmptyState title="..." />` | Rendered when data collection is empty (`items.length === 0`) |
| **Error** | `<ErrorState message="..." onRetry={...} />` | Rendered on service exception or failure, with optional retry callback |

---

## 5. Common Pagination Standards

When lists require server-side pagination, the common infrastructure in `@core/api/types` provides:

```typescript
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
```
