# One Enterprise Cloud — Master Developer Assignment Matrix

> **CONSOLIDATED 24-DEVELOPER ASSIGNMENT DIRECTORY:**
> This matrix defines the authoritative ownership, routing, primary page component, canonical types, and specific responsibilities for all 24 frontend developers.

---

## Summary Statistics

| Domain | Team | Total Developers | Canonical Types Owned | Route Prefix | Guide Reference |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ERP / Supply Chain** | Team 1 | **7** (`ERP-DEV-01` to `ERP-DEV-07`) | 55 types | `/erp` | [ERP_TEAM_GUIDE.md](./teams/ERP_TEAM_GUIDE.md) |
| **CRM** | Team 2 | **7** (`CRM-DEV-01` to `CRM-DEV-07`) | 35 types | `/crm` | [CRM_TEAM_GUIDE.md](./teams/CRM_TEAM_GUIDE.md) |
| **HRMS** | Team 3 | **7** (`HRMS-DEV-01` to `HRMS-DEV-07`) | 64 types | `/hrms` | [HRMS_TEAM_GUIDE.md](./teams/HRMS_TEAM_GUIDE.md) |
| **Finance** | Team 4 | **3** (`FIN-DEV-01` to `FIN-DEV-03`) | 39 types | `/finance` | [FINANCE_TEAM_GUIDE.md](./teams/FINANCE_TEAM_GUIDE.md) |
| **TOTAL** | **Enterprise** | **24** Developers | **193 Domain Types + 12 Shared = 205** | — | — |

---

## Master Developer Assignments Matrix

| Developer ID | Domain | Module | Route | Primary Page | Canonical Types | Responsibilities |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `ERP-DEV-01` | ERP | ERP Dashboard | `/erp` (and `/erp/dashboard`) | `ERPDashboardPage.tsx` | `Product`, `Vendor`, `PurchaseOrder`, `SalesOrder`, `InventoryItem`, `Warehouse`, `Delivery`, `Shipment`, `FulfillmentOrder` | Executive supply chain dashboard, operational KPI summary cards, high-level procurement/inventory widgets, pending alert badges. |
| `ERP-DEV-02` | ERP | Procurement | `/erp/procurement` | `ProcurementPage.tsx` | `PurchaseRequest`, `PurchaseRequestItem`, `RFQ`, `RFQItem`, `VendorQuote`, `VendorQuoteItem`, `Vendor`, `Product`, `Department`, `Employee` | Internal purchase requisitions, RFQ tenders, supplier quote bidding comparison, managerial procurement approvals. |
| `ERP-DEV-03` | ERP | Vendor Management | `/erp/vendors` | `VendorManagementPage.tsx` | `Vendor`, `VendorContact`, `VendorAddress`, `VendorEvaluation`, `VendorContract`, `VendorReference` | Supplier master directory, vendor contact profiles, supplier performance scorecards, procurement supply agreements. |
| `ERP-DEV-04` | ERP | Inventory | `/erp/inventory` | `InventoryPage.tsx` | `Product`, `ProductCategory`, `InventoryItem`, `StockRecord`, `Batch`, `SerialNumber`, `StockMovement`, `StockAdjustment`, `StockAdjustmentItem`, `StockCount`, `InventoryReconciliation`, `ReorderRule` | Real-time warehouse SKU stock levels, lot/batch tracking, serialized items, manual inventory adjustments, periodic physical counting. |
| `ERP-DEV-05` | ERP | Warehouse | `/erp/warehouse` | `WarehousePage.tsx` | `Warehouse`, `WarehouseZone`, `BinLocation`, `StockRecord`, `InventoryItem`, `StockTransfer`, `StockTransferItem` | Multi-facility warehouse topology, storage zone definitions, rack/bin coordinate management, inter-facility stock transfer shipments. |
| `ERP-DEV-06` | ERP | Sales Fulfillment / Returns | `/erp/fulfillment` | `FulfillmentPage.tsx` | `SalesOrder`, `SalesOrderItem`, `FulfillmentOrder`, `Delivery`, `Shipment`, `Return`, `ReturnItem`, `Customer`, `Product` | Sales order warehouse fulfillment, pick-pack-ship lifecycle, carrier dispatch tracking, return merchandise authorization (RMA) inspections. |
| `ERP-DEV-07` | ERP | ERP Reports | `/erp/reports` | `ERPReportsPage.tsx` | Relevant ERP types: `InventoryItem`, `PurchaseOrder`, `SalesOrder`, `StockMovement`, `VendorEvaluation` | Supply chain reporting filters, inventory valuation matrices, procurement spend analysis, carrier delivery performance reports. |
| `CRM-DEV-01` | CRM | CRM Dashboard | `/crm` (and `/crm/dashboard`) | `CRMDashboardPage.tsx` | `CrmDashboardMetrics`, `PipelineStageMetric`, `Lead`, `Opportunity`, `Customer`, `SupportTicket` | Executive CRM operational dashboard, sales pipeline stage funnel, lead conversion rate cards, customer satisfaction indicators. |
| `CRM-DEV-02` | CRM | Leads | `/crm/leads` | `LeadManagementPage.tsx` | `Lead`, `LeadSource`, `LeadStatus`, `LeadActivity` | Inbound sales prospect intake, lead qualification workflow, sales touchpoint activity logs, lead conversion into customer/opportunity. |
| `CRM-DEV-03` | CRM | Opportunities | `/crm/opportunities` | `OpportunityPage.tsx` | `Opportunity`, `OpportunityStage`, `OpportunityStatus`, `OpportunityActivity`, `Customer`, `Contact`, `SalesPipeline`, `PipelineStage` | Multi-stage deal progression, weighted probability forecasting, expected close date scheduling, win/loss post-mortem tracking. |
| `CRM-DEV-04` | CRM | Customers / Contacts | `/crm/customers` | `CustomerContactPage.tsx` | `Customer`, `CustomerAddress`, `CustomerReference`, `Contact` | Customer 360 account profile, multiple stakeholder contact directory, billing/shipping address management, credit limit status. |
| `CRM-DEV-05` | CRM | Quotations / Sales | `/crm/quotations` | `QuotationSalesPage.tsx` | `Quotation`, `QuotationItem`, `PricingRule`, `DiscountRule`, `QuoteApproval`, `Customer`, `Contact`, `Product` | Formal sales quote drafting, multi-line pricing calculation with Indian GST, tiered discount policy rules, quote approval workflow. |
| `CRM-DEV-06` | CRM | Support / Customer Portal | `/crm/support` | `SupportPortalPage.tsx` | `SupportTicket`, `SupportComment`, `SupportAttachment`, `SupportCategory`, `Customer`, `Contact` | Customer support ticketing system, SLA countdown timers, multi-user threaded comments, attachment evidence viewer. |
| `CRM-DEV-07` | CRM | CRM Reports | `/crm/reports` | `CRMReportsPage.tsx` | Relevant CRM types: `Lead`, `Opportunity`, `Customer`, `SupportTicket`, `Quotation` | Sales rep performance leaderboards, pipeline velocity analytics, customer retention analysis, ticket resolution SLA reports. |
| `HRMS-DEV-01` | HRMS | Employee Management | `/hrms/employees` | `EmployeeManagementPage.tsx` | `Employee`, `EmployeeReference`, `Department`, `Skill`, `Certification`, `EmergencyContact`, `EmployeeDocument` | Employee master directory, personal/organizational profile forms, compliance document uploads, emergency contacts and skills. |
| `HRMS-DEV-02` | HRMS | Attendance | `/hrms/attendance` | `AttendancePage.tsx` | `AttendanceRecord`, `AttendanceSummary`, `Shift`, `OvertimeRecord`, `AttendanceCorrection`, `Employee` | Daily clock-in/out attendance logs, shift rotation schedules, overtime recording, employee attendance regularization requests. |
| `HRMS-DEV-03` | HRMS | Leave Management | `/hrms/leave` | `LeaveManagementPage.tsx` | `LeaveType`, `LeaveBalance`, `LeaveRequest`, `LeaveApproval`, `Employee` | Annual leave entitlement balances, leave application form with duration validation, manager approval/rejection timeline. |
| `HRMS-DEV-04` | HRMS | Payroll | `/hrms/payroll` | `PayrollPage.tsx` | `SalaryComponent`, `SalaryStructure`, `PayrollRun`, `PayrollRecord`, `Payslip`, `PayslipComponent`, `Employee` | Salary compensation components, structured pay templates, monthly organization-wide payroll runs, individual payslip generation. |
| `HRMS-DEV-05` | HRMS | Recruitment | `/hrms/recruitment` | `RecruitmentPage.tsx` | `JobRequisition`, `JobPosting`, `Candidate`, `Interview`, `CandidateEvaluation`, `Department`, `Employee` | Departmental manpower requisitions, external job postings, candidate applicant tracking, structured interview scorecards. |
| `HRMS-DEV-06` | HRMS | Performance + Learning | `/hrms/performance` | `PerformanceLearningPage.tsx` | `PerformanceGoal`, `KPI`, `PerformanceReview`, `PerformanceFeedback`, `Course`, `LearningPlan`, `Assessment`, `LearningProgress`, `Employee` | Annual KPI goal management, 360-degree performance reviews, corporate training course catalog, employee learning progress roadmaps. |
| `HRMS-DEV-07` | HRMS | ESS + Employee Assets | `/hrms/ess-assets` | `ESSEmployeeAssetsPage.tsx` | `Employee`, `EmployeeRequest`, `EmployeeDocument`, `AttendanceRecord`, `LeaveBalance`, `Asset`, `AssetAssignment`, `AssetMaintenance` | Employee self-service request portal, company hardware/laptop asset issuance, maintenance repair logs, equipment status tracking. |
| `FIN-DEV-01` | Finance | General Ledger + Reporting | `/finance/general-ledger` | `GLReportingPage.tsx` | `ChartOfAccount`, `AccountCategory`, `FinancialPeriod`, `JournalEntry`, `JournalEntryLine`, `LedgerEntry` | Master chart of accounts, balanced double-entry journal vouchers, financial accounting periods, general ledger account audit ledgers. |
| `FIN-DEV-02` | Finance | AP + AR + Banking | `/finance/ap-ar-banking` | `APARBankingPage.tsx` | `CustomerInvoice`, `CustomerInvoiceLine`, `Receipt`, `Collection`, `ReceivableAging`, `VendorBill`, `VendorBillLine`, `PayableAging`, `Payment`, `PaymentAllocation`, `BankAccount`, `BankTransaction`, `BankReconciliation`, `BankReconciliationItem` | Accounts receivable customer invoicing & collections, accounts payable vendor bills & disbursements, bank statement reconciliations. |
| `FIN-DEV-03` | Finance | Expenses + Budgets + Tax | `/finance/expenses-budgets-tax` | `ExpensesBudgetsTaxPage.tsx` | `ExpenseClaim`, `ExpenseItem`, `Reimbursement`, `Budget`, `BudgetAllocation`, `BudgetVariance`, `TaxConfiguration`, `TaxRule`, `TaxCalculation`, `TaxPeriod`, `Employee`, `Department` | Employee business expense claims, departmental budget allocations & variance calculations, Indian statutory GST tax rule configurations. |

---

## Cross-Team Integration Summary

- **CRM → ERP**: CRM Quotations (`Quotation`) convert into ERP Sales Orders (`SalesOrder`). Both domains reference canonical `Product` and `Customer`.
- **ERP → Finance**: ERP Purchase Orders (`PurchaseOrder`) link directly into Finance Vendor Bills (`VendorBill`). ERP Sales Orders (`SalesOrder`) link into Finance Customer Invoices (`CustomerInvoice`).
- **CRM → Finance**: Finance Customer Invoices (`CustomerInvoice`) and Collections (`Collection`) strictly reference CRM-owned `Customer` and `Contact`.
- **HRMS → Finance**: Finance Expense Claims (`ExpenseClaim`) and departmental budgets (`Budget`) reference HRMS `Employee` and `Department`.
- **HRMS → ERP**: ERP Purchase Requisitions (`PurchaseRequest`) reference HRMS `Department` and `Employee` requesting goods.