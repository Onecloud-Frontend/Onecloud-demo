# One Enterprise Cloud — Team Ownership Matrix

> **ENTERPRISE OWNERSHIP MODEL (4 TEAMS — 24 DEVELOPERS):**
> The frontend engineering organization is structured into four primary business domain teams:
> - **Team 1 → ERP** (`src/features/erp/` — 7 Developers)
> - **Team 2 → CRM** (`src/features/crm/` — 7 Developers)
> - **Team 3 → HRMS** (`src/features/hrms/` — 7 Developers)
> - **Team 4 → Finance** (`src/features/finance/` — 3 Developers)
>
> Each team owns its feature directory exclusively. All teams work in parallel within the same unified frontend application without separate repositories or micro-frontends.

---

## 1. Primary Team Domain Allocation

| Assigned Team | Domain | Feature Directory | Active Developers | Scope & Responsibilities | Working Branch Convention |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Team 1** | **ERP** (Enterprise Resource Planning) | `src/features/erp/` | **7** (`ERP-DEV-01` to `ERP-DEV-07`) | Sourcing materials, purchase orders, vendor relations, warehouse topology, inventory stock, order fulfillment, shipments & returns. | `feature/erp-<module>` |
| **Team 2** | **CRM** (Customer Relationship Management) | `src/features/crm/` | **7** (`CRM-DEV-01` to `CRM-DEV-07`) | Lead capture and qualification, sales opportunity pipeline, customer 360 directory, sales quotations, support ticket portal. | `feature/crm-<module>` |
| **Team 3** | **HRMS** (Human Resource Management) | `src/features/hrms/` | **7** (`HRMS-DEV-01` to `HRMS-DEV-07`) | Employee master records, shift attendance logs, annual leave quotas, monthly payroll calculations, candidate hiring, appraisals, employee assets. | `feature/hrms-<module>` |
| **Team 4** | **Finance** (Financial Management & Compliance) | `src/features/finance/` | **3** (`FIN-DEV-01` to `FIN-DEV-03`) | General ledger, chart of accounts, balanced journal vouchers, accounts receivable invoices with GST, accounts payable bills, banking, budgets. | `feature/finance-<module>` |

---

## 2. Team Ownership Boundaries

Each team works strictly inside its assigned feature directory:
- **Team 1 (ERP):** Works inside `src/features/erp/`. Must NOT modify files in `crm/`, `hrms/`, or `finance/`.
- **Team 2 (CRM):** Works inside `src/features/crm/`. Must NOT modify files in `erp/`, `hrms/`, or `finance/`.
- **Team 3 (HRMS):** Works inside `src/features/hrms/`. Must NOT modify files in `erp/`, `crm/`, or `finance/`.
- **Team 4 (Finance):** Works inside `src/features/finance/`. Must NOT modify files in `erp/`, `crm/`, or `hrms/`.

### Permitted Across All Teams:
- Consuming `@core/*` abstractions (authentication session, tenant scope, API client).
- Consuming `@shared/*` design system primitives (`Button`, `Card`, `Badge`, `Input`, `PageHeader`, `LoadingState`, formatters).
- Consuming `@shared/types` value objects (`Address`, `CurrencyCode`, `Money`, `DocumentReference`).
- Consuming public domain exports (`@features/<domain>/types`).

### Strictly Prohibited Across All Teams:
- Cross-feature deep internal imports (e.g. `features/erp/components/...` into `crm`).
- Features importing application shell layout or router orchestration (`features → app`).
- Placing domain business logic in `shared/` or `core/`.
- Recreating duplicate types or business models.

---

## 3. Full Domain Allocation & Future Capabilities

| Domain Folder | Domain Name | Cluster | Assigned Team | Status | Primary Responsibility |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `src/features/erp` | **ERP** | Operations & Logistics | **Team 1 (ERP)** | Active Development | Supply chain, procurement, inventory, warehouse, fulfillment. |
| `src/features/crm` | **CRM** | Customer Operations | **Team 2 (CRM)** | Active Development | Leads, customer directory, deal pipeline, quotes, support. |
| `src/features/hrms` | **HRMS** | Workforce Management | **Team 3 (HRMS)** | Active Development | Employee master, attendance, leave, payroll, recruiting, assets. |
| `src/features/finance` | **Finance** | Financial Management | **Team 4 (Finance)** | Active Development | General ledger, AP/AR, banking, budgets, Indian GST tax. |
| `src/features/platform-admin` | Platform Admin | Platform Governance | Unassigned | Future / Platform | Global settings, tenant provisioning, license management. |
| `src/features/subscription` | Subscription | Commercial | Unassigned | Future Capability | Plan tiers, seat quotas, customer subscriptions. |
| `src/features/revenue` | Revenue | Commercial | Unassigned | Future Capability | Automated billing schedules, revenue recognition. |
| `src/features/reporting` | Reporting | Business Intelligence | Unassigned | Future Capability | Cross-domain analytics, custom BI report builder. |
| `src/features/workflow` | Workflow | Process Automation | Unassigned | Future Capability | Visual multi-level business approval flow designer. |
| `src/features/notifications` | Notifications | Communications | Unassigned | Future Capability | In-app notification center, user channel preferences. |
| `src/features/calendar` | Calendar | Operations Scheduling | Unassigned | Future Capability | Corporate event calendar, resource and room booking. |
| `src/features/dms` | DMS | Document Vault | Unassigned | Future Capability | Centralized document storage, OCR tagging, versioning. |
| `src/features/integrations` | Integrations | Ecosystem | Unassigned | Future Capability | Third-party webhooks, REST API connectors. |
| `src/features/search` | Search | Discovery | Unassigned | Future Capability | Global federated search across all enterprise entities. |
| `src/features/monitoring` | Monitoring | Observability | Unassigned | Future Capability | Application performance, telemetry metrics, audit logs. |
| `src/features/security` | Security | Enterprise Security | Unassigned | Future Capability | Enterprise SSO/SAML, session audit, access policies. |
| `src/features/developer` | Developer | Developer Platform | Unassigned | Future Capability | API key generation, developer portal, API sandbox. |
| `src/features/portals` | Portals | External Portals | Unassigned | Future Capability | External vendor self-service and customer portals. |
| `src/features/ai` | AI | Cognitive Intelligence | Unassigned | Future Capability | AI co-pilot, automated invoice data extraction, assistant. |