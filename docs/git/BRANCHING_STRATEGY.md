# Branch Naming & Safety Standards

## 1. Branch Naming Rules

> **CRITICAL RULE:**  
> Branches represent **work, tasks, and domain boundaries** — NOT individual employee names.  
> Personal named branches (e.g. `john-dev`, `mary-fixes`) are strictly prohibited.

### Format:
`<type>/<team-or-domain>-<short-description>`

### Examples:
- `feature/team-a-platform-dashboard`
- `feature/team-b-hrms-employee-list`
- `feature/team-c-finance-tax-reports`
- `bugfix/team-a-subscription-seat-counter`
- `hotfix/auth-token-refresh-leak`

---

## 2. Git Safety Invariants

| Action | Allowed on `main`? | Allowed on `dev`? | Allowed on `feature/*`? |
|---|---|---|---|
| Direct Push | ❌ PROHIBITED | ❌ PROHIBITED | ✓ Allowed (author only) |
| Force Push (`--force`) | ❌ PROHIBITED | ❌ PROHIBITED | ⚠️ Discouraged |
| Rewriting Shared History | ❌ PROHIBITED | ❌ PROHIBITED | ❌ PROHIBITED |
| Merge via Reviewed PR | ✓ Required | ✓ Required | N/A |
| Rebase onto latest `dev` | N/A | N/A | ✓ Recommended |
