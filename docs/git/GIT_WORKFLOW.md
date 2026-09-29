# One Enterprise Cloud — Enterprise Git Workflow & Branching Standards

> **AUTHORITATIVE DIRECTIVE FOR ALL 24 DEVELOPERS:**
> This document establishes the official Git branching strategy, safety invariants, commit standards, and pull request workflow for the 4 parallel engineering teams.

---

## 1. Branch Strategy Overview

```
main (Production / Stable Release)
  ▲
  │ [Reviewed PR: Release Candidate & Staging Validation]
dev (Development Baseline / Shared Integration Branch)
  ▲
  ├── [PR] ── feature/erp-procurement          (Team 1 — ERP)
  ├── [PR] ── feature/crm-leads                (Team 2 — CRM)
  ├── [PR] ── feature/hrms-attendance          (Team 3 — HRMS)
  ├── [PR] ── feature/finance-ap-ar            (Team 4 — Finance)
  ├── [PR] ── bugfix/crm-opportunity-filters   (Targeting dev)
  └── [PR] ── hotfix/auth-session-leak         (Branched from main, backported to dev)
```

---

## 2. Branch Roles & Invariants

| Branch | Purpose | Base Branch | Merge Target | Direct Push? |
| :--- | :--- | :--- | :--- | :--- |
| **`main`** | Production release branch. Always stable, tagged, and deployable. | N/A | N/A | ❌ STRICTLY FORBIDDEN |
| **`dev`** | Integration branch. Baseline for all feature development. | `main` | `main` | ❌ STRICTLY FORBIDDEN |
| **`feature/*`** | Scoped branch for an assigned capability or story. | `dev` | `dev` | ✅ Allowed (Author only) |
| **`bugfix/*`** | Non-urgent defect correction targeting development. | `dev` | `dev` | ✅ Allowed (Author only) |
| **`hotfix/*`** | Critical production fix requiring immediate patch. | `main` | `main` & `dev` | ✅ Allowed (Author only) |

---

## 3. Branch Naming Standards

> [!IMPORTANT]
> **CRITICAL RULE:**
> Branches represent **work, tasks, and domain boundaries** — NOT individual developer names.
> Personal named branches (e.g. `john-dev`, `mary-fixes`) are strictly prohibited.

### Standard Pattern:
`<type>/<domain>-<short-description>`

### Valid Branch Examples:
- **Team 1 (ERP):** `feature/erp-procurement`, `feature/erp-inventory-batches`, `feature/erp-warehouse-transfer`
- **Team 2 (CRM):** `feature/crm-leads`, `feature/crm-opportunity-kanban`, `feature/crm-support-portal`
- **Team 3 (HRMS):** `feature/hrms-attendance`, `feature/hrms-payroll-runs`, `feature/hrms-recruitment`
- **Team 4 (Finance):** `feature/finance-gl-journal`, `feature/finance-ap-ar`, `feature/finance-tax-rules`
- **Defect Fixes:** `bugfix/crm-quote-discount-calc`, `bugfix/erp-stock-reorder-badge`
- **Production Patches:** `hotfix/session-token-refresh`

---

## 4. Four-Team Simultaneous Parallel Development

All 24 developers collaborate simultaneously in the single repository without merge collisions by observing strict feature boundary isolation:

- **Team 1 (ERP — 7 Developers):** Works inside `src/features/erp/`.
- **Team 2 (CRM — 7 Developers):** Works inside `src/features/crm/`.
- **Team 3 (HRMS — 7 Developers):** Works inside `src/features/hrms/`.
- **Team 4 (Finance — 3 Developers):** Works inside `src/features/finance/`.

Because each business domain owns its isolated folder under `src/features/<domain>/`, developers on different teams never modify the same business code. Cross-domain interactions occur strictly through public entry points (`@features/<domain>/types`).

---

## 5. Standard Feature Lifecycle

### Step 1: Update Local Integration Baseline
```bash
git checkout dev
git pull origin dev
```

### Step 2: Create a Task Feature Branch
```bash
git checkout -b feature/erp-procurement
```

### Step 3: Implement Within Domain Boundaries
- Work strictly inside your assigned page in `src/features/<domain>/pages/`.
- Consume canonical types from `@features/<domain>/types` or `@shared/types`.

### Step 4: Validate Locally Before Commit
```powershell
npm.cmd run typecheck
npm.cmd run build
```

### Step 5: Commit Following Conventional Commits
```bash
git add src/features/erp/pages/ProcurementPage.tsx
git commit -m "feat(erp): implement purchase requisition grid and approval drawer"
```

### Step 6: Push and Open a Pull Request
```bash
git push origin feature/erp-procurement
```
- Open a Pull Request on GitHub targeting **`dev`** (never target `main` directly).
- Attach the completed developer checklist.

---

## 6. Conventional Commit Standards

Commit messages must follow the standard Conventional Commits specification:

```
<type>(<scope>): <short imperative description>
```

### Types:
- **`feat`**: A new user-facing feature or page capability.
- **`fix`**: A bug fix in an existing page or component.
- **`docs`**: Documentation changes only.
- **`style`**: Code formatting, CSS tweaks, no business logic change.
- **`refactor`**: Internal restructuring without changing external behavior.
- **`test`**: Adding or modifying component/unit tests.
- **`chore`**: Maintenance, package scripts, build configuration.

### Scopes:
`erp`, `crm`, `hrms`, `finance`, `shared`, `app`, `core`

### Examples:
```
feat(erp): add batch expiry alerts to inventory table
feat(crm): implement lead conversion drawer and activity log
feat(hrms): add daily punch clock with shift grace period indicator
feat(finance): add Indian GST breakdown to customer invoice form
fix(crm): correct win probability calculation on opportunity kanban
docs(development): update developer assignments matrix
```

---

## 7. Git Safety Invariants

| Action | Policy |
| :--- | :--- |
| **Direct Push to `main` or `dev`** | **STRICTLY PROHIBITED** by branch protection rules. |
| **Force Push (`git push --force`)** | **PROHIBITED** on shared branches (`main`, `dev`). Use with extreme caution on private feature branches. |
| **History Rewriting (`rebase -i`)** | Only permitted on local unpushed commits. Never rewrite commits already shared on remote. |
| **Pull Request Review** | Minimum 1 peer approval required before merging into `dev`. |
| **Automated Checks** | CI must verify that `npm run typecheck` and `npm run build` pass with 0 errors. |