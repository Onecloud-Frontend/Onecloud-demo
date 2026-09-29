# One Enterprise Cloud — Frontend

[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Architecture](https://img.shields.io/badge/Architecture-Unified%20Enterprise%20SPA-success.svg)](#architecture)

Official frontend application for **One Enterprise Cloud**, uniting four enterprise business domains into a single, cohesive, modern Single Page Application (SPA).

---

## Technology Stack

- **Framework:** React 19 (Hooks, Concurrent Mode)
- **Language:** TypeScript 5.8 (Strict Mode, 205 Canonical Business Types)
- **Bundler & Dev Server:** Vite 6.2 (Lightning-fast HMR and optimized production bundling)
- **Styling:** Vanilla CSS with Design System Tokens (no heavy CSS runtime overhead)
- **Architecture:** Layered, modular, domain-driven enterprise architecture

---

## Engineering Teams & Developer Allocation

The repository is developed concurrently by **24 frontend developers** across **4 business operations teams**:

| Team | Domain | Active Developers | Feature Directory | Primary Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| **Team 1** | **ERP** | **7** (`ERP-DEV-01` to `ERP-DEV-07`) | `src/features/erp/` | Procurement, Vendor Relations, Inventory, Warehouse, Sales Fulfillment & Returns |
| **Team 2** | **CRM** | **7** (`CRM-DEV-01` to `CRM-DEV-07`) | `src/features/crm/` | Leads, Opportunities & Forecasting, Customer 360, Quotations, Support Portal |
| **Team 3** | **HRMS** | **7** (`HRMS-DEV-01` to `HRMS-DEV-07`) | `src/features/hrms/` | Employee Master, Attendance & Shifts, Leave, Payroll, Recruitment, Assets |
| **Team 4** | **Finance** | **3** (`FIN-DEV-01` to `FIN-DEV-03`) | `src/features/finance/` | General Ledger & Chart of Accounts, Invoices & AP/AR, Banking, Expenses, Tax |
| **TOTAL** | **Enterprise** | **24 Developers** | — | **Single Unified Enterprise Application** |

---

## High-Level Architecture

The frontend codebase enforces clean separation of concerns across four primary architectural layers:

```
src/
├── app/        # Global layout shell (Header, Sidebar), routing table (routes.tsx), global providers
├── core/       # Technical infrastructure: API client, authentication, RBAC, tenant context
├── features/   # Business capability domains (ERP, CRM, HRMS, Finance)
└── shared/     # Domain-agnostic design system components, hooks, formatters, and shared types
```

### Core Architectural Principles

1. **Unified Single Page Application:** The frontend is **one application**, not fragmented micro-frontends or separate repositories. All domains share navigation, authentication, and design language.
2. **Strict Feature Boundaries:** Business domains live inside isolated folders under `src/features/<domain>/`. Developers work within their assigned feature folder without editing other domains.
3. **Centralized Canonical Type System:** A frozen set of **205 canonical TypeScript business types** governs all enterprise data contracts. Developers must import and reuse these canonical types rather than defining ad-hoc interfaces.
4. **In-Memory Mock Layer:** During early development, an in-memory mock adapter (`src/mock/`) simulates realistic latency and data responses, allowing UI development to proceed independently without waiting for backend deployment.
5. **Seamless Backend Integration:** Real backend microservices can be connected later via the centralized `apiClient` without restructuring feature components or routes.

---

## Developer Documentation System

Review these authoritative guides before starting implementation:

- **[Developer Quickstart (Start Here)](./docs/development/DEVELOPER_START_HERE.md)** — 5-minute onboarding guide.
- **[Common Developer Guide](./docs/development/DEVELOPER_GUIDE.md)** — Architectural standards, forms, tables, code quality, and PR checklists.
- **[Master Developer Assignments Matrix](./docs/development/DEVELOPER_ASSIGNMENTS.md)** — Authoritative 24-developer assignment table.
- **[Canonical Type Contract Catalog](./docs/development/TYPE_CONTRACT_CATALOG.md)** — Complete catalog of all 205 canonical business types.

### Team-Specific Guides
- **[Team 1 — ERP Team Guide](./docs/development/teams/ERP_TEAM_GUIDE.md)**
- **[Team 2 — CRM Team Guide](./docs/development/teams/CRM_TEAM_GUIDE.md)**
- **[Team 3 — HRMS Team Guide](./docs/development/teams/HRMS_TEAM_GUIDE.md)**
- **[Team 4 — Finance Team Guide](./docs/development/teams/FINANCE_TEAM_GUIDE.md)**

### Technical & Governance Documentation
- **[Official Frontend Architecture](./docs/architecture/FRONTEND_ARCHITECTURE.md)**
- **[Architectural Dependency Rules](./docs/architecture/DEPENDENCY_RULES.md)**
- **[Git Workflow & Branching Standards](./docs/git/GIT_WORKFLOW.md)**
- **[Team Ownership Matrix](./docs/teams/TEAM_OWNERSHIP.md)**

---

## How to Run Locally

```powershell
# 1. Install dependencies (if not already installed)
npm.cmd install

# 2. Run local development server
npm.cmd run dev

# 3. Typecheck codebase
npm.cmd run typecheck

# 4. Create production build
npm.cmd run build
```

The local application server runs at `http://localhost:3000`.