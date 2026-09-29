# Three-Team Collaborative Git Workflow

## 1. Simultaneous Parallel Development

Three distinct frontend teams collaborate simultaneously in this monorepo without friction:

- **Team A (ERP Focus):** Works primarily in `src/features/erp/`
- **Team B (CRM Focus):** Works primarily in `src/features/crm/`
- **Team C (HRMS Focus):** Works primarily in `src/features/hrms/`

Because domain folders are completely isolated:
- Team A branches off `dev` into `feature/team-a-erp-*` and merges via PR.
- Team B branches off `dev` into `feature/team-b-crm-*` and merges via PR.
- Team C branches off `dev` into `feature/team-c-hrms-*` and merges via PR.
- Neither team touches another team's domain folder. Zero merge collisions in business logic.

---

## 2. Feature Branch Naming by Team

Branches represent **work, tasks, and domain boundaries** — NOT individual employee names.

### Team A (ERP):
- Format: `feature/team-a-erp-<task>`
- Examples:
  - `feature/team-a-erp-dashboard`
  - `feature/team-a-erp-procurement-orders`
  - `feature/team-a-erp-inventory-view`

### Team B (CRM):
- Format: `feature/team-b-crm-<task>`
- Examples:
  - `feature/team-b-crm-customers`
  - `feature/team-b-crm-pipeline`
  - `feature/team-b-crm-lead-qualification`

### Team C (HRMS):
- Format: `feature/team-c-hrms-<task>`
- Examples:
  - `feature/team-c-hrms-employees`
  - `feature/team-c-hrms-attendance`
  - `feature/team-c-hrms-org-chart`

---

## 3. Pull Request & Review Protocol

1. **Feature Scope PRs:**
   - Authored inside `src/features/erp/`, `crm/`, or `hrms/`.
   - Reviewed and approved by peers within the assigned team.
2. **Shared UI PRs (`src/shared/`):**
   - Requires review from at least two teams to ensure design consistency and reusability.
3. **Core / Architecture PRs (`src/core/`, `src/app/`):**
   - Requires explicit sign-off from the Lead Frontend Architect.
4. **CI Validation:**
   - Both `npm run typecheck` and `npm run build` must pass with 0 errors before merge into `dev`.
