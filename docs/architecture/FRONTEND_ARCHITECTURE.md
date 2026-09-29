# One Enterprise Cloud — Official Frontend Architecture

## 1. Executive Architecture Summary

The **One Enterprise Cloud** frontend is engineered as a unified, domain-driven enterprise web application built on **React, TypeScript, and Vite**.

A foundational architectural principle of this system is:
> **The frontend is a single, unified enterprise application.**  
> Backend microservices do NOT require one frontend project per microservice.  
> Frontend boundaries must follow business domains and user workflows, not backend deployment topologies.

This architecture enables four parallel engineering teams (Team 1 — ERP, Team 2 — CRM, Team 3 — HRMS, Team 4 — Finance; 24 developers total) to develop in parallel with zero merge collisions, crystal-clear code ownership, and strict dependency boundaries.

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
│   ├── erp/              # Supply chain, procurement, inventory (Team 1 — ERP, 7 Devs)
│   ├── crm/              # Sales pipeline, accounts, opportunities (Team 2 — CRM, 7 Devs)
│   ├── hrms/             # Workforce, attendance, payroll, leave (Team 3 — HRMS, 7 Devs)
│   ├── finance/          # General ledger, AP/AR, banking, tax (Team 4 — Finance, 3 Devs)
│   ├── platform-admin/   # Central tenant admin & license management (Future / Platform)
│   ├── subscription/     # Tiering, quotas, and subscriptions (Future Commercial)
│   ├── revenue/          # Billing, invoice pipelines, and recognition (Future Commercial)
│   ├── reporting/        # BI dashboards and executive analytics (Future Intelligence)
│   ├── workflow/         # Business process approval matrices (Future Automation)
│   ├── notifications/    # In-app alerts and notifications tray (Future Communications)
│   ├── calendar/         # Corporate scheduling and shared calendars (Future Scheduling)
│   ├── dms/              # Document vault, metadata indexing (Future Document Vault)
│   ├── integrations/     # Webhooks, partner relays, API gateway (Future Ecosystem)
│   ├── search/           # Federated enterprise search index (Future Discovery)
│   ├── monitoring/       # System health and audit logging (Future Reliability)
│   ├── security/         # Enterprise compliance, SSO, policies (Future Compliance)
│   ├── developer/        # API keys, developer portal, test sandbox (Future Platform SDK)
│   ├── portals/          # External stakeholder portals (Future Stakeholder)
│   └── ai/               # AI co-pilot, document intelligence (Future Cognitive)
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
