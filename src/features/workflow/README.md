# Feature Domain: WORKFLOW

**Domain Boundary:** `src/features/workflow/`  
**Status:** Unassigned (Future Capability / Platform Architecture)
*(Note: Team assignments are demonstration ownership and can be adjusted by the project lead. The architectural boundary rule is the permanent source of truth.)*

## Domain Purpose
Cross-domain business process automation engine, approval matrices, state machine definitions, and human-in-the-loop tasks.

## When Product Development Begins, This Folder Will Contain:
```
src/features/workflow/
├── components/     # Domain-specific UI components (not used outside this domain)
├── hooks/          # Domain-specific React hooks (e.g. state, domain forms)
├── api/            # Domain service queries/mutations consuming @core/api infrastructure
├── types/          # Domain TypeScript models, contracts, and view interfaces
├── pages/          # Routed views for this domain
└── tests/          # Domain-specific unit and integration tests
```

## Architectural Dependency Rules
- **ALLOWED:**
  - Import technical infrastructure from `@core` (e.g. auth context, tenant info, storage)
  - Import domain-agnostic UI and helpers from `@shared` (e.g. Button, Card, formatters)
- **STRICTLY PROHIBITED:**
  - Importing from `src/app/` (features must never depend on application orchestration)
  - Deep cross-feature imports into other `src/features/*` folders
  - Injecting domain logic into `@shared` or `@core`
  - Directly accessing databases or making arbitrary unauthorized network calls
  - Bypassing core API transport infrastructure
