# ERP & Supply Chain Domain (`src/features/erp/`)

## 1. Domain Purpose
Enterprise Resource Planning (ERP) and Supply Chain Management manages procurement, vendor relations, inventory control, warehousing, order fulfillment, and operational analytics.

## 2. Team Ownership & Developer Allocation
- **Team**: Team 1 (7 Developers)
- **Developers**:
  - `ERP-DEV-01`: ERP Dashboard & Overview (`ERPDashboardPage.tsx` / `/erp`)
  - `ERP-DEV-02`: Procurement (`ProcurementPage.tsx` / `/erp/procurement`)
  - `ERP-DEV-03`: Vendor Management (`VendorManagementPage.tsx` / `/erp/vendors`)
  - `ERP-DEV-04`: Inventory (`InventoryPage.tsx` / `/erp/inventory`)
  - `ERP-DEV-05`: Warehouse (`WarehousePage.tsx` / `/erp/warehouse`)
  - `ERP-DEV-06`: Sales Fulfillment / Returns (`FulfillmentPage.tsx` / `/erp/fulfillment`)
  - `ERP-DEV-07`: ERP Reporting / Cross-domain UI (`ERPReportsPage.tsx` / `/erp/reports`)

## 3. Folder Structure
```
src/features/erp/
├── components/   # Domain-specific UI components
├── constants/    # ERP constant values and status codes
├── docs/         # Developer assignment details
├── hooks/        # ERP custom React hooks
├── pages/        # 7 starter pages + domain overview
├── routes/       # erpRoutes.tsx (composed into AppRouter)
├── services/     # Feature services consuming apiClient
├── types/        # Domain TypeScript interfaces
├── utils/        # Domain pure utility functions
├── README.md     # Domain reference
└── index.ts      # Public domain boundary export
```

## 4. Developer Responsibilities
- **Allowed Modifications**:
  - Create and modify files within `src/features/erp/`.
  - Create and maintain mock data and handlers in `src/mock/erp/`.
- **Prohibited Modifications**:
  - Do NOT modify CRM, HRMS, or Finance features.
  - Do NOT modify `src/core/` or `src/shared/` without foundation review.
  - Do NOT invent unapproved backend endpoints or premature business modules.

## 5. Mock & Backend Workflow
1. Author domain types in `src/features/erp/types/`.
2. Define mock responses in `src/mock/erp/` wrapped in standard `ApiResponseEnvelope`.
3. In `services/`, consume `apiClient`.
4. When backend deploys, toggling `apiConfig.ts` to `'REAL'` connects live endpoints with zero page rewrites.
