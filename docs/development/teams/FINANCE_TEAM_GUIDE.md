# Finance Team Developer Guide — Team 4 (Financial Management & Compliance)

> **AUTHORITATIVE DIRECTIVE FOR FIN-DEV-01 THROUGH FIN-DEV-03:**
> This guide outlines the operational boundaries, canonical contracts, developer allocations, and implementation rules for Team 4.

---

## 1. Finance Purpose

The **Finance & Accounting** domain governs enterprise capital, compliance, and financial health: maintaining the master Chart of Accounts, balancing double-entry journal vouchers, billing customers and collecting receivables, approving and disbursing supplier payables, reconciling bank statements, processing employee expense reimbursements, budgeting cost centers, and complying with Indian statutory GST rules.

---

## 2. Finance Feature Structure

All Finance development is strictly isolated inside `src/features/finance/`:

```
src/features/finance/
├── pages/                 # Top-level routed pages for the 3 Finance capabilities
│   ├── GLReportingPage.tsx          # FIN-DEV-01
│   ├── APARBankingPage.tsx          # FIN-DEV-02
│   └── ExpensesBudgetsTaxPage.tsx   # FIN-DEV-03
├── components/            # Domain components partitioned by capability
│   ├── accounting/
│   ├── apar/
│   ├── banking/
│   ├── expenses/
│   ├── budgets/
│   └── tax/
├── hooks/                 # Custom React hooks (e.g. useJournalBalance, useAgingSummary)
├── services/              # Domain service clients consuming apiClient
├── types/                 # Canonical Finance TypeScript types (39 types)
└── utils/                 # Indian GST computations (CGST/SGST/IGST), debit/credit balance checkers
```

---

## 3. Finance Canonical Types (39 Types)

Finance developers must import all domain types directly from `@features/finance/types`:

```typescript
import type {
  ChartOfAccount, AccountCategory, FinancialPeriod, JournalEntry, JournalEntryLine, LedgerEntry,
  CustomerInvoice, CustomerInvoiceLine, InvoiceStatus, Receipt, Collection, ReceivableAging,
  VendorBill, VendorBillLine, VendorBillStatus, PayableAging,
  Payment, PaymentMethod, PaymentStatus, PaymentAllocation,
  BankAccount, BankTransaction, BankReconciliation, BankReconciliationItem,
  ExpenseClaim, ExpenseItem, Reimbursement, ExpenseClaimStatus,
  Budget, BudgetAllocation, BudgetVariance,
  TaxConfiguration, TaxRule, TaxCalculation, TaxPeriod
} from '@features/finance/types';
```

---

## 4. Finance Domain Ownership

Team 4 (Finance) is the **exclusive canonical owner** of:
- **General Ledger & Accounting:** Chart of Accounts, fiscal periods, double-entry journal vouchers, general ledger audit entries.
- **Accounts Receivable:** Customer invoices, line-level Indian GST tax rates, payment receipts, collection notes, receivable aging.
- **Accounts Payable:** Supplier vendor bills, expense/PO line items, payable aging analysis.
- **Payments & Banking:** Corporate bank accounts, statement transactions, bank reconciliations, vendor/customer disbursement vouchers.
- **Expenses & Reimbursements:** Employee business expense claims, expense item receipts, reimbursement payment transactions.
- **Budgets:** Corporate fiscal budgets, departmental account allocations, budget-vs-actual variance calculations.
- **Tax Compliance:** Statutory tax configurations (GST, TDS), HSN/SAC statutory tax rules, monthly tax filing periods.

---

## 5. Finance Cross-Domain Dependencies

### Entities Consumed by Finance (Owned by other teams):
- **Customer** (Owned by CRM): Referenced in `CustomerInvoice.customerId`, `Receipt.customerId`, and `ReceivableAging.customerId`.
- **Vendor** (Owned by ERP): Referenced in `VendorBill.vendorId` and `PayableAging.vendorId`.
- **PurchaseOrder** (Owned by ERP): Referenced in `VendorBill.purchaseOrderId` for three-way invoice matching.
- **SalesOrder** (Owned by ERP): Referenced in `CustomerInvoice.salesOrderId` for sales fulfillment billing.
- **Employee** (Owned by HRMS): Referenced in `ExpenseClaim.employeeId` and reimbursement payees.
- **Department** (Owned by HRMS): Referenced in `Budget.departmentId` for cost-center allocations.

**Rule:** Finance must reference these entities using canonical types or string IDs. Finance must never redefine `FinanceCustomer` or `FinanceVendor`.

---

## 6. Finance Navigation

All 3 Finance capabilities are accessible from the navigation sidebar under the **Finance Domain Accordion**:
- `/finance` — Finance Domain Overview
- `/finance/general-ledger` — General Ledger, COA & Journal Vouchers
- `/finance/ap-ar-banking` — AP Bills, AR Invoices, Payments & Banking
- `/finance/expenses-budgets-tax` — Expense Claims, Departmental Budgets & Tax

---

## 7. Developer Allocations & Detailed Responsibilities

### FIN-DEV-01: General Ledger & Reporting
- **Route:** `/finance/general-ledger`
- **Primary Page:** `GLReportingPage.tsx`
- **Canonical Types:** `ChartOfAccount`, `AccountCategory`, `FinancialPeriod`, `JournalEntry`, `JournalEntryLine`, `LedgerEntry`
- **What You Own:** Master chart of accounts hierarchical tree, double-entry journal entry voucher authoring drawer (with real-time total debit == total credit validation), fiscal period closing status, running general ledger view.
- **What You Must NOT Modify:** Customer invoice generation or vendor bill approval.

### FIN-DEV-02: Accounts Payable, Accounts Receivable & Banking
- **Route:** `/finance/ap-ar-banking`
- **Primary Page:** `APARBankingPage.tsx`
- **Canonical Types:** `CustomerInvoice`, `CustomerInvoiceLine`, `Receipt`, `Collection`, `ReceivableAging`, `VendorBill`, `VendorBillLine`, `PayableAging`, `Payment`, `PaymentAllocation`, `BankAccount`, `BankTransaction`, `BankReconciliation`, `BankReconciliationItem`
- **What You Own:** Customer invoice grid with GST breakdown (CGST/SGST/IGST), accounts receivable aging bracket table (Current, 1-30, 31-60, 61-90, 90+ days), vendor bill matching against POs, payment disbursement vouchers, bank statement transaction viewer with two-way reconciliation matcher.
- **What You Must NOT Modify:** Expense claim policies or employee master records.

### FIN-DEV-03: Expenses, Budgets & Tax
- **Route:** `/finance/expenses-budgets-tax`
- **Primary Page:** `ExpensesBudgetsTaxPage.tsx`
- **Canonical Types:** `ExpenseClaim`, `ExpenseItem`, `Reimbursement`, `Budget`, `BudgetAllocation`, `BudgetVariance`, `TaxConfiguration`, `TaxRule`, `TaxCalculation`, `TaxPeriod`, `Employee`, `Department`
- **What You Own:** Employee business expense reimbursement submission and approval queue, departmental budget allocation matrix with variance indicator (Green = Under budget, Red = Over budget), Indian GST statutory tax configuration (CGST, SGST, IGST rates by HSN/SAC code), monthly tax period filing monitor.
- **What You Must NOT Modify:** Chart of accounts master codes or bank account balances.

---

## 8. Intra-Team Dependencies (Between Finance Developers)

- **FIN-DEV-01 (GL) & FIN-DEV-02 (AP/AR/Banking):** Every invoice, bill, payment, and receipt creates underlying GL journal entries mapped to chart of accounts IDs.
- **FIN-DEV-01 (GL) & FIN-DEV-03 (Budgets/Tax):** Budget allocations and tax configurations map directly to `glAccountId` defined in the chart of accounts.
- **FIN-DEV-02 (Payments) & FIN-DEV-03 (Expenses):** Approved employee expense claims trigger disbursement payments via bank accounts managed by FIN-DEV-02.

---

## 9. Finance-Specific UI Standards

- **Balanced Voucher Guard:** In journal entry forms, disable the "Post Journal" button unless `totalDebit === totalCredit` and both are greater than 0.
- **Indian GST Layout:** In invoices and bills, clearly display subtotal, breakdown columns for CGST, SGST, and IGST, and the bold grand total.
- **Aging Analysis Table:** Format aging tables with standard debt brackets (Current, 1-30 Days, 31-60 Days, 61-90 Days, 90+ Days) with highlighted overdue cells.
- **Reconciliation Matcher:** Use a side-by-side reconciliation tool comparing statement lines against ledger transactions with matching checkboxes.

---

## 10. Finance Completion Checklist

- [ ] Assigned page component renders without errors.
- [ ] Canonical Finance types imported from `@features/finance/types`.
- [ ] Zero duplicate interfaces created.
- [ ] Loading skeleton, empty state, and error handling implemented.
- [ ] Search by invoice number, bill reference, or account code functional.
- [ ] Date range and status filtering functional.
- [ ] `npm.cmd run typecheck` passes with 0 errors.
- [ ] `npm.cmd run build` passes with 0 errors.
- [ ] Feature branch `feature/finance-<module>` created with conventional commits.