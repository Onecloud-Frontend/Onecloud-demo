# CRM Domain (`src/features/crm/`)

## 1. Domain Purpose
Customer Relationship Management (CRM) handles lead ingestion and scoring, deal opportunity tracking, customer 360 directories, sales quotation generation, customer support ticketing, and sales funnel analytics.

## 2. Team Ownership & Developer Allocation
- **Team**: Team 2 (7 Developers)
- **Developers**:
  - `CRM-DEV-01`: CRM Dashboard & Overview (`CRMDashboardPage.tsx` / `/crm`)
  - `CRM-DEV-02`: Lead Management (`LeadManagementPage.tsx` / `/crm/leads`)
  - `CRM-DEV-03`: Opportunity (`OpportunityPage.tsx` / `/crm/opportunities`)
  - `CRM-DEV-04`: Customer / Contact (`CustomerContactPage.tsx` / `/crm/customers`)
  - `CRM-DEV-05`: Quotation / Sales (`QuotationSalesPage.tsx` / `/crm/quotations`)
  - `CRM-DEV-06`: Support / Customer Portal (`SupportPortalPage.tsx` / `/crm/support`)
  - `CRM-DEV-07`: CRM Reporting / Analytics (`CRMReportsPage.tsx` / `/crm/reports`)

## 3. Folder Structure
```
src/features/crm/
├── components/   # Domain-specific UI components
├── constants/    # CRM constant values and status codes
├── docs/         # Developer assignment details
├── hooks/        # CRM custom React hooks
├── pages/        # 7 starter pages + domain overview
├── routes/       # crmRoutes.tsx (composed into AppRouter)
├── services/     # Feature services consuming apiClient
├── types/        # Domain TypeScript interfaces
├── utils/        # Domain pure utility functions
├── README.md     # Domain reference
└── index.ts      # Public domain boundary export
```

## 4. Developer Responsibilities
- **Allowed Modifications**:
  - Create and modify files within `src/features/crm/`.
  - Create and maintain mock data and handlers in `src/mock/crm/`.
- **Prohibited Modifications**:
  - Do NOT modify ERP, HRMS, or Finance features.
  - Do NOT modify `src/core/` or `src/shared/` without foundation review.
  - Do NOT make direct `fetch` or `axios` calls.

## 5. Mock & Backend Workflow
1. Author domain types in `src/features/crm/types/`.
2. Define mock responses in `src/mock/crm/` wrapped in standard `ApiResponseEnvelope`.
3. In `services/`, consume `apiClient`.
4. When backend deploys, toggling `apiConfig.ts` to `'REAL'` connects live endpoints with zero page rewrites.
