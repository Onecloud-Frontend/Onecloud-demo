# Shared UI Components Layer

**Layer:** `src/shared/components/`  
**Purpose:** Reusable, design-system aligned, domain-agnostic UI building blocks.

## Rules
- **Domain-Agnostic Only:** Components here MUST NOT know about "HRMS", "Invoices", "Employees", or any specific business logic.
- **Pure & Composable:** Accept data and callbacks via props.
- **Allowed Consumers:** Features (`src/features/*`) and App layouts (`src/app/*`).
- **Prohibited:** Never import from `src/features/` or `src/app/`.
