# Feature Domain: HRMS (Human Resource Management System)

**Domain Boundary:** `src/features/hrms/`  
**Official Team Ownership:** **Team C**  
**Role:** Human Resource Management System domain foundation for One Enterprise Cloud.

## Directory Structure
```
src/features/hrms/
├── pages/          # Routed views for HRMS (e.g. HrmsHomePage.tsx)
├── components/     # HRMS domain-specific UI components
├── hooks/          # HRMS domain-specific React hooks
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
  - Direct imports into `src/features/erp/` or `src/features/crm/` (cross-feature coupling is blocked).
  - Importing from `src/app/` (features cannot depend on application orchestration).
  - Calling live backend APIs or inventing mock backend servers.
