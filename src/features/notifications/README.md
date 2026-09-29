# Feature Domain: NOTIFICATIONS

**Domain Boundary:** `src/features/notifications/`  
**Demonstration Team Ownership:** Team B (Workforce & Collaboration)  
*(Note: Team assignments are demonstration ownership and can be adjusted by the project lead. The architectural boundary rule is the permanent source of truth.)*

## Domain Purpose
User notification center, in-app alerts, email/SMS digest preferences, and team broadcast communications.

## When Product Development Begins, This Folder Will Contain:
```
src/features/notifications/
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
