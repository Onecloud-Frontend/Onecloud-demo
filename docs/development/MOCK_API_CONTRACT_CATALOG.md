# One Enterprise Cloud — Mock API Contract Catalog

This catalog documents the current in-memory mock API infrastructure, separating **currently active mock contracts** from **capability-level mock contracts still required**.

---

## 1. Mock Architecture & Dispatch Layer

The mock API layer is in-memory, deterministic, and isolated in `src/mock/`:

```
src/mock/
├── crm/                 # CRM baseline mock handler and data
├── data/commonMockData.ts # Latency simulator (delay) & createMockEnvelope helper
├── erp/                 # ERP baseline mock handler and data
├── finance/             # Finance baseline mock handler and data
├── handlers/mockRouter.ts # Centralized path router for mock requests
├── hrms/                # HRMS baseline mock handler and data
├── mockAdapter.ts       # Implements IApiClient and registers with core client
└── index.ts
```

---

## PART A: EXISTING MOCK CONTRACTS (4 Active Baseline Handlers)

Only these 4 baseline domain health contracts currently exist in `src/mock/`. They are fully operational, tested, and return standardized `ApiResponseEnvelope<T>` payloads with simulated latency (150ms–300ms).

| Domain | Scope | Endpoint Path | Method | Mock Handler File | Mock Data Variable | Return Type | Latency | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ERP** | Baseline Domain Health | `/erp/workspace-status` | `GET` | `src/mock/erp/erpMockHandlers.ts` | `mockErpWorkspaceStatus` | `ApiResponseEnvelope<ErpWorkspaceStatus>` | 250ms | **ACTIVE** |
| **CRM** | Baseline Domain Health | `/crm/workspace-status` | `GET` | `src/mock/crm/crmMockHandlers.ts` | `mockCrmWorkspaceStatus` | `ApiResponseEnvelope<CrmWorkspaceStatus>` | 200ms | **ACTIVE** |
| **HRMS** | Baseline Domain Health | `/hrms/workspace-status` | `GET` | `src/mock/hrms/hrmsMockHandlers.ts` | `mockHrmsWorkspaceStatus` | `ApiResponseEnvelope<HrmsWorkspaceStatus>` | 220ms | **ACTIVE** |
| **Finance** | Baseline Domain Health | `/finance/workspace-status` | `GET` | `src/mock/finance/financeMockHandlers.ts` | `mockFinanceWorkspaceStatus` | `ApiResponseEnvelope<FinanceWorkspaceStatus>` | 180ms | **ACTIVE** |

> [!NOTE]
> The mock router strictly dispatches these 4 paths. Any request to an unregistered path (e.g., `GET /erp/procurement/orders`) throws:
> `Mock handler for route [GET /erp/procurement/orders] is not registered. (TBD — Backend Contract Required)`.

---

## PART B: MOCK CONTRACTS REQUIRED (20 Capability Slices)

The following capability-specific mock handlers **do not yet exist**. They must be authored by developers only after approved field-level contracts freeze.

| Domain | Assigned Developer | Capability | Target Mock Path | Planned Operations | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ERP** | ERP-DEV-02 | Procurement | `/erp/procurement/*` | `GET /requests`, `POST /requests`, `GET /orders` | **MOCK CONTRACT REQUIRED** |
| **ERP** | ERP-DEV-03 | Vendor Management | `/erp/vendors/*` | `GET /vendors`, `POST /vendors`, `GET /evaluations` | **MOCK CONTRACT REQUIRED** |
| **ERP** | ERP-DEV-04 | Inventory | `/erp/inventory/*` | `GET /items`, `POST /adjustments` | **MOCK CONTRACT REQUIRED** |
| **ERP** | ERP-DEV-05 | Warehouse | `/erp/warehouse/*` | `GET /facilities`, `POST /transfers` | **MOCK CONTRACT REQUIRED** |
| **ERP** | ERP-DEV-06 | Sales Fulfillment & Returns | `/erp/fulfillment/*` | `GET /orders`, `POST /dispatch`, `POST /rma` | **MOCK CONTRACT REQUIRED** |
| **ERP** | ERP-DEV-07 | ERP Reports & Analytics | `/erp/reports/*` | `GET /spend-analysis`, `GET /valuation` | **MOCK CONTRACT REQUIRED** |
| **CRM** | CRM-DEV-02 | Lead Management | `/crm/leads/*` | `GET /leads`, `POST /leads`, `POST /convert` | **MOCK CONTRACT REQUIRED** |
| **CRM** | CRM-DEV-03 | Opportunity Management | `/crm/opportunities/*` | `GET /opportunities`, `PATCH /stage` | **MOCK CONTRACT REQUIRED** |
| **CRM** | CRM-DEV-04 | Customer & Contact | `/crm/customers/*` | `GET /customers`, `POST /contacts` | **MOCK CONTRACT REQUIRED** |
| **CRM** | CRM-DEV-05 | Quotation / Sales | `/crm/quotations/*` | `GET /quotes`, `POST /quotes`, `POST /approve` | **MOCK CONTRACT REQUIRED** |
| **CRM** | CRM-DEV-06 | Customer Portal & Support | `/crm/support/*` | `GET /tickets`, `POST /tickets`, `POST /reply` | **MOCK CONTRACT REQUIRED** |
| **CRM** | CRM-DEV-07 | CRM Reports & Analytics | `/crm/reports/*` | `GET /conversion-funnel`, `GET /rep-quota` | **MOCK CONTRACT REQUIRED** |
| **HRMS** | HRMS-DEV-02 | Attendance & Shifts | `/hrms/attendance/*` | `GET /logs`, `POST /clock-in`, `GET /shifts` | **MOCK CONTRACT REQUIRED** |
| **HRMS** | HRMS-DEV-03 | Leave Management | `/hrms/leave/*` | `GET /balances`, `POST /requests`, `POST /approve` | **MOCK CONTRACT REQUIRED** |
| **HRMS** | HRMS-DEV-04 | Payroll | `/hrms/payroll/*` | `GET /runs`, `GET /payslips`, `POST /process` | **MOCK CONTRACT REQUIRED** |
| **HRMS** | HRMS-DEV-05 | Recruitment | `/hrms/recruitment/*` | `GET /jobs`, `GET /candidates`, `POST /advance` | **MOCK CONTRACT REQUIRED** |
| **HRMS** | HRMS-DEV-06 | Performance & Learning | `/hrms/performance/*` | `GET /appraisals`, `GET /courses` | **MOCK CONTRACT REQUIRED** |
| **HRMS** | HRMS-DEV-07 | ESS & Employee Assets | `/hrms/ess-assets/*` | `GET /profile`, `GET /assets`, `POST /request` | **MOCK CONTRACT REQUIRED** |
| **Finance** | FIN-DEV-02 | AP / AR / Banking | `/finance/apar/*` | `GET /bills`, `GET /invoices`, `GET /bank-accounts` | **MOCK CONTRACT REQUIRED** |
| **Finance** | FIN-DEV-03 | Expenses, Budgets & Tax | `/finance/expenses/*` | `GET /claims`, `POST /claims`, `GET /budgets` | **MOCK CONTRACT REQUIRED** |

---

## 3. Mock Readiness Protocol for Developers

1. **Do NOT Invent Speculative Mock Contracts**:
   Developers should develop their assigned pages in **`READY — UI ONLY`** mode until backend field specifications are officially provided.
2. **Steps When Contract Freezes**:
   - Define canonical types in `src/features/<domain>/types/<capability>.ts`.
   - Add minimal typed mock records in `src/mock/<domain>/<capability>MockData.ts`.
   - Implement handlers in `src/mock/<domain>/<capability>MockHandlers.ts` wrapped in `delay()` and `createMockEnvelope()`.
   - Register route in `src/mock/handlers/mockRouter.ts`.
3. **Cutover to Production Backend**:
   - Toggle `ApiMode = 'REAL'` in `src/core/api/client/apiConfig.ts`.
   - No UI components or page files need to be rewritten.
