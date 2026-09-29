# Page-to-API Traceability Matrix

This document maps every application navigation item, route, and UI page to its underlying feature code, service function, API contract, and mock handler.

---

## 1. ERP Traceability (Team A)

| Level | Component / Path | Status |
|---|---|---|
| **Sidebar Item** | `BUSINESS MODULES > ERP > Overview` | Established |
| **Route** | `/erp` | Established |
| **Feature Folder** | `src/features/erp/` | Established |
| **Page Component** | `src/features/erp/pages/ErpHomePage.tsx` | Established |
| **Domain Service** | `erpService.getWorkspaceStatus()` in `src/features/erp/services/erpService.ts` | Established |
| **API Contract** | `GET /erp/workspace-status` → `ApiResponseEnvelope<ErpWorkspaceStatus>` | Established |
| **Mock Handler** | `erpMockHandlers.getWorkspaceStatus()` in `src/mock/erp/erpMockHandlers.ts` | Established |
| **ERP Modules** | `src/features/erp/pages/*` | **TBD — Awaiting Approved Requirements** |

---

## 2. CRM Traceability (Team B)

| Level | Component / Path | Status |
|---|---|---|
| **Sidebar Item** | `BUSINESS MODULES > CRM > Overview` | Established |
| **Route** | `/crm` | Established |
| **Feature Folder** | `src/features/crm/` | Established |
| **Page Component** | `src/features/crm/pages/CrmHomePage.tsx` | Established |
| **Domain Service** | `crmService.getWorkspaceStatus()` in `src/features/crm/services/crmService.ts` | Established |
| **API Contract** | `GET /crm/workspace-status` → `ApiResponseEnvelope<CrmWorkspaceStatus>` | Established |
| **Mock Handler** | `crmMockHandlers.getWorkspaceStatus()` in `src/mock/crm/crmMockHandlers.ts` | Established |
| **CRM Modules** | `src/features/crm/pages/*` | **TBD — Awaiting Approved Requirements** |

---

## 3. HRMS Traceability (Team C)

| Level | Component / Path | Status |
|---|---|---|
| **Sidebar Item** | `BUSINESS MODULES > HRMS > Overview` | Established |
| **Route** | `/hrms` | Established |
| **Feature Folder** | `src/features/hrms/` | Established |
| **Page Component** | `src/features/hrms/pages/HrmsHomePage.tsx` | Established |
| **Domain Service** | `hrmsService.getWorkspaceStatus()` in `src/features/hrms/services/hrmsService.ts` | Established |
| **API Contract** | `GET /hrms/workspace-status` → `ApiResponseEnvelope<HrmsWorkspaceStatus>` | Established |
| **Mock Handler** | `hrmsMockHandlers.getWorkspaceStatus()` in `src/mock/hrms/hrmsMockHandlers.ts` | Established |
| **HRMS Modules** | `src/features/hrms/pages/*` | **TBD — Awaiting Approved Requirements** |
