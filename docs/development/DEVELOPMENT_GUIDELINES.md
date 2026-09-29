# Engineering & Development Guidelines

## 1. Local Development Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Validate TypeScript types
npm run typecheck

# 4. Create production build bundle
npm run build
```

---

## 2. Commit Message Convention

Follow Conventional Commits:

- `feat: add team A platform module shell`
- `feat: add team B HRMS module shell`
- `fix: correct router configuration`
- `refactor: isolate tenant context in core`
- `docs: update team ownership matrix`
- `chore: upgrade vite build configuration`

---

## 3. Adding New Features

When starting work on an assigned domain:

1. Create a branch: `feature/<team>-<domain>-<task>`
2. Implement your UI inside `src/features/<domain>/components/`
3. Use shared UI primitives from `@shared/components`
4. Consume core context from `@core`
5. Export your main routed page via `src/features/<domain>/index.ts`
6. Register the route in `src/app/router/routes.tsx`
7. Open a PR against `dev`
