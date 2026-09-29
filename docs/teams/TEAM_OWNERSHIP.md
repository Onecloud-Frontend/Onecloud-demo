# Team Ownership Matrix

> **DEMONSTRATION OWNERSHIP NOTICE:**  
> The team assignments below represent a demonstration model for 3-team parallel development.  
> These assignments can be adapted or rebalanced by the Project Lead as project phases progress.  
> The architectural domain boundary of each folder remains permanent.

---

## 1. Master Domain Allocation

| Domain Folder | Domain Name | Cluster | Assigned Team | Primary Boundary Responsibility |
|---|---|---|---|---|
| `src/features/platform-admin` | Platform Admin | Platform & Governance | **Team A** | Global enterprise settings, tenant provisioning, license management. |
| `src/features/subscription` | Subscription | Commercial | **Team A** | Tier upgrades, plan quotas, seat allocation. |
| `src/features/revenue` | Revenue | Commercial | **Team A** | Automated billing cycles, invoice pipelines, usage metrics. |
| `src/features/reporting` | Reporting | Intelligence | **Team A** | Executive KPI dashboards, report exports, analytics. |
| `src/features/hrms` | HRMS | Workforce | **Team B** | Employee directory, attendance, leaves, organization chart. |
| `src/features/crm` | CRM | Customer Ops | **Team B** | Opportunity pipelines, accounts, leads, deal stages. |
| `src/features/workflow` | Workflow | Automation | **Team B** | Multi-level approval matrices, process automation. |
| `src/features/notifications`| Notifications | Communications | **Team B** | Notification tray, channel preferences, dispatch broadcasts. |
| `src/features/calendar` | Calendar | Workforce | **Team B** | Room bookings, company events, availability scheduling. |
| `src/features/erp` | ERP | Operations | **Team C** | Supply chain, procurement orders, inventory counts. |
| `src/features/finance` | Finance | Financial Systems | **Team C** | General ledger, AP/AR, multi-currency valuation, tax. |
| `src/features/dms` | DMS | Document Vault | **Team C** | Document storage, metadata tagging, version audit. |
| `src/features/integrations` | Integrations | Ecosystem | **Team C** | Webhook listener relays, ERP connectors, partner APIs. |
| `src/features/search` | Search | Discovery | **Team C** | Federated enterprise search index, autocomplete. |
| `src/features/monitoring` | Monitoring | Reliability | **Team C** | Health metrics, API latency dashboards, session logs. |
| `src/features/security` | Security | Compliance | **Team C** | SSO/SAML configuration, MFA enforcement, audit trails. |
| `src/features/developer` | Developer | Platform SDK | **Team C** | API key generation, developer sandbox, SDK docs. |
| `src/features/portals` | Portals | Stakeholders | **Team C** | Vendor portal, customer self-service portal. |
| `src/features/ai` | AI | Cognitive | **Team C** | AI co-pilot, document OCR parsing, query assistance. |
