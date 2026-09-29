# Feature Domain: ERP (Enterprise Resource Planning)

**Domain Boundary:** `src/features/erp/`  
**Official Team Ownership:** **Team A**  
**Role:** Enterprise Resource Planning domain foundation for One Enterprise Cloud.

## Directory Structure
```
src/features/erp/
├── pages/          # Routed views for ERP (e.g. ErpHomePage.tsx)
├── components/     # ERP domain-specific UI components
├── hooks/          # ERP domain-specific React hooks
├── services/       # Domain service adapters consuming @core/api infrastructure
├── types/          # Domain TypeScript models, contracts, and view interfaces
├── constants/      # Feature-level constants
├── utils/          # Domain helper functions
├── routes/         # Internal route mappings
├── index.ts        # Public entry point
└── README.md
```

## Architectural Dependency Rules
- **ALLOWED:**
  - Import technical infrastructure from `@core` (auth, tenant, permissions, API contracts).
  - Import domain-agnostic UI and helpers from `@shared` (Button, Card, Input, formatters).
- **STRICTLY PROHIBITED:**
  - Direct imports into `src/features/crm/` or `src/features/hrms/` (cross-feature coupling is blocked).
  - Importing from `src/app/` (features cannot depend on application orchestration).
  - Calling live backend APIs or inventing mock backend servers.
