# Core API Client Infrastructure

**Layer:** `src/core/api/client/`  
**Purpose:** Centralized HTTP/API transport client configuration for One Enterprise Cloud.

## Responsibilities
- Houses the base HTTP client configuration (e.g., base URL resolver, standard request timeout, default headers).
- Exposes transport abstraction to prevent vendor lock-in.

## Architectural Rules
- **No Domain Logic:** Specific domain endpoints (e.g. `/api/v1/hrms/employees`) must NOT be defined here.
- **Dependency Flow:** This client is consumed only by feature services or query clients, never imports from `features/` or `app/`.
- **Demo Status:** This is an architectural placeholder. Real network calls are intentionally not implemented in this demo.
