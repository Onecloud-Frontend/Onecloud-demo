# One Enterprise Cloud — Developer Quickstart Guide (5-10 Minutes)

Welcome to One Enterprise Cloud frontend development! Follow this guide to understand your assignment, set up your branch, and begin implementing your assigned functional slice.

---

## Step 1: Identify Your Assignment

Look up your Developer ID in the master matrix [DEVELOPER_ASSIGNMENTS.md](./DEVELOPER_ASSIGNMENTS.md) and review your team guide:
- **Team 1 (ERP)**: `ERP-DEV-01` through `ERP-DEV-07` → [ERP_TEAM_GUIDE.md](./teams/ERP_TEAM_GUIDE.md)
- **Team 2 (CRM)**: `CRM-DEV-01` through `CRM-DEV-07` → [CRM_TEAM_GUIDE.md](./teams/CRM_TEAM_GUIDE.md)
- **Team 3 (HRMS)**: `HRMS-DEV-01` through `HRMS-DEV-07` → [HRMS_TEAM_GUIDE.md](./teams/HRMS_TEAM_GUIDE.md)
- **Team 4 (Finance)**: `FIN-DEV-01` through `FIN-DEV-03` → [FINANCE_TEAM_GUIDE.md](./teams/FINANCE_TEAM_GUIDE.md)

Read the common project standards in [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md).

---

## Step 2: Create Your Task Feature Branch

Branch naming follows task conventions (never developer personal names):

```bash
# Ensure you are up to date on dev
git checkout dev
git pull

# Example: ERP-DEV-02 working on Procurement
git checkout -b feature/erp-procurement

# Example: CRM-DEV-02 working on Lead Management
git checkout -b feature/crm-leads

# Example: HRMS-DEV-03 working on Leave Management
git checkout -b feature/hrms-leave

# Example: FIN-DEV-02 working on AP/AR & Banking
git checkout -b feature/finance-ap-ar
```

---

## Step 3: Run the Application Locally

```powershell
# Start Vite development server
npm.cmd run dev

# Run TypeScript checks
npm.cmd run typecheck
```

Open [http://localhost:3000](http://localhost:3000). Navigate to your assigned business module in the sidebar, and confirm your starter workspace renders.

---

## Step 4: The 8-Step Development Workflow

1. **Read Assigned Responsibilities**: Review your row in [DEVELOPER_ASSIGNMENTS.md](./DEVELOPER_ASSIGNMENTS.md).
2. **Import Canonical Types**: Import approved canonical TypeScript types from `@features/<domain>/types` or `@shared/types`. Do NOT create duplicate types.
3. **Open Your Starter Page**: Located in `src/features/<domain>/pages/<YourPage>.tsx`.
4. **Build UI Components**: Create modular, focused components in `src/features/<domain>/components/<module>/`.
5. **Implement Enterprise States**: Incorporate `LoadingState`, `EmptyState`, and `ErrorState` from `@shared/components`.
6. **Add Form & Table Interactivity**: Implement clean form validation, search inputs, status badges, and table column sorting.
7. **Verify Locally**: Run `npm.cmd run typecheck` and `npm.cmd run build` to ensure zero errors and zero warnings.
8. **Open Pull Request**: Push your branch and open a PR targeting `dev` following the checklist in [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md).

---

## Step 5: Rules & Boundary Guidelines

> [!IMPORTANT]
> **Strict Cross-Feature Isolation**
> - You may ONLY modify files in your assigned page and components.
> - NEVER modify another developer's page or another team's feature folder.
> - NEVER create duplicate types (`CRMCustomer`, `EmployeeDTO`, `ProductData`, etc.). Always reuse canonical types.
> - NEVER introduce `any`, `@ts-ignore`, or unapproved npm packages.