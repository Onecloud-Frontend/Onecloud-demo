# One Enterprise Cloud — Official Frontend Architecture

## 1. Executive Architecture Summary

The **One Enterprise Cloud** frontend is engineered as a unified, domain-driven enterprise web application built on **React, TypeScript, and Vite**.

A foundational architectural principle of this system is:
> **The frontend is a single, unified enterprise application.**  
> Backend microservices do NOT require one frontend project per microservice.  
> Frontend boundaries must follow business domains and user workflows, not backend deployment topologies.

This architecture enables multiple frontend teams (Team A, Team B, Team C) to develop in parallel with zero merge collisions, crystal-clear code ownership, and strict dependency boundaries.

---

## 2. Source-of-Truth Directory Structure

```
src/
├── app/                  # Application orchestration & composition
│   ├── bootstrap/        # Application entry mount (index.tsx)
│   ├── config/           # App, environment, & feature flag settings
│   │   ├── environment/  # Environment variable parsing & runtime config
│   │   ├── feature-flags/# Domain feature flags
│   │   └── application/  # Brand metadata & application invariants
│   ├── auth-pages/       # SSO login, callback, MFA shell views
│   ├── error-pages/      # 404, 403, and global error boundary views
│   ├── layouts/          # Header, Sidebar, and AppLayout shell
│   ├── providers/        # Top-level context providers composition
│   ├── router/           # Application routing table (routes.tsx)
│   └── guards/           # Route authorization & tenant guards
│
├── core/                 # Technical infrastructure shared across domains
│   ├── api/              # Standardized API transport infrastructure
│   │   ├── client/       # HTTP client abstraction & base config
│   │   ├── interceptors/ # Auth token, tenant ID, and trace interceptors
│   │   ├── query/        # Global server-state caching policies
│   │   └── types/        # Generic API envelopes and pagination models
│   ├── auth/             # Identity session state and token management
│   ├── errors/           # Normalized error classes and telemetry dispatch
│   ├── permissions/      # RBAC & PBAC evaluation engine
│   ├── tenant/           # Multi-tenant context and partition resolution
│   ├── storage/          # Namespace-aware storage wrappers
│   ├── telemetry/        # User telemetry, tracing, and metric collection
│   └── security/         # Input sanitization and CSP compliance helpers
│
├── features/             # Autonomous business domains (19 domains)
│   ├── platform-admin/   # Central tenant admin & license management (Team A)
│   ├── subscription/     # Tiering, quotas, and subscriptions (Team A)
│   ├── revenue/          # Billing, invoice pipelines, and recognition (Team A)
│   ├── reporting/        # BI dashboards and executive analytics (Team A)
│   ├── hrms/             # Workforce, directory, and leave tracking (Team B)
│   ├── crm/              # Sales pipeline and customer accounts (Team B)
│   ├── workflow/         # Business process approval matrices (Team B)
│   ├── notifications/    # In-app alerts and notifications tray (Team B)
│   ├── calendar/         # Corporate scheduling and shared calendars (Team B)
│   ├── erp/              # Supply chain, procurement, inventory (Team C)
│   ├── finance/          # General ledger, AP/AR, multi-currency (Team C)
│   ├── dms/              # Document vault, metadata indexing (Team C)
│   ├── integrations/     # Webhooks, partner relays, API gateway (Team C)
│   ├── search/           # Federated enterprise search index (Team C)
│   ├── monitoring/       # System health and audit logging (Team C)
│   ├── security/         # Enterprise compliance, SSO, policies (Team C)
│   ├── developer/        # API keys, developer portal, test sandbox (Team C)
│   ├── portals/          # External stakeholder portals (Team C)
│   └── ai/               # AI co-pilot, document intelligence (Team C)
│
├── shared/               # Domain-agnostic reusable functionality
│   ├── components/       # Design system primitives (Button, Card, PageHeader, Badge)
│   ├── hooks/            # Generic hooks (useDebounce, useMediaQuery)
│   ├── utils/            # Pure helpers (formatters, dates, currency)
│   ├── types/            # Common TypeScript primitives (EntityId, Nullable)
│   └── constants/        # Application-wide non-sensitive constants
│
├── styles/               # Global styling & theme infrastructure
│   ├── theme/            # Design tokens, CSS variables, color palettes
│   └── globals.css       # Base CSS reset, typography, utilities
│
├── assets/               # Static icons, brand SVGs, media
│
└── tests/                # Cross-cutting test suites
    ├── e2e/              # Playwright / Cypress end-to-end specs
    ├── integration/      # Cross-layer integration tests
    └── fixtures/         # Deterministic mock datasets and envelopes
```

---

## 3. Layer Responsibilities

| Layer | Responsibility | Allowed to Import | Must NOT Import |
|---|---|---|---|
| **`app/`** | Application orchestration, routing, layout assembly, top-level providers, error handling | `core`, `shared`, `features` | *None (root layer)* |
| **`core/`** | Cross-cutting technical infrastructure (Auth, API client, Tenant, Permissions, Storage) | Infrastructure only | `features`, `app` |
| **`features/`**| Business domain implementation (UI, hooks, domain services, domain types, domain tests)| `core`, `shared` | `app`, sibling `features/*` |
| **`shared/`** | Domain-agnostic UI components, utilities, generic hooks, common types | Self / external design primitives | `features`, `app` |
| **`styles/`** | Tokens, color palettes, and global resets | CSS standards | Domain logic |
| **`tests/`**  | E2E tests, cross-domain test fixtures | System-wide | Business dependencies |

---

## 4. Why Unified Monorepo Over Micro-Frontends?

1. **Consistent User Experience:** Single design token system, shared navigation shell, zero iframe jarring.
2. **Simplified Dependency Management:** Unified React, TypeScript, and Vite dependencies without version fragmentation.
3. **No Network Latency Overhead:** Single bundle with smart code splitting rather than dynamic remote module loading overhead.
4. **Strong Typing Across Boundaries:** Shared types and core contexts provide compile-time safety across all 19 domains.
