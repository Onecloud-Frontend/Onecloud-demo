# CRM Team Developer Guide — Team 2 (Customer Relationship Management)

> **AUTHORITATIVE DIRECTIVE FOR CRM-DEV-01 THROUGH CRM-DEV-07:**
> This guide outlines the operational boundaries, canonical contracts, developer allocations, and implementation rules for Team 2.

---

## 1. CRM Purpose

The **Customer Relationship Management (CRM)** domain drives the complete revenue and customer lifecycle: capturing and qualifying inbound leads, managing sales pipelines and forecasting deal value, nurturing client contacts, generating formal sales quotes, and resolving customer support tickets.

---

## 2. CRM Feature Structure

All CRM development is strictly isolated inside `src/features/crm/`:

```
src/features/crm/
├── pages/                 # Top-level routed pages for the 7 CRM capabilities
│   ├── CRMDashboardPage.tsx     # CRM-DEV-01
│   ├── LeadManagementPage.tsx   # CRM-DEV-02
│   ├── OpportunityPage.tsx      # CRM-DEV-03
│   ├── CustomerContactPage.tsx  # CRM-DEV-04
│   ├── QuotationSalesPage.tsx   # CRM-DEV-05
│   ├── SupportPortalPage.tsx    # CRM-DEV-06
│   └── CRMReportsPage.tsx       # CRM-DEV-07
├── components/            # Domain components partitioned by capability
│   ├── dashboard/
│   ├── leads/
│   ├── opportunities/
│   ├── customers/
│   ├── quotations/
│   └── support/
├── hooks/                 # Custom React hooks (e.g. usePipelineForecast, useLeadStatus)
├── services/              # Domain service clients consuming apiClient
├── types/                 # Canonical CRM TypeScript types (35 types)
└── utils/                 # Probability weighting, quote total calculations, stage helpers
```

---

## 3. CRM Canonical Types (35 Types)

CRM developers must import all domain types directly from `@features/crm/types`:

```typescript
import type {
  Lead, LeadSource, LeadStatus, LeadActivity,
  Customer, CustomerType, CustomerStatus, CustomerAddress, CustomerReference, Contact,
  Opportunity, OpportunityStage, OpportunityStatus, OpportunityActivity,
  Activity, ActivityStatus, Communication, Meeting, Task,
  SalesPipeline, PipelineStage,
  Quotation, QuotationItem, QuoteStatus, PricingRule, DiscountRule, QuoteApproval,
  SupportTicket, SupportComment, SupportAttachment, SupportCategory, TicketPriority, TicketStatus,
  CrmDashboardMetrics, PipelineStageMetric
} from '@features/crm/types';
```

---

## 4. CRM Domain Ownership

Team 2 (CRM) is the **exclusive canonical owner** of:
- **Leads:** Prospect records, sources, qualification status, touchpoint activities.
- **Customers & Contacts:** Master customer account profiles, multiple contacts per customer, billing/shipping addresses.
- **Opportunities:** Sales deals, pipeline stages, expected revenue, win/loss tracking.
- **Activities & Communications:** Logged calls, sent emails, client meetings, follow-up tasks.
- **Sales Pipelines:** Configurable pipeline funnels and stage probability weights.
- **Quotations:** Sales price quotes, quote line items, tiered pricing and discount approval rules.
- **Customer Support:** Support tickets, comment threads, SLA tracking, resolution notes.

---

## 5. CRM Cross-Domain Dependencies

### Entities Consumed by CRM (Owned by other teams):
- **Product** (Owned by ERP): Referenced in `QuotationItem.productId` to populate item descriptions and unit prices.
- **Employee** (Owned by HRMS): Referenced as sales representative (`ownerId: string`) and support agent (`assignedTo: string`).

### CRM Entities Consumed by Other Teams:
- **Customer**: Primary enterprise customer master consumed by ERP (`SalesOrder.customerId`) and Finance (`CustomerInvoice.customerId`).
- **Contact**: Customer contact stakeholder consumed by Finance for invoice dispatch and HRMS for emergency contact references.
- **Quotation**: Consumed by ERP for converting accepted quotations into sales fulfillment orders.

---

## 6. CRM Navigation

All 7 CRM capabilities are accessible from the navigation sidebar under the **CRM Domain Accordion**:
- `/crm` (or `/crm/dashboard`) — Executive Sales & Pipeline Dashboard
- `/crm/leads` — Lead Capture, Scoring & Qualification
- `/crm/opportunities` — Deal Pipeline & Stage Progression
- `/crm/customers` — Customer 360 & Stakeholder Contacts
- `/crm/quotations` — Quotations, Price Rules & Approvals
- `/crm/support` — Customer Service Ticket Portal
- `/crm/reports` — Sales Analytics & Performance Leaderboards

---

## 7. Developer Allocations & Detailed Responsibilities

### CRM-DEV-01: CRM Dashboard & Overview
- **Route:** `/crm` (and `/crm/dashboard`)
- **Primary Page:** `CRMDashboardPage.tsx`
- **Canonical Types:** `CrmDashboardMetrics`, `PipelineStageMetric`, `Lead`, `Opportunity`, `Customer`, `SupportTicket`
- **What You Own:** Executive pipeline overview widgets (Total Pipeline Value, Weighted Forecast, Win Rate %, Active Deals), stage funnel breakdown bar, recent won deals, open support SLA summary.
- **What You Must NOT Modify:** Lead qualification forms, quotation authoring, or customer contact directories.

### CRM-DEV-02: Leads
- **Route:** `/crm/leads`
- **Primary Page:** `LeadManagementPage.tsx`
- **Canonical Types:** `Lead`, `LeadSource`, `LeadStatus`, `LeadActivity`
- **What You Own:** Lead capture intake form, status progression workflow (`NEW` → `CONTACTED` → `QUALIFIED` → `CONVERTED`), activity logging panel (calls, emails, notes), one-click lead-to-opportunity conversion drawer.
- **What You Must NOT Modify:** Existing customer profiles or sales quotations.

### CRM-DEV-03: Opportunities
- **Route:** `/crm/opportunities`
- **Primary Page:** `OpportunityPage.tsx`
- **Canonical Types:** `Opportunity`, `OpportunityStage`, `OpportunityStatus`, `OpportunityActivity`, `Customer`, `Contact`, `SalesPipeline`, `PipelineStage`
- **What You Own:** Opportunity list/kanban view, stage drag/drop progression, expected close date scheduling, weighted value computation, win/loss reason modal with competitor details.
- **What You Must NOT Modify:** Support ticket queues or customer billing address forms.

### CRM-DEV-04: Customers / Contacts
- **Route:** `/crm/customers`
- **Primary Page:** `CustomerContactPage.tsx`
- **Canonical Types:** `Customer`, `CustomerType`, `CustomerStatus`, `CustomerAddress`, `CustomerReference`, `Contact`
- **What You Own:** Customer 360 directory, enterprise/business account profile editor, multi-contact management table (Primary contact toggle), GSTIN/PAN validation, billing & shipping address management.
- **What You Must NOT Modify:** Opportunity stage configurations or sales quotes.

### CRM-DEV-05: Quotations / Sales
- **Route:** `/crm/quotations`
- **Primary Page:** `QuotationSalesPage.tsx`
- **Canonical Types:** `Quotation`, `QuotationItem`, `QuoteStatus`, `PricingRule`, `DiscountRule`, `QuoteApproval`, `Customer`, `Contact`, `Product`
- **What You Own:** Quotation creation wizard, dynamic product line items with auto-calculated discounts and GST, pricing rule evaluator, quote approval workflow (`DRAFT` → `PENDING_APPROVAL` → `APPROVED` → `SENT`), quote PDF preview.
- **What You Must NOT Modify:** ERP sales order warehouse fulfillment queues.

### CRM-DEV-06: Support / Customer Portal
- **Route:** `/crm/support`
- **Primary Page:** `SupportPortalPage.tsx`
- **Canonical Types:** `SupportTicket`, `SupportComment`, `SupportAttachment`, `SupportCategory`, `TicketPriority`, `TicketStatus`, `Customer`, `Contact`
- **What You Own:** Customer support ticket queue, SLA countdown badge, category/priority filter, conversation comment thread (public vs internal notes), attachment preview modal.
- **What You Must NOT Modify:** Opportunity forecasting or lead intake forms.

### CRM-DEV-07: CRM Reports
- **Route:** `/crm/reports`
- **Primary Page:** `CRMReportsPage.tsx`
- **Canonical Types:** `Lead`, `Opportunity`, `Customer`, `SupportTicket`, `Quotation`
- **What You Own:** Sales rep conversion leaderboard, pipeline velocity metrics, customer churn risk analysis, support ticket resolution time compliance reports.
- **What You Must NOT Modify:** Core customer records or transaction creation forms.

---

## 8. Intra-Team Dependencies (Between CRM Developers)

- **CRM-DEV-02 (Leads) & CRM-DEV-04 (Customers):** Converted qualified leads generate a new `Customer` record managed by CRM-DEV-04.
- **CRM-DEV-03 (Opportunities) & CRM-DEV-04 (Customers):** Opportunities require selecting a valid `customerId` and optional `contactId`.
- **CRM-DEV-05 (Quotations) & CRM-DEV-03 (Opportunities):** Quotations link directly to an existing `opportunityId` and `customerId`.
- **CRM-DEV-06 (Support) & CRM-DEV-04 (Customers):** Tickets are logged against an established `customerId`.
- **CRM-DEV-01 (Dashboard) & CRM-DEV-07 (Reports):** Aggregate and visualize data produced by leads, opportunities, quotes, and tickets.

---

## 9. CRM-Specific UI Rules

- **Pipeline Stage Funnels:** Use visual stage progression trackers (`PROSPECTING` → `QUALIFICATION` → `PROPOSAL` → `NEGOTIATION` → `CLOSED_WON`).
- **Status Badges:**
  - `CLOSED_WON` / `QUALIFIED` / `ACCEPTED` / `RESOLVED` → Success (Green)
  - `PROPOSAL_QUOTATION` / `PENDING_APPROVAL` / `IN_PROGRESS` → Warning (Amber)
  - `CLOSED_LOST` / `UNQUALIFIED` / `REJECTED` → Error (Red)
  - `NEW` / `DRAFT` / `OPEN` → Info/Neutral (Blue/Gray)
- **Line Item Calculator:** In quotation creation, update line totals, subtotal, GST amounts, and final amount dynamically as quantities change.

---

## 10. CRM Completion Checklist

- [ ] Assigned page component renders without errors.
- [ ] Canonical CRM types imported from `@features/crm/types`.
- [ ] Zero duplicate interfaces created.
- [ ] Loading skeleton, empty state, and error handling implemented.
- [ ] Search by customer name, lead title, or ticket number functional.
- [ ] Stage and priority filtering functional.
- [ ] `npm.cmd run typecheck` passes with 0 errors.
- [ ] `npm.cmd run build` passes with 0 errors.
- [ ] Feature branch `feature/crm-<module>` created with conventional commits.