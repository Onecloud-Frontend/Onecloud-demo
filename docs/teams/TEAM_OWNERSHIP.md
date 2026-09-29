# Team Ownership Matrix

> **PRIMARY DEMONSTRATION OWNERSHIP MODEL:**  
> The three frontend engineering teams are assigned to the three primary enterprise business domains:  
> - **Team A → ERP** (`src/features/erp/`)  
> - **Team B → CRM** (`src/features/crm/`)  
> - **Team C → HRMS** (`src/features/hrms/`)  
>  
> Each team owns its feature directory exclusively. All teams work in parallel within the same unified frontend application without separate repositories or micro-frontends.

---

## 1. Primary Team Domain Allocation

| Assigned Team | Domain | Feature Directory | Scope & Responsibilities | Demonstration Branch |
|---|---|---|---|---|
| **Team A** | **ERP** (Enterprise Resource Planning) | `src/features/erp/` | Supply chain, procurement orders, inventory counts, enterprise resource planning. | `feature/team-a-erp-demo` |
| **Team B** | **CRM** (Customer Relationship Management) | `src/features/crm/` | Opportunity pipelines, customer accounts, leads, deal stages, client interactions. | `feature/team-b-crm-demo` |
| **Team C** | **HRMS** (Human Resource Management) | `src/features/hrms/` | Employee directory, attendance, leaves, organization chart, human resource management. | `feature/team-c-hrms-demo` |

---

## 2. Team Ownership Boundaries

Each team must work primarily inside its own feature directory:
- **ERP Team (Team A):** Works inside `src/features/erp/`. Must NOT import internals from `src/features/crm/` or `src/features/hrms/`.
- **CRM Team (Team B):** Works inside `src/features/crm/`. Must NOT import internals from `src/features/erp/` or `src/features/hrms/`.
- **HRMS Team (Team C):** Works inside `src/features/hrms/`. Must NOT import internals from `src/features/erp/` or `src/features/crm/`.

### Permitted Across All Teams:
- `features → core` (consuming auth, tenant, permissions, API transport abstractions)
- `features → shared` (consuming reusable UI primitives like Button, Card, PageHeader, Badge, Input, and formatters)

### Strictly Prohibited Across All Teams:
- Cross-feature deep imports (`features/a → features/b`)
- Features importing application orchestration (`features → app`)
- Placing business-domain logic in `shared/` or `core/`
- Creating duplicate UI components when a reusable design primitive exists in `shared/`

---

## 3. Full Domain Allocation

| Domain Folder | Domain Name | Cluster | Primary Team | Primary Boundary Responsibility |
|---|---|---|---|---|
| `src/features/erp` | **ERP** | Operations & Logistics | **Team A (Primary)** | Supply chain, procurement orders, inventory counts, ERP base. |
| `src/features/crm` | **CRM** | Customer Operations | **Team B (Primary)** | Opportunity pipelines, accounts, leads, deal stages, CRM base. |
| `src/features/hrms` | **HRMS** | Workforce Management | **Team C (Primary)** | Employee directory, attendance, leaves, organization chart, HRMS base. |
| `src/features/platform-admin` | Platform Admin | Platform & Governance | Team A | Global enterprise settings, tenant provisioning, license management. |
| `src/features/subscription` | Subscription | Commercial | Team A | Tier upgrades, plan quotas, seat allocation. |
| `src/features/revenue` | Revenue | Commercial | Team A | Automated billing cycles, invoice pipelines, usage metrics. |
| `src/features/reporting` | Reporting | Intelligence | Team A | Executive KPI dashboards, report exports, analytics. |
| `src/features/workflow` | Workflow | Automation | Team B | Multi-level approval matrices, process automation. |
| `src/features/notifications`| Notifications | Communications | Team B | Notification tray, channel preferences, dispatch broadcasts. |
| `src/features/calendar` | Calendar | Workforce Scheduling | Team B | Room bookings, company events, availability scheduling. |
| `src/features/finance` | Finance | Financial Systems | Team C | General ledger, AP/AR, multi-currency valuation, tax. |
| `src/features/dms` | DMS | Document Vault | Team C | Document storage, metadata tagging, version audit. |
| `src/features/integrations` | Integrations | Ecosystem | Team C | Webhook listener relays, ERP connectors, partner APIs. |
| `src/features/search` | Search | Discovery | Team C | Federated enterprise search index, autocomplete. |
| `src/features/monitoring` | Monitoring | Reliability | Team C | Health metrics, API latency dashboards, session logs. |
| `src/features/security` | Security | Compliance | Team C | SSO/SAML configuration, MFA enforcement, audit trails. |
| `src/features/developer` | Developer | Platform SDK | Team C | API key generation, developer sandbox, SDK docs. |
| `src/features/portals` | Portals | Stakeholders | Team C | Vendor portal, customer self-service portal. |
| `src/features/ai` | AI | Cognitive | Team C | AI co-pilot, document OCR parsing, query assistance. |
