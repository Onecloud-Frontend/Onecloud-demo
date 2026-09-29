# Enterprise Git Workflow Standards

## 1. Branch Strategy Overview

```
main (Production / Stable)
  ▲
  │ [PR: Release Candidate & Staging Validation]
dev (Development Baseline / Integration Branch)
  ▲
  ├── [PR] ── feature/team-a-platform-dashboard
  ├── [PR] ── feature/team-b-hrms-users
  ├── [PR] ── feature/team-c-finance-reports
  ├── [PR] ── bugfix/team-b-leave-calculation
  └── [PR] ── hotfix/production-auth-interceptor (into main and backported to dev)
```

---

## 2. Branch Roles

- **`main`**: Production-ready code. Always stable, fully tested, and deployable.
- **`dev`**: Integration branch. All features merge into `dev` via Pull Request. Serves as the baseline for all new feature branches.
- **`feature/*`**: Scoped branch for a specific task or user story.
- **`bugfix/*`**: Defect corrections targeting `dev`.
- **`hotfix/*`**: Urgent production patches branched directly from `main`.

---

## 3. Preferred Feature Branch Lifecycle

1. Ensure local `dev` is up to date:
   ```bash
   git checkout dev
   git pull origin dev
   ```
2. Create your task branch following naming conventions:
   ```bash
   git checkout -b feature/team-a-platform-dashboard
   ```
3. Develop inside your assigned domain directory.
4. Run validation checks:
   ```bash
   npm run typecheck
   npm run build
   ```
5. Commit using conventional commits:
   ```bash
   git commit -m "feat: add platform admin tenant table shell"
   ```
6. Push branch and open a Pull Request targeting `dev`.
7. Complete peer code review and merge.
