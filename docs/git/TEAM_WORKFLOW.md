# Three-Team Collaborative Workflow

## 1. Simultaneous Parallel Development

Three distinct frontend teams collaborate simultaneously in this monorepo without friction:

- **Team A**: Focuses on Platform Administration, Subscription, Revenue, Reporting.
- **Team B**: Focuses on HRMS, CRM, Workflow, Notifications, Calendar.
- **Team C**: Focuses on ERP, Finance, DMS, Integrations, Search, Monitoring, Security, Developer, Portals, AI.

Because domain folders are completely isolated:
- Team A can push to `feature/team-a-*` and merge into `dev`.
- Team B can push to `feature/team-b-*` and merge into `dev`.
- Team C can push to `feature/team-c-*` and merge into `dev`.
- Neither team touches another team's domain folder. Zero merge conflicts in business logic.

---

## 2. Pull Request & Review Protocol

1. **Feature PRs:**
   - Authored inside `src/features/<domain>/`.
   - Reviewed and approved by peers from the assigned team.
2. **Shared PRs (`src/shared/`):**
   - Requires review from at least two teams to ensure domain-agnostic suitability.
3. **Core / Architecture PRs (`src/core/`, `src/app/`):**
   - Requires explicit sign-off from the Lead Frontend Architect.
