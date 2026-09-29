# Feature Domain: CRM (Customer Relationship Management)

**Domain Boundary:** `src/features/crm/`  
**Official Team Ownership:** **Team B**  
**Role:** Customer Relationship Management domain foundation for One Enterprise Cloud.

## Directory Structure
```
src/features/crm/
├── pages/          # Routed views for CRM (e.g. CrmHomePage.tsx)
├── components/     # CRM domain-specific UI components
├── hooks/          # CRM domain-specific React hooks
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
  - Direct imports into `src/features/erp/` or `src/features/hrms/` (cross-feature coupling is blocked).
  - Importing from `src/app/` (features cannot depend on application orchestration).
  - Calling live backend APIs or inventing mock backend servers.
