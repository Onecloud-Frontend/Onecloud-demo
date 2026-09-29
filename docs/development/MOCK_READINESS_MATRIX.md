# One Enterprise Cloud — Mock Readiness Matrix

This document provides a realistic, non-speculative audit of mock API readiness across all **24 developer assignments**.

---

## 1. Mock Evaluation Criteria

- **READY**: Developer can open page, import an approved domain type, call a service, receive mock data, and implement full data-driven flows without inventing schemas.
- **READY — UI ONLY**: Developer can open page, render responsive layouts, build presentation components, and scaffold loading/empty/error states; but specific business entity schemas and mock endpoints are awaiting contract freeze.
- **MOCK CONTRACT REQUIRED**: Specific capability endpoints (e.g. `POST /erp/procurement/orders`) must be registered before data submission flows can be mocked.
- **TYPE CONTRACT REQUIRED**: Specific domain entity types must be defined before mock response shapes can be created.
- **BLOCKED**: Developer cannot perform any UI or code work. (*0 developers are blocked*).

---

## 2. 24-Developer Mock Readiness Table

| Developer | Capability | Page | Type | Service | Mock Handler | Mock Data | Operations | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `ERP-DEV-01` | ERP Dashboard & Overview | `ERPDashboardPage.tsx` | `ErpWorkspaceStatus` | `erpService.getWorkspaceStatus()` | `erpMockHandlers.getWorkspaceStatus()` | `mockErpWorkspaceStatus` | `GET /erp/workspace-status` | **READY — UI ONLY** |
| `ERP-DEV-02` | Procurement | `ProcurementPage.tsx` | `ErpBaseRecord (PO pending)` | `erpService (procurementService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /erp/workspace-status (PO CRUD pending)` | **READY — UI ONLY** |
| `ERP-DEV-03` | Vendor Management | `VendorManagementPage.tsx` | `ErpBaseRecord (Vendor pending)` | `erpService (vendorService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /erp/workspace-status (Vendor CRUD pending)` | **READY — UI ONLY** |
| `ERP-DEV-04` | Inventory | `InventoryPage.tsx` | `ErpBaseRecord (Item pending)` | `erpService (inventoryService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /erp/workspace-status (Stock CRUD pending)` | **READY — UI ONLY** |
| `ERP-DEV-05` | Warehouse | `WarehousePage.tsx` | `ErpBaseRecord (Facility pending)` | `erpService (warehouseService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /erp/workspace-status (Bin/Transfer pending)` | **READY — UI ONLY** |
| `ERP-DEV-06` | Sales Fulfillment & Returns | `FulfillmentPage.tsx` | `ErpBaseRecord (RMA pending)` | `erpService (fulfillmentService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /erp/workspace-status (Dispatch/RMA pending)` | **READY — UI ONLY** |
| `ERP-DEV-07` | ERP Reports & Analytics | `ERPReportsPage.tsx` | `ErpBaseRecord (Filter pending)` | `erpService (reportService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /erp/workspace-status (Reports pending)` | **READY — UI ONLY** |
| `CRM-DEV-01` | CRM Dashboard | `CRMDashboardPage.tsx` | `CrmWorkspaceStatus` | `crmService.getWorkspaceStatus()` | `crmMockHandlers.getWorkspaceStatus()` | `mockCrmWorkspaceStatus` | `GET /crm/workspace-status` | **READY — UI ONLY** |
| `CRM-DEV-02` | Lead Management | `LeadManagementPage.tsx` | `CrmBaseRecord (Lead pending)` | `crmService (leadService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /crm/workspace-status (Lead CRUD pending)` | **READY — UI ONLY** |
| `CRM-DEV-03` | Opportunity Management | `OpportunityPage.tsx` | `CrmBaseRecord (Opp pending)` | `crmService (opportunityService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /crm/workspace-status (Opp CRUD pending)` | **READY — UI ONLY** |
| `CRM-DEV-04` | Customer & Contact | `CustomerContactPage.tsx` | `CrmBaseRecord (Customer pending)` | `crmService (customerService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /crm/workspace-status (Customer CRUD pending)` | **READY — UI ONLY** |
| `CRM-DEV-05` | Quotation / Sales | `QuotationSalesPage.tsx` | `CrmBaseRecord (Quote pending)` | `crmService (quotationService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /crm/workspace-status (Quote CRUD pending)` | **READY — UI ONLY** |
| `CRM-DEV-06` | Customer Portal & Support | `SupportPortalPage.tsx` | `CrmBaseRecord (Ticket pending)` | `crmService (supportService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /crm/workspace-status (Ticket CRUD pending)` | **READY — UI ONLY** |
| `CRM-DEV-07` | CRM Reports & Analytics | `CRMReportsPage.tsx` | `CrmBaseRecord (Filter pending)` | `crmService (reportService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /crm/workspace-status (Funnel reports pending)` | **READY — UI ONLY** |
| `HRMS-DEV-01` | Employee Management | `EmployeeManagementPage.tsx` | `HrmsWorkspaceStatus` | `hrmsService.getWorkspaceStatus()` | `hrmsMockHandlers.getWorkspaceStatus()` | `mockHrmsWorkspaceStatus` | `GET /hrms/workspace-status` | **READY — UI ONLY** |
| `HRMS-DEV-02` | Attendance & Shifts | `AttendancePage.tsx` | `HrmsBaseRecord (Shift pending)` | `hrmsService (attendanceService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /hrms/workspace-status (Attendance logs pending)` | **READY — UI ONLY** |
| `HRMS-DEV-03` | Leave Management | `LeaveManagementPage.tsx` | `HrmsBaseRecord (Leave pending)` | `hrmsService (leaveService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /hrms/workspace-status (Leave requests pending)` | **READY — UI ONLY** |
| `HRMS-DEV-04` | Payroll | `PayrollPage.tsx` | `HrmsBaseRecord (Salary pending)` | `hrmsService (payrollService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /hrms/workspace-status (Payroll run pending)` | **READY — UI ONLY** |
| `HRMS-DEV-05` | Recruitment | `RecruitmentPage.tsx` | `HrmsBaseRecord (Job/Candidate pending)` | `hrmsService (recruitmentService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /hrms/workspace-status (ATS pipeline pending)` | **READY — UI ONLY** |
| `HRMS-DEV-06` | Performance & Learning | `PerformanceLearningPage.tsx` | `HrmsBaseRecord (Appraisal pending)` | `hrmsService (performanceService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /hrms/workspace-status (Appraisals pending)` | **READY — UI ONLY** |
| `HRMS-DEV-07` | ESS & Employee Assets | `ESSEmployeeAssetsPage.tsx` | `HrmsBaseRecord (Asset pending)` | `hrmsService (essAssetsService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /hrms/workspace-status (Asset tracking pending)` | **READY — UI ONLY** |
| `FIN-DEV-01` | General Ledger & Reporting | `GLReportingPage.tsx` | `FinanceWorkspaceStatus` | `financeService.getWorkspaceStatus()` | `financeMockHandlers.getWorkspaceStatus()` | `mockFinanceWorkspaceStatus` | `GET /finance/workspace-status` | **READY — UI ONLY** |
| `FIN-DEV-02` | AP / AR / Banking | `APARBankingPage.tsx` | `FinanceBaseRecord (Invoice/Bill pending)` | `financeService (aparBankingService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /finance/workspace-status (Invoices/Bills pending)` | **READY — UI ONLY** |
| `FIN-DEV-03` | Expenses, Budgets & Tax | `ExpensesBudgetsTaxPage.tsx` | `FinanceBaseRecord (Claim/Tax pending)` | `financeService (expensesTaxService pending)` | `Baseline domain handler only` | `Baseline mock data only` | `GET /finance/workspace-status (Claims/Tax pending)` | **READY — UI ONLY** |

---

## 3. Mock Readiness Summary

- **Developers Fully READY (with Complete Business Data Mocks)**: **0 / 24**
  - *Rationale*: While 4 domain baseline handlers exist (`/workspace-status`), specific capability CRUD endpoints (e.g., Lead intake, PO submission, Leave filing) require approved backend field contracts before mock payloads can be faithfully created.
- **Developers READY — UI ONLY**: **24 / 24**
  - *Rationale*: All 24 developers have assigned starter TSX pages, registered routes, shared UI components (`PageHeader`, `Card`, `Badge`, `LoadingState`, `EmptyState`, `ErrorState`), and can implement layout, component hierarchy, forms, and validation rules immediately.
- **Developers BLOCKED**: **0 / 24**
  - *Rationale*: Zero developers are blocked from beginning frontend engineering work.
