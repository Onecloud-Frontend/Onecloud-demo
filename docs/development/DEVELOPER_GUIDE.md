# One Enterprise Cloud — Official Common Developer Guide

> **AUTHORITATIVE DIRECTIVE FOR ALL 24 DEVELOPERS:**
> This guide is the official source of architectural, structural, and code standards for **One Enterprise Cloud**.
> Every developer must read, understand, and adhere to this document before committing code.

---

## 1. Project Overview

**One Enterprise Cloud** is a unified enterprise web application built on **React 19**, **TypeScript**, and **Vite**.
It converges four vital business operations into a single cohesive frontend platform:

1. **ERP (Enterprise Resource Planning & Supply Chain)** — Owned by **Team 1** (7 Developers)
2. **CRM (Customer Relationship Management)** — Owned by **Team 2** (7 Developers)
3. **HRMS (Human Resource Management System)** — Owned by **Team 3** (7 Developers)
4. **Finance (General Ledger, Invoicing, Banking & Tax)** — Owned by **Team 4** (3 Developers)

### Demo Project Nature
This repository is an **enterprise demonstration project**. Its objective is to demonstrate enterprise-grade domain separation,
rich UX design, robust TypeScript typing, and seamless cross-domain synergy across 24 parallel developers.

---

## 2. Frontend Architecture

The repository enforces a strict, modular layered architecture. The codebase is organized as follows:

```
src/
├── app/        # Application shell, routing, top-level layout, navigation & configuration
├── core/       # Technical infrastructure: API client, authentication, RBAC, telemetry
├── features/   # Business domains: ERP, CRM, HRMS, and Finance
├── shared/     # Domain-agnostic UI components, design tokens, hooks, formatters & types
├── styles/     # Global theme, CSS custom properties, utility styling
├── assets/     # Static graphics, logos, brand assets
└── tests/      # Automated unit, integration, and architecture contract tests
```

### Layer Responsibilities
- **`app/`**: Contains global layout wrappers (`Sidebar.tsx`, `Header.tsx`), global providers, and central route definitions (`routes.tsx`). Individual developers **must not** modify application shell layouts.
- **`core/`**: Contains centralized technical primitives such as `apiClient`, authentication context, permission guards, and tenant context. No business logic belongs in `core/`.
- **`features/`**: Contains all 4 business capability modules. All business pages, domain components, domain services, and domain types live here.
- **`shared/`**: Contains reusable, domain-agnostic UI components (`Button`, `Card`, `Badge`, `Input`), design tokens, formatting utilities, and shared value objects.

---

## 3. Feature Architecture

All domain work is strictly contained inside the corresponding directory under `src/features/`:

```
src/features/
├── hrms/      # Team HRMS (Team 3)
├── crm/       # Team CRM (Team 2)
├── erp/       # Team ERP (Team 1)
└── finance/   # Team Finance (Team 4)
```

Each business domain owns its business UI pages, domain components, domain services, and business types.
No feature may directly reach into another feature's internal components, hooks, or private utilities.

---

## 4. Canonical Type System

The canonical TypeScript business types are **frozen as the single source of truth** for the enterprise demo.
A total of **205 canonical types** have been established across all domains.

### Strict Rules
1. **Mandatory Reuse:** Developers **MUST** import and consume the canonical types from the domain entry points.
2. **Zero Duplicate Types:** Developers **MUST NOT** create duplicate business interfaces or ad-hoc models.

#### Strictly Prohibited Duplicates:
- ❌ `EmployeeData`, `EmployeeModel`, `EmployeeResponse`, `EmployeeDTO`
- ❌ `CRMCustomer`, `ERPCustomer`, `FinanceCustomer`
- ❌ `ProductData`, `ProductModel`, `ItemRecord`
- ❌ `VendorModel`, `SupplierData`
- ❌ `PurchaseOrderData`, `SalesOrderModel`

#### Canonical Import Examples:
```typescript
// Shared Types
import type { Address, CurrencyCode, Money, DocumentReference } from '@shared/types';

// HRMS Domain Types
import type { Employee, Department, AttendanceRecord, LeaveRequest } from '@features/hrms/types';

// CRM Domain Types
import type { Customer, Contact, Lead, Opportunity, Quotation } from '@features/crm/types';

// ERP Domain Types
import type { Product, Vendor, PurchaseOrder, InventoryItem, SalesOrder } from '@features/erp/types';

// Finance Domain Types
import type { ChartOfAccount, JournalEntry, CustomerInvoice, VendorBill, Payment } from '@features/finance/types';
```

---

## 5. Domain Ownership

To prevent duplication and enforce organizational accountability, business entities have strict single-domain ownership:

| Domain | Canonical Entities Owned |
| :--- | :--- |
| **HRMS** | Employee, Department, Attendance, Leave, Payroll, Recruitment, Performance, Learning, Employee Assets |
| **CRM** | Customer, Contact, Lead, Opportunity, Activity/Communication, Quotation, Support Tickets |
| **ERP** | Product/Item, Vendor, Procurement, Purchase Order, Inventory, Warehouse, Stock, Sales Order, Fulfillment, Delivery, Shipment, Returns |
| **Finance** | Chart of Accounts, Journal Entries, Ledger, Customer Invoices, Vendor Bills, Payments, Receivables, Payables, Banking, Expenses, Budgets, Tax |

### Cross-Domain Reference Rules
If your domain needs an entity owned by another domain:
- **Use string foreign keys:** (e.g. `customerId: string`, `vendorId: string`, `employeeId: string`).
- **Use canonical types or reference types:** Import `Customer`, `Vendor`, `Employee` or lightweight display snapshots (`CustomerReference`, `VendorReference`, `EmployeeReference`).
- **DO NOT redefine the entity inside your feature folder.**

---

## 6. Shared Types

Truly domain-agnostic value objects live exclusively under `src/shared/types/` (`@shared/types`):

- `Address`, `AddressType`, `ContactInfo` — Geographic postal locations and communications.
- `CurrencyCode`, `Money` — ISO currency codes and monetary calculations.
- `DocumentReference`, `DocumentAttachment` — File metadata, URLs, and attachment envelopes.
- `AuditMetadata` — Created/updated audit timestamps.
- `EntityId`, `Nullable<T>`, `SelectOption<T>`, `StatusVariant` — Technical shared primitives.

Developers must reuse these primitives rather than recreating address or money interfaces.

---

## 7. Folder Rules

Every developer must organize their assigned feature code cleanly within their feature directory:

```
src/features/<domain>/
├── pages/         # Top-level routed pages (e.g. ProcurementPage.tsx)
├── components/    # Domain-specific UI components (e.g. components/procurement/)
├── hooks/         # Domain-specific custom React hooks
├── services/      # Domain service clients consuming apiClient
├── utils/         # Domain-specific calculations and formatting
└── types/         # Domain type definitions (re-exported via types/index.ts)
```

**Rule:** Developers must keep changes strictly inside their assigned feature folder and assigned page component.

---

## 8. Page Development Standards

Every page in One Enterprise Cloud must deliver an authentic enterprise experience:

1. **Loading State:** Render structured skeleton loaders or `<LoadingState />` while data loads.
2. **Empty State:** When no records match or a dataset is empty, render `<EmptyState />` with a descriptive call to action.
3. **Error State:** In case of failure, render `<ErrorState />` with a retry trigger.
4. **Populated State:** Display dense, readable data grids or cards with consistent alignment.
5. **Search:** Provide an immediate or debounced text search input over primary identifiers and names.
6. **Filtering:** Support category, status, and date range filters with clear visual reset tags.
7. **Sorting:** Enable column sorting (ascending/descending) on key fields (dates, amounts, codes).
8. **Pagination:** Implement clean page controls (page number, page size, total record count).
9. **Responsive Layout:** Ensure layouts adapt smoothly from desktop (1920x1080) to laptop (1366x768).
10. **Accessibility:** Ensure high contrast, semantic HTML, and descriptive ARIA labels.

---

## 9. Forms

All enterprise data entry forms must follow these standards:
- **Explicit Labels:** Every input must have a clear, descriptive label.
- **Required Indicators:** Mark required inputs visibly (e.g., with an asterisk `*`).
- **Validation:** Validate inputs on blur or submission (e.g. valid email, positive numbers, valid dates).
- **Inline Error Messages:** Display helpful, concise error messages beneath the offending input.
- **Submit State:** Disable submit buttons and show a loading spinner during submission.
- **Edit Mode:** Pre-populate forms faithfully when editing existing records.
- **Success Feedback:** Provide immediate visual confirmation upon successful save or update.

---

## 10. Tables

Data tables are central to enterprise productivity:
- **Column Consistency:** Keep standard column order (Code/ID → Primary Name → Category → Status → Date/Amount → Actions).
- **Status Badges:** Render domain statuses with standardized color badges (e.g. green for `ACTIVE`/`APPROVED`, red for `REJECTED`, yellow for `PENDING`).
- **Numeric Alignment:** Align amounts and quantities to the right; align text to the left.
- **Row Actions:** Group actions (View, Edit, Delete, Approve) in a dedicated action column.
- **Overflow Handling:** Enable horizontal scrolling for wide tables without breaking page layout.

---

## 11. Dashboard Rules

Executive dashboard pages (`ERPDashboardPage`, `CRMDashboardPage`, etc.) must:
- Represent **authentic, meaningful operational information** (e.g. Total Open PO Value, Conversion Rate, Headcount, Net Receivables).
- Avoid decorative, meaningless charts or arbitrary mock graphs.
- Group metrics logically into summary KPI metric cards, recent transaction tables, and action items.

---

## 12. Temporary Demo Data

Until centralized mock services are introduced:
- Developers may define temporary demo datasets inside their page or component.
- **MANDATORY:** All demo data **MUST** be explicitly typed using the canonical types:

```typescript
// Correct
const mockEmployees: Employee[] = [
  {
    id: 'emp-001',
    employeeCode: 'EMP-1001',
    firstName: 'Aarav',
    lastName: 'Sharma',
    email: 'aarav.sharma@oneenterprise.demo',
    // ... all canonical fields
  }
];

// Strictly Prohibited
const mockEmployees = [ { id: 1, name: 'Aarav' } ]; // UNTYPED
```

- **Do NOT** create custom mock architectures or bypass canonical types.

---

## 13. Cross-Domain Usage

When developing a feature that requires information from another business domain:
- **Example:** Finance managing Customer Invoices requires customer profile information.
  - Finance **imports** `Customer` from `@features/crm/types`.
  - Finance **does not** create `FinanceCustomer` or modify CRM customer fields.
- **Example:** ERP Purchase Orders requires vendor and employee approver details.
  - ERP uses canonical `Vendor` (ERP-owned) and `Employee` (HRMS-owned).

---

## 14. Backend Independence

- This is a frontend demo application. Developers **do not need backend APIs** to complete their UI implementation.
- Use temporary typed demo data matching canonical types.
- **Do not invent fake backend endpoints** or attempt to connect to nonexistent backend servers.
- **Do not modify backend code** or files outside the frontend project.

---

## 15. Routing

All route paths have been pre-configured in `src/app/router/routes.tsx` and `navigationConfig.ts`.
- Work strictly inside the page component mapped to your assigned route.
- **Do not create alternative routers** or reconfigure global routing trees.

---

## 16. UI System

Always reuse the existing design foundation:
- Shared components: `Button`, `Card`, `Badge`, `Input`, `PageHeader`, `LoadingState`, `EmptyState`, `ErrorState` from `@shared/components`.
- Theme colors and tokens: `colors.ts`.
- **Do not install alternative UI libraries** (e.g. TailwindCSS, MUI, AntD, Chakra UI). Use Vanilla CSS with design tokens.

---

## 17. Code Quality

The following are **strictly prohibited** in pull requests:
- ❌ Any use of the `any` type.
- ❌ `// @ts-ignore` or `// @ts-nocheck`.
- ❌ Duplicate interfaces or ad-hoc data contracts.
- ❌ Unused imports, unused variables, and dead code.
- ❌ `console.log` statements left in production code.
- ❌ Unnecessary third-party npm packages.

---

## 18. Git Workflow

Follow the official Git branching strategy:
- `main` — Production release branch (protected).
- `dev` — Integrated staging branch (protected).
- `feature/<domain>-<module>` — Developer working branches.

### Recommended Branch Names:
- `feature/erp-procurement`
- `feature/crm-leads`
- `feature/hrms-attendance`
- `feature/finance-gl-reporting`

**Rule:** Never commit or push directly to `main` or `dev`.

---

## 19. Commit Convention

Use clear Conventional Commits:

```
feat(erp): implement procurement requisition table and RFQ drawer
feat(crm): implement lead status progression and filter panel
feat(hrms): implement attendance logging and shift schedule view
feat(finance): implement customer invoice grid and GST breakdown
fix(crm): correct probability calculation on opportunity form
```

---

## 20. Validation Before Pull Request

Every developer must run the following checks locally before opening a Pull Request:

```powershell
# 1. Typecheck validation
npm.cmd run typecheck

# 2. Production build validation
npm.cmd run build
```

Both commands **must pass with zero errors** and zero warnings.

---

## 21. Scope Rules

To preserve 24-developer harmony:
1. **Never modify another developer's page or feature.**
2. **Never modify application shell layouts or navigation configs.**
3. **Never alter canonical types without architectural review.**
4. **Never create global state management singletons (e.g. Redux, MobX).**
5. **Never install unapproved external dependencies.**

---

## 22. Completion Checklist

Before requesting a PR review, verify:

- [ ] Assigned page component implemented in your assigned feature directory.
- [ ] Canonical TypeScript types imported and consumed.
- [ ] Zero duplicate interfaces created.
- [ ] Responsive design verified (desktop and laptop resolutions).
- [ ] Loading state implemented with skeletons or spinner.
- [ ] Empty state implemented with helpful messaging.
- [ ] Error state implemented with retry option.
- [ ] Form validation implemented with inline error feedback.
- [ ] Search and filtering implemented.
- [ ] Accessibility: semantic tags, contrast, and aria labels verified.
- [ ] TypeScript check (`npm.cmd run typecheck`) passes with 0 errors.
- [ ] Production build (`npm.cmd run build`) passes with 0 errors.
- [ ] Zero unrelated files modified.
- [ ] Descriptive feature branch and conventional commits created.
- [ ] Ready for architectural code review.