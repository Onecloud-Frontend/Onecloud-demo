# Finance Domain (`src/features/finance/`)

## 1. Domain Purpose
Finance governs general ledger accounting, chart of accounts, journal entries, accounts payable (AP) vendor bills, accounts receivable (AR) invoicing, bank reconciliations, employee expense claim approvals, departmental budgets, and statutory tax filings.

## 2. Team Ownership & Developer Allocation
- **Team**: Team 4 (3 Developers)
- **Developers**:
  - `FIN-DEV-01`: General Ledger + Financial Reporting (`GLReportingPage.tsx` / `/finance/general-ledger`)
  - `FIN-DEV-02`: Accounts Payable + Accounts Receivable + Banking (`APARBankingPage.tsx` / `/finance/ap-ar-banking`)
  - `FIN-DEV-03`: Expenses + Budgets + Taxation (`ExpensesBudgetsTaxPage.tsx` / `/finance/expenses-budgets-tax`)

## 3. Folder Structure
```
src/features/finance/
├── components/   # Domain-specific UI components
├── constants/    # Finance constant values and status codes
├── docs/         # Developer assignment details
├── hooks/        # Finance custom React hooks
├── pages/        # 3 starter pages + domain overview
├── routes/       # financeRoutes.tsx (composed into AppRouter)
├── services/     # Feature services consuming apiClient
├── types/        # Domain TypeScript interfaces
├── utils/        # Domain pure utility functions
├── README.md     # Domain reference
└── index.ts      # Public domain boundary export
```

## 4. Developer Responsibilities
- **Allowed Modifications**:
  - Create and modify files within `src/features/finance/`.
  - Create and maintain mock data and handlers in `src/mock/finance/`.
- **Prohibited Modifications**:
  - Do NOT modify ERP, CRM, or HRMS features.
  - Do NOT modify `src/core/` or `src/shared/` without foundation review.
  - Do NOT make direct `fetch` or `axios` calls.

## 5. Mock & Backend Workflow
1. Author domain types in `src/features/finance/types/`.
2. Define mock responses in `src/mock/finance/` wrapped in standard `ApiResponseEnvelope`.
3. In `services/`, consume `apiClient`.
4. When backend deploys, toggling `apiConfig.ts` to `'REAL'` connects live endpoints with zero page rewrites.
