# Page-to-API Traceability Matrix

This document maps application navigation items, routes, and UI pages to their underlying feature code, service function, API contract, and mock handler across all 4 engineering teams.

---

## 1. ERP Traceability (Team 1 — ERP)

| Level | Component / Path | Status |
| :--- | :--- | :--- |
| **Sidebar Item** | `BUSINESS MODULES > ERP > Overview` | Established |
| **Route** | `/erp` (and `/erp/dashboard`) | Established |
| **Feature Folder** | `src/features/erp/` | Established |
| **Primary Page Component** | `src/features/erp/pages/ERPDashboardPage.tsx` | Established |
| **Domain Service** | `erpService.getWorkspaceStatus()` in `src/features/erp/services/erpService.ts` | Established |
| **API Contract** | `GET /erp/workspace-status` → `ApiResponseEnvelope<ErpWorkspaceStatus>` | Established |
| **Mock Handler** | `erpMockHandlers.getWorkspaceStatus()` in `src/mock/erp/erpMockHandlers.ts` | Established |
| **ERP Modules (7)** | `src/features/erp/pages/*` | Established (Mapped to ERP-DEV-01 through 07) |

---

## 2. CRM Traceability (Team 2 — CRM)

| Level | Component / Path | Status |
| :--- | :--- | :--- |
| **Sidebar Item** | `BUSINESS MODULES > CRM > Overview` | Established |
| **Route** | `/crm` (and `/crm/dashboard`) | Established |
| **Feature Folder** | `src/features/crm/` | Established |
| **Primary Page Component** | `src/features/crm/pages/CRMDashboardPage.tsx` | Established |
| **Domain Service** | `crmService.getWorkspaceStatus()` in `src/features/crm/services/crmService.ts` | Established |
| **API Contract** | `GET /crm/workspace-status` → `ApiResponseEnvelope<CrmWorkspaceStatus>` | Established |
| **Mock Handler** | `crmMockHandlers.getWorkspaceStatus()` in `src/mock/crm/crmMockHandlers.ts` | Established |
| **CRM Modules (7)** | `src/features/crm/pages/*` | Established (Mapped to CRM-DEV-01 through 07) |

---

## 3. HRMS Traceability (Team 3 — HRMS)

| Level | Component / Path | Status |
| :--- | :--- | :--- |
| **Sidebar Item** | `BUSINESS MODULES > HRMS > Employee Management` | Established |
| **Route** | `/hrms/employees` (and `/hrms`) | Established |
| **Feature Folder** | `src/features/hrms/` | Established |
| **Primary Page Component** | `src/features/hrms/pages/EmployeeManagementPage.tsx` | Established |
| **Domain Service** | `hrmsService.getWorkspaceStatus()` in `src/features/hrms/services/hrmsService.ts` | Established |
| **API Contract** | `GET /hrms/workspace-status` → `ApiResponseEnvelope<HrmsWorkspaceStatus>` | Established |
| **Mock Handler** | `hrmsMockHandlers.getWorkspaceStatus()` in `src/mock/hrms/hrmsMockHandlers.ts` | Established |
| **HRMS Modules (7)** | `src/features/hrms/pages/*` | Established (Mapped to HRMS-DEV-01 through 07) |

---

## 4. Finance Traceability (Team 4 — Finance)

| Level | Component / Path | Status |
| :--- | :--- | :--- |
| **Sidebar Item** | `BUSINESS MODULES > Finance > General Ledger` | Established |
| **Route** | `/finance/general-ledger` | Established |
| **Feature Folder** | `src/features/finance/` | Established |
| **Primary Page Component** | `src/features/finance/pages/GLReportingPage.tsx` | Established |
| **Domain Service** | `financeService.getWorkspaceStatus()` in `src/features/finance/services/financeService.ts` | Established |
| **API Contract** | `GET /finance/workspace-status` → `ApiResponseEnvelope<FinanceWorkspaceStatus>` | Established |
| **Mock Handler** | `financeMockHandlers.getWorkspaceStatus()` in `src/mock/finance/financeMockHandlers.ts` | Established |
| **Finance Modules (3)**| `src/features/finance/pages/*` | Established (Mapped to FIN-DEV-01 through 03) |