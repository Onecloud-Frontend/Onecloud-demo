# One Enterprise Cloud — Canonical Type Contract Catalog

> **AUTHORITATIVE DIRECTIVE:**  
> These TypeScript business types are the canonical frontend contracts for the One Enterprise Cloud demo.  
> All 24 developers across ERP, CRM, HRMS, and Finance MUST consume these centralized types. Developers MUST NOT declare ad-hoc domain interfaces in pages, components, or feature folders.

---

## 1. MANDATORY GOVERNANCE RULES

1. **Developers MUST reuse canonical types:** Every page, component, form, and table must import and use the canonical types defined in this catalog.
2. **Developers MUST NOT create duplicate business interfaces:** Creating `CRMCustomer`, `ERPCustomer`, `EmployeeDTO`, or `PurchaseOrderModel` is strictly forbidden.
3. **New business types require review before creation:** Any new business model or structural schema change must undergo architecture review before being committed.
4. **Domain ownership must be respected:**
   - **HRMS owns:** Employee, Department, Attendance, Leave, Payroll, Recruitment, Performance, Learning, Employee Assets.
   - **CRM owns:** Customer, Contact, Lead, Opportunity, Activity/Communication, Quotation, Support Tickets.
   - **ERP owns:** Product/Item, Vendor, Procurement, Purchase Orders, Inventory, Warehouse, Stock, Fulfillment, Delivery, Shipment, Sales Orders, Returns.
   - **Finance owns:** Chart of Accounts, Journal Entries, Ledger, Customer Invoice, Vendor Bill, Payments, Receivables, Payables, Banking, Expenses, Budgets, Tax.
5. **Cross-domain references should use canonical types or IDs:** Reference other domains via string IDs (e.g. `customerId: string`, `vendorId: string`, `employeeId: string`) or lightweight canonical reference snapshots (`CustomerReference`, `VendorReference`, `EmployeeReference`).
6. **Mock data must be created only after this type layer is frozen:** Mock handlers and datasets must conform strictly to these canonical types without introducing ad-hoc fields.
7. **API DTOs, when eventually required, must be kept separate from business domain types:** Backend response DTOs must never silently overwrite or compromise domain business models.

---

## 2. CANONICAL TYPE SYSTEM SUMMARY

| Domain | Owning Team | Canonical Types Count | Entry Point |
| :--- | :--- | :--- | :--- |
| **Shared** | Cross-Domain Architecture | **12** | `src/shared/types/index.ts` (`@shared/types`) |
| **HRMS** | Team HRMS (Team 3) | **64** | `src/features/hrms/types/index.ts` (`@features/hrms/types`) |
| **CRM** | Team CRM (Team 2) | **35** | `src/features/crm/types/index.ts` (`@features/crm/types`) |
| **ERP** | Team ERP (Team 1) | **55** | `src/features/erp/types/index.ts` (`@features/erp/types`) |
| **Finance** | Team Finance (Team 4) | **39** | `src/features/finance/types/index.ts` (`@features/finance/types`) |
| **TOTAL** | **Enterprise Foundation** | **205** | **Central Source of Truth** |

---

## 3. HOW DEVELOPERS MUST IMPORT CANONICAL TYPES

Developers should import canonical types directly from each domain's public index entry point:

```typescript
// Shared Types
import type { Address, CurrencyCode, Money, DocumentReference } from '@shared/types';

// HRMS Domain Types
import type {
  Employee,
  Department,
  AttendanceRecord,
  LeaveRequest,
  SalaryStructure,
  Payslip,
  Candidate,
  Asset
} from '@features/hrms/types';

// CRM Domain Types
import type {
  Customer,
  Contact,
  Lead,
  Opportunity,
  Quotation,
  SupportTicket,
  CrmDashboardMetrics
} from '@features/crm/types';

// ERP Domain Types
import type {
  Product,
  Vendor,
  PurchaseOrder,
  InventoryItem,
  Warehouse,
  SalesOrder,
  FulfillmentOrder
} from '@features/erp/types';

// Finance Domain Types
import type {
  ChartOfAccount,
  JournalEntry,
  CustomerInvoice,
  VendorBill,
  Payment,
  BankAccount,
  ExpenseClaim,
  Budget,
  TaxConfiguration
} from '@features/finance/types';
```

---

## 4. COMPLETE CANONICAL TYPE CATALOG (205 Types)

| Domain | Type | Owner | Purpose |
| :--- | :--- | :--- | :--- |
| Shared | `AddressType` | Cross-Domain Architecture | Standardized address classification union (BILLING, SHIPPING, WORK, etc.) |
| Shared | `Address` | Cross-Domain Architecture | Canonical geographic location and physical postal address value object |
| Shared | `ContactInfo` | Cross-Domain Architecture | Reusable contact channels container (email, phone, website) |
| Shared | `AuditMetadata` | Cross-Domain Architecture | Standard record audit stamps tracking author and mutation lifecycle |
| Shared | `EntityId` | Cross-Domain Architecture | Unique string identifier primitive alias |
| Shared | `Nullable` | Cross-Domain Architecture | Generic nullable wrapper type (T | null) |
| Shared | `SelectOption` | Cross-Domain Architecture | Generic dropdown/select option UI representation |
| Shared | `StatusVariant` | Cross-Domain Architecture | Standard color and visual badge status variant union |
| Shared | `CurrencyCode` | Cross-Domain Architecture | ISO 4217 3-letter currency code union (INR, USD, EUR, etc.) |
| Shared | `Money` | Cross-Domain Architecture | Monetary amount value object bound to ISO currency code |
| Shared | `DocumentReference` | Cross-Domain Architecture | Lightweight document metadata reference with upload timestamp and URL |
| Shared | `DocumentAttachment` | Cross-Domain Architecture | File attachment descriptor for uploaded receipts and evidence |
| HRMS | `AssetCategory` | Team HRMS (Team 3) | Hardware and office equipment category classification union |
| HRMS | `AssetStatus` | Team HRMS (Team 3) | Physical equipment inventory status union (AVAILABLE, ASSIGNED, etc.) |
| HRMS | `Asset` | Team HRMS (Team 3) | Company-owned physical IT asset or equipment master record |
| HRMS | `AssetAssignment` | Team HRMS (Team 3) | Asset issuance and return tracking tied to an employee |
| HRMS | `AssetMaintenance` | Team HRMS (Team 3) | Asset service, repair, or preventative maintenance log |
| HRMS | `RequestStatus` | Team HRMS (Team 3) | Employee helpdesk request lifecycle status union |
| HRMS | `EmployeeRequest` | Team HRMS (Team 3) | Employee self-service support ticket (letters, info updates, access) |
| HRMS | `AttendanceStatus` | Team HRMS (Team 3) | Daily employee attendance mark status union (PRESENT, ABSENT, etc.) |
| HRMS | `AttendanceRecord` | Team HRMS (Team 3) | Daily clock-in/clock-out attendance logging record |
| HRMS | `AttendanceSummary` | Team HRMS (Team 3) | Monthly attendance aggregate calculations and working days report |
| HRMS | `Shift` | Team HRMS (Team 3) | Work shift schedule configuration with grace periods and night shift flag |
| HRMS | `OvertimeStatus` | Team HRMS (Team 3) | Overtime approval lifecycle status union |
| HRMS | `OvertimeRecord` | Team HRMS (Team 3) | Overtime hours logged with rate multiplier and approval tracking |
| HRMS | `CorrectionStatus` | Team HRMS (Team 3) | Attendance regularization request status union |
| HRMS | `AttendanceCorrection` | Team HRMS (Team 3) | Attendance regularization request submitted by employee |
| HRMS | `DepartmentStatus` | Team HRMS (Team 3) | Department lifecycle state union (ACTIVE, INACTIVE, ARCHIVED) |
| HRMS | `Department` | Team HRMS (Team 3) | Canonical department structure with hierarchy and cost center mapping |
| HRMS | `SkillProficiency` | Team HRMS (Team 3) | Skill competency level classification (BEGINNER to EXPERT) |
| HRMS | `Skill` | Team HRMS (Team 3) | Employee technical and functional competency entry |
| HRMS | `Certification` | Team HRMS (Team 3) | Professional credential, license, or external certification record |
| HRMS | `EmergencyContact` | Team HRMS (Team 3) | Primary emergency contact person and emergency phone numbers |
| HRMS | `DocumentVerificationStatus` | Team HRMS (Team 3) | Compliance document verification status union |
| HRMS | `EmployeeDocument` | Team HRMS (Team 3) | Official HR compliance and onboarding document attachment |
| HRMS | `Gender` | Team HRMS (Team 3) | Standard gender identity classification union |
| HRMS | `EmploymentType` | Team HRMS (Team 3) | Employment contract classification (FULL_TIME, CONTRACT, INTERN, etc.) |
| HRMS | `EmploymentStatus` | Team HRMS (Team 3) | Employee lifecycle status union (ACTIVE, PROBATION, NOTICE_PERIOD, etc.) |
| HRMS | `Employee` | Team HRMS (Team 3) | Canonical central employee master entity for the enterprise |
| HRMS | `EmployeeReference` | Team HRMS (Team 3) | Lightweight employee display snapshot for cross-domain referencing |
| HRMS | `Course` | Team HRMS (Team 3) | Training catalog course module with duration and training format |
| HRMS | `LearningPlanCourse` | Team HRMS (Team 3) | Individual course progress within an employee training roadmap |
| HRMS | `LearningPlan` | Team HRMS (Team 3) | Curated learning roadmap assigned to an employee with due date |
| HRMS | `Assessment` | Team HRMS (Team 3) | Course assessment examination with passing threshold and attempt limits |
| HRMS | `LearningProgress` | Team HRMS (Team 3) | Employee course enrollment, module completion, and certification status |
| HRMS | `LeaveTypeStatus` | Team HRMS (Team 3) | Leave entitlement policy activation status union |
| HRMS | `LeaveType` | Team HRMS (Team 3) | Company leave category configuration (casual, sick, earned, maternity) |
| HRMS | `LeaveBalance` | Team HRMS (Team 3) | Employee annual leave quota, used balance, and pending allocation |
| HRMS | `LeaveRequestStatus` | Team HRMS (Team 3) | Leave application workflow lifecycle status union |
| HRMS | `LeaveRequest` | Team HRMS (Team 3) | Employee formal time-off request with duration and approval state |
| HRMS | `LeaveApproval` | Team HRMS (Team 3) | Workflow decision log for leave request approval or rejection |
| HRMS | `SalaryComponentType` | Team HRMS (Team 3) | Salary element classification union (EARNING, DEDUCTION) |
| HRMS | `SalaryCalculationType` | Team HRMS (Team 3) | Component computation method (FLAT, PERCENTAGE_OF_BASIC) |
| HRMS | `SalaryComponent` | Team HRMS (Team 3) | Configurable compensation salary pay head definition |
| HRMS | `SalaryStructureComponent` | Team HRMS (Team 3) | Assigned compensation item within a structured salary template |
| HRMS | `SalaryStructure` | Team HRMS (Team 3) | Standardized compensation package template and salary breakdown |
| HRMS | `PayrollRunStatus` | Team HRMS (Team 3) | Batch payroll processing cycle status union |
| HRMS | `PayrollRun` | Team HRMS (Team 3) | Monthly organizational payroll batch execution record |
| HRMS | `PayrollRecord` | Team HRMS (Team 3) | Individual employee disbursement record inside a monthly payroll run |
| HRMS | `PayslipComponent` | Team HRMS (Team 3) | Specific earning or deduction line item printed on a payslip |
| HRMS | `Payslip` | Team HRMS (Team 3) | Official employee monthly payslip document with net pay and account details |
| HRMS | `GoalStatus` | Team HRMS (Team 3) | Performance objective execution status union |
| HRMS | `PerformanceGoal` | Team HRMS (Team 3) | Employee individual KPI goal target and progress tracking |
| HRMS | `KPI` | Team HRMS (Team 3) | Key performance indicator definition, measurement metric, and frequency |
| HRMS | `ReviewStatus` | Team HRMS (Team 3) | Appraisal review workflow lifecycle status union |
| HRMS | `PerformanceReview` | Team HRMS (Team 3) | Formal appraisal review cycle with self-rating and manager rating |
| HRMS | `PerformanceFeedback` | Team HRMS (Team 3) | 360-degree peer or manager continuous performance feedback |
| HRMS | `RequisitionStatus` | Team HRMS (Team 3) | Hiring requisition approval lifecycle status union |
| HRMS | `JobRequisition` | Team HRMS (Team 3) | Departmental manpower hiring request and budget allocation |
| HRMS | `JobPostingStatus` | Team HRMS (Team 3) | Job vacancy advertisement status union |
| HRMS | `JobPosting` | Team HRMS (Team 3) | Public job opening advertisement with description and requirements |
| HRMS | `CandidateStatus` | Team HRMS (Team 3) | Applicant recruitment stage status union |
| HRMS | `Candidate` | Team HRMS (Team 3) | Job applicant profile, resume link, and hiring stage tracker |
| HRMS | `InterviewStatus` | Team HRMS (Team 3) | Interview appointment status union |
| HRMS | `Interview` | Team HRMS (Team 3) | Candidate interview round scheduling, interviewers, and rating score |
| HRMS | `CandidateEvaluation` | Team HRMS (Team 3) | Interviewer scorecard with competency ratings and hiring recommendation |
| CRM | `ActivityStatus` | Team CRM (Team 2) | Sales activity execution status union |
| CRM | `Activity` | Team CRM (Team 2) | Scheduled CRM interaction (task, meeting, call) tied to any CRM entity |
| CRM | `Communication` | Team CRM (Team 2) | Multi-channel communication record (email, SMS, WhatsApp, phone) |
| CRM | `Meeting` | Team CRM (Team 2) | Client meeting event with participants, calendar schedule, and link |
| CRM | `Task` | Team CRM (Team 2) | Assigned CRM follow-up task with due date, priority, and completion status |
| CRM | `Contact` | Team CRM (Team 2) | Individual stakeholder contact person within a customer account |
| CRM | `CustomerType` | Team CRM (Team 2) | Account category classification (INDIVIDUAL, BUSINESS, ENTERPRISE) |
| CRM | `CustomerStatus` | Team CRM (Team 2) | Customer account lifecycle status union |
| CRM | `Customer` | Team CRM (Team 2) | Canonical customer business profile and account master record |
| CRM | `CustomerAddress` | Team CRM (Team 2) | Specific billing, shipping, or branch address linked to customer |
| CRM | `CustomerReference` | Team CRM (Team 2) | Lightweight customer display snapshot for ERP/Finance cross-references |
| CRM | `CrmDashboardMetrics` | Team CRM (Team 2) | Executive CRM operational KPI metrics (pipeline value, win rate, leads) |
| CRM | `PipelineStageMetric` | Team CRM (Team 2) | Sales pipeline stage aggregate summary (count and total deal value) |
| CRM | `LeadSource` | Team CRM (Team 2) | Originating sales channel union (WEBSITE, REFERRAL, EVENT, etc.) |
| CRM | `LeadStatus` | Team CRM (Team 2) | Lead qualification lifecycle status union |
| CRM | `Lead` | Team CRM (Team 2) | Inbound sales prospect record with contact info, owner, and value |
| CRM | `LeadActivity` | Team CRM (Team 2) | Sales touchpoint or engagement note logged against a lead |
| CRM | `OpportunityStage` | Team CRM (Team 2) | Sales pipeline stage progression union (PROSPECTING to WON/LOST) |
| CRM | `OpportunityStatus` | Team CRM (Team 2) | Deal outcome status union (OPEN, WON, LOST, ABANDONED) |
| CRM | `Opportunity` | Team CRM (Team 2) | Sales deal opportunity record with expected value, probability, and stage |
| CRM | `OpportunityActivity` | Team CRM (Team 2) | Engagement event, call log, or stage transition on an opportunity |
| CRM | `PipelineStage` | Team CRM (Team 2) | Configurable step in a sales pipeline with default win probability |
| CRM | `SalesPipeline` | Team CRM (Team 2) | Sales funnel process definition containing ordered stages |
| CRM | `QuoteStatus` | Team CRM (Team 2) | Quotation workflow status union (DRAFT, APPROVED, ACCEPTED, etc.) |
| CRM | `QuotationItem` | Team CRM (Team 2) | Detailed line item inside a sales quote with pricing and tax |
| CRM | `Quotation` | Team CRM (Team 2) | Official sales price quotation sent to prospective customer |
| CRM | `PricingRule` | Team CRM (Team 2) | Automated pricing and tier discount rule based on order value/type |
| CRM | `DiscountRule` | Team CRM (Team 2) | Policy defining maximum allowable discounts and approval thresholds |
| CRM | `QuoteApproval` | Team CRM (Team 2) | Managerial approval or rejection decision logged on a quote |
| CRM | `SupportCategory` | Team CRM (Team 2) | Customer service inquiry category union |
| CRM | `TicketPriority` | Team CRM (Team 2) | Customer ticket severity priority union |
| CRM | `TicketStatus` | Team CRM (Team 2) | Support ticket resolution lifecycle status union |
| CRM | `SupportTicket` | Team CRM (Team 2) | Customer support request and issue tracker with SLA deadline |
| CRM | `SupportComment` | Team CRM (Team 2) | Internal or public discussion note on a support ticket |
| CRM | `SupportAttachment` | Team CRM (Team 2) | File or screenshot attached to a support ticket |
| ERP | `SalesOrderStatus` | Team ERP (Team 1) | ERP customer sales order fulfillment lifecycle status union |
| ERP | `SalesOrderItem` | Team ERP (Team 1) | Line item on a sales order tracking ordered vs fulfilled quantities |
| ERP | `SalesOrder` | Team ERP (Team 1) | Confirmed customer sales order ready for warehouse fulfillment |
| ERP | `FulfillmentStatus` | Team ERP (Team 1) | Warehouse pick-pack-ship fulfillment progress status union |
| ERP | `FulfillmentOrder` | Team ERP (Team 1) | Internal warehouse fulfillment ticket instructing item packing |
| ERP | `Delivery` | Team ERP (Team 1) | Customer shipment delivery dispatch note and courier tracking |
| ERP | `Shipment` | Team ERP (Team 1) | Outbound logistics cargo consignment tracking details |
| ERP | `ReturnReason` | Team ERP (Team 1) | Customer merchandise return reason classification union |
| ERP | `ReturnStatus` | Team ERP (Team 1) | Return Merchandise Authorization (RMA) workflow status union |
| ERP | `ReturnItem` | Team ERP (Team 1) | Item received in an RMA return with condition check and refund value |
| ERP | `Return` | Team ERP (Team 1) | Formal customer sales return authorization and refund request |
| ERP | `InventoryItem` | Team ERP (Team 1) | Real-time stock balance, reserved qty, and cost for SKU at a warehouse |
| ERP | `StockRecord` | Team ERP (Team 1) | Historical stock balance snapshot for audit reconciliation |
| ERP | `Batch` | Team ERP (Team 1) | Production batch/lot tracker with manufacturing and expiration dates |
| ERP | `SerialNumber` | Team ERP (Team 1) | Individual serialized unit tracking for warranty and trace |
| ERP | `StockMovementType` | Team ERP (Team 1) | Inventory movement direction union (RECEIPT, SHIPMENT, TRANSFER, etc.) |
| ERP | `StockMovement` | Team ERP (Team 1) | Detailed inventory transaction audit log recording stock mutations |
| ERP | `StockTransferStatus` | Team ERP (Team 1) | Inter-warehouse stock transfer status union |
| ERP | `StockTransferItem` | Team ERP (Team 1) | Item quantity shipped and received in an inter-warehouse transfer |
| ERP | `StockTransfer` | Team ERP (Team 1) | Inter-warehouse inventory relocation shipment order |
| ERP | `StockAdjustmentReason` | Team ERP (Team 1) | Justification classification for manual stock corrections |
| ERP | `StockAdjustmentItem` | Team ERP (Team 1) | Item quantity variance adjustment with inventory value impact |
| ERP | `StockAdjustment` | Team ERP (Team 1) | Formal inventory write-off or write-in adjustment record |
| ERP | `StockCount` | Team ERP (Team 1) | Physical stock counting audit event (full, cycle, or spot count) |
| ERP | `InventoryReconciliation` | Team ERP (Team 1) | Post-count reconciliation matching book stock against counted stock |
| ERP | `ReorderRule` | Team ERP (Team 1) | Automated reorder replenishment threshold and quantity policy |
| ERP | `PurchaseRequestStatus` | Team ERP (Team 1) | Internal purchase requisition lifecycle status union |
| ERP | `PurchaseRequestItem` | Team ERP (Team 1) | Line item inside an internal material purchase request |
| ERP | `PurchaseRequest` | Team ERP (Team 1) | Departmental purchase requisition submitted for procurement approval |
| ERP | `RFQStatus` | Team ERP (Team 1) | Request for Quotation sourcing status union |
| ERP | `RFQItem` | Team ERP (Team 1) | Product specification line item included in an RFQ tender |
| ERP | `RFQ` | Team ERP (Team 1) | Request for Quotation issued to multiple prospective vendors |
| ERP | `VendorQuoteItem` | Team ERP (Team 1) | Priced quotation item submitted by a bidder in response to an RFQ |
| ERP | `VendorQuote` | Team ERP (Team 1) | Vendor formal bid quotation received in response to an RFQ |
| ERP | `ProductStatus` | Team ERP (Team 1) | Product catalogue lifecycle status union |
| ERP | `ProductUnit` | Team ERP (Team 1) | Inventory unit of measure union (PIECES, BOXES, KG, METERS, etc.) |
| ERP | `ProductDimensions` | Team ERP (Team 1) | Physical dimensions specification container (L x W x H) |
| ERP | `Product` | Team ERP (Team 1) | Canonical item/SKU master record with pricing, tax rate, and reorder levels |
| ERP | `ProductCategory` | Team ERP (Team 1) | Hierarchical product category classification node |
| ERP | `ProductPrice` | Team ERP (Team 1) | Special price list override with currency and effective date range |
| ERP | `ProductReference` | Team ERP (Team 1) | Lightweight SKU display reference for cross-domain orders |
| ERP | `PurchaseOrderStatus` | Team ERP (Team 1) | Purchase order workflow and receiving status union |
| ERP | `PurchaseOrderItem` | Team ERP (Team 1) | Line item on a purchase order tracking quantity, cost, and tax |
| ERP | `PurchaseOrder` | Team ERP (Team 1) | Official purchase order issued to an approved supplier |
| ERP | `VendorCategory` | Team ERP (Team 1) | Supplier classification union (RAW_MATERIALS, LOGISTICS, etc.) |
| ERP | `VendorStatus` | Team ERP (Team 1) | Vendor relationship status union (ACTIVE, BLACKLISTED, etc.) |
| ERP | `VendorContact` | Team ERP (Team 1) | Supplier primary contact person details |
| ERP | `VendorAddress` | Team ERP (Team 1) | Supplier registered or dispatch address alias |
| ERP | `Vendor` | Team ERP (Team 1) | Canonical supplier/vendor business profile and master record |
| ERP | `VendorEvaluation` | Team ERP (Team 1) | Supplier periodic scorecard assessment (quality, delivery, pricing) |
| ERP | `VendorContract` | Team ERP (Team 1) | Legal procurement supply agreement contract with duration and value |
| ERP | `VendorReference` | Team ERP (Team 1) | Lightweight vendor display snapshot for cross-domain purchase orders |
| ERP | `Warehouse` | Team ERP (Team 1) | Physical warehouse storage facility master record and capacity |
| ERP | `WarehouseZone` | Team ERP (Team 1) | Designated functional operational area within a warehouse |
| ERP | `BinLocation` | Team ERP (Team 1) | Specific storage rack/shelf/bin coordinate inside a warehouse zone |
| Finance | `AccountCategory` | Team Finance (Team 4) | Standard financial account classification (ASSET, LIABILITY, etc.) |
| Finance | `ChartOfAccount` | Team Finance (Team 4) | Canonical general ledger account master entry in the chart of accounts |
| Finance | `FinancialPeriod` | Team Finance (Team 4) | Accounting fiscal period (month/quarter/year) with close lock status |
| Finance | `JournalReferenceType` | Team Finance (Team 4) | Source subsystem producing a journal entry |
| Finance | `JournalEntryStatus` | Team Finance (Team 4) | Accounting journal voucher posting status union |
| Finance | `JournalEntryLine` | Team Finance (Team 4) | Debit or credit entry row tied to a GL account and cost center |
| Finance | `JournalEntry` | Team Finance (Team 4) | Balanced double-entry accounting journal transaction voucher |
| Finance | `LedgerEntry` | Team Finance (Team 4) | Posted general ledger transaction with running account balance |
| Finance | `BankAccount` | Team Finance (Team 4) | Corporate bank account record with IFSC code, currency, and balance |
| Finance | `BankTransaction` | Team Finance (Team 4) | Bank statement line transaction with debit/credit and reconciliation flag |
| Finance | `BankReconciliation` | Team Finance (Team 4) | Monthly bank statement reconciliation against general ledger cash balance |
| Finance | `BankReconciliationItem` | Team Finance (Team 4) | Individual transaction match pairing statement line with GL journal line |
| Finance | `Budget` | Team Finance (Team 4) | Departmental or corporate annual fiscal budget master container |
| Finance | `BudgetAllocation` | Team Finance (Team 4) | Budget amount allocated and consumed per GL account and period |
| Finance | `BudgetVariance` | Team Finance (Team 4) | Budget vs actual variance analysis calculation with variance percentage |
| Finance | `ExpenseClaimStatus` | Team Finance (Team 4) | Employee reimbursement expense claim status union |
| Finance | `ExpenseItem` | Team Finance (Team 4) | Itemized expense line with category, receipt URL, and tax deductibility |
| Finance | `ExpenseClaim` | Team Finance (Team 4) | Employee business expense reimbursement submission voucher |
| Finance | `Reimbursement` | Team Finance (Team 4) | Disbursement transaction executing approved employee expense payment |
| Finance | `InvoiceStatus` | Team Finance (Team 4) | Customer invoice payment and aging status union |
| Finance | `CustomerInvoiceLine` | Team Finance (Team 4) | Invoice item row with Indian GST tax rate breakdown (CGST, SGST, IGST) |
| Finance | `CustomerInvoice` | Team Finance (Team 4) | Canonical customer sales invoice with GST tax calculation and aging |
| Finance | `ReceiptStatus` | Team Finance (Team 4) | Customer payment collection clearance status union |
| Finance | `Receipt` | Team Finance (Team 4) | Customer collection receipt voucher clearing accounts receivable |
| Finance | `Collection` | Team Finance (Team 4) | Debt collection follow-up activity record and promise-to-pay commitment |
| Finance | `ReceivableAging` | Team Finance (Team 4) | Customer accounts receivable aging analysis bracket (current to 90+ days) |
| Finance | `PaymentMethod` | Team Finance (Team 4) | Enterprise settlement instrument (BANK_TRANSFER, NEFT_RTGS, UPI, etc.) |
| Finance | `PaymentStatus` | Team Finance (Team 4) | Disbursement transaction clearance status union |
| Finance | `PaymentAllocation` | Team Finance (Team 4) | Amount breakdown applied against a specific customer invoice or vendor bill |
| Finance | `Payment` | Team Finance (Team 4) | Canonical outbound vendor payment or customer refund voucher |
| Finance | `TaxType` | Team Finance (Team 4) | Statutory tax framework classification (GST, TDS, TCS, VAT, CUSTOMS) |
| Finance | `TaxConfiguration` | Team Finance (Team 4) | Tax rate definition linked to general ledger statutory accounts |
| Finance | `TaxRule` | Team Finance (Team 4) | HSN/SAC statutory tax rate lookup rule (CGST, SGST, IGST rates) |
| Finance | `TaxCalculation` | Team Finance (Team 4) | Computed taxable base, split GST taxes, and gross tax amount |
| Finance | `TaxPeriod` | Team Finance (Team 4) | Statutory monthly/quarterly tax filing return period (GSTR-1, GSTR-3B) |
| Finance | `VendorBillStatus` | Team Finance (Team 4) | Accounts payable bill approval and settlement status union |
| Finance | `VendorBillLine` | Team Finance (Team 4) | Expense or inventory line item on a supplier bill with tax rates |
| Finance | `VendorBill` | Team Finance (Team 4) | Canonical supplier accounts payable invoice entered for payment approval |
| Finance | `PayableAging` | Team Finance (Team 4) | Vendor accounts payable aging report bracket (current to 90+ days) |
