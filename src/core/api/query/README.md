# Core API Query Infrastructure

**Layer:** `src/core/api/query/`  
**Purpose:** Server-state management and query client infrastructure (e.g. TanStack Query or SWR configuration).

## Responsibilities
- Global query cache configuration (stale times, garbage collection timers, retry logic).
- Mutation default error boundaries and optimistic update helpers.
- Offline query hydration and retry pipelines.

## Architectural Rules
- Individual feature queries (e.g. `useHrmsEmployeesQuery`) belong in their respective feature directories (`src/features/hrms/api/`), NOT here.
- Only technical query client factories and global defaults reside here.
