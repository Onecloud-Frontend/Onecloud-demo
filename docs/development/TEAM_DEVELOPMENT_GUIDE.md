# Team Development Guidelines & Workflow

## 1. Team Ownership Boundaries

| Team | Focus Domain | Feature Directory | Demonstration Branch |
|---|---|---|---|
| **Team A** | **ERP** | `src/features/erp/` | `feature/team-a-erp-demo` |
| **Team B** | **CRM** | `src/features/crm/` | `feature/team-b-crm-demo` |
| **Team C** | **HRMS** | `src/features/hrms/` | `feature/team-c-hrms-demo` |

---

## 2. The 14-Step Feature Development Workflow

Every developer adding a page or feature must follow this sequence:

1. **Step 1 — Read Approved Requirement:** Inspect the approved SRS or requirement specification. Never start with assumptions.
2. **Step 2 — Confirm Page/Module Ownership:** Ensure the scope falls strictly within your team's domain folder.
3. **Step 3 — Confirm or Create TypeScript Types:** Define models and request/response interfaces in `src/features/<domain>/types/`.
4. **Step 4 — Confirm API Contract:** Align with the standard `ApiResponseEnvelope<T>` envelope.
5. **Step 5 — Create/Update Mock Implementation:** Add deterministic mock data in `src/mock/<domain>/`.
6. **Step 6 — Create Service Function:** Implement the domain service in `src/features/<domain>/services/` using `apiClient`.
7. **Step 7 — Create Page Component:** Build the routed page in `src/features/<domain>/pages/`.
8. **Step 8 — Create Domain Components:** Place domain-specific widgets in `src/features/<domain>/components/`.
9. **Step 9 — Connect Page to Service:** Invoke the service within a React effect or query hook.
10. **Step 10 — Implement State Handling:** Incorporate `<LoadingState>`, `<EmptyState>`, and `<ErrorState>`.
11. **Step 11 — Test with Mock Data:** Verify interactions, loading states, and responsive styling.
12. **Step 12 — Run Local Checks:**
    ```bash
    npm run typecheck
    npm run build
    ```
13. **Step 13 — Commit to Feature Branch:** Use conventional commits:
    ```bash
    git commit -m "feat(erp): add procurement order workspace base"
    ```
14. **Step 14 — Open Pull Request:** Open PR targeting `dev` for team review.

---

## 3. Strict Boundary Rules

```
Allowed:
  features/erp  ──> @core/api, @core/auth, @shared/components
  features/crm  ──> @core/api, @core/auth, @shared/components
  features/hrms ──> @core/api, @core/auth, @shared/components

Prohibited:
  features/erp  ──✕──> features/crm (NO cross-feature imports)
  features/erp  ──✕──> features/hrms (NO cross-feature imports)
  features/crm  ──✕──> features/erp (NO cross-feature imports)
  features/hrms ──✕──> features/erp (NO cross-feature imports)
  features/*    ──✕──> src/app/ (NO features importing app orchestration)
```

---

## 4. Shared and Core Modifications
Modifications to `src/app/`, `src/core/`, or `src/shared/` affect all teams and require:
- Multi-team review.
- Architectural sign-off from the Lead Frontend Architect.
