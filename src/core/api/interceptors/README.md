# Core API Interceptors

**Layer:** `src/core/api/interceptors/`  
**Purpose:** Cross-cutting request and response interceptors.

## Responsibilities
- Injecting authorization headers (Bearer token from auth storage).
- Injecting active Tenant ID headers (`X-Tenant-ID`).
- Injecting correlation / trace IDs for distributed telemetry.
- Uniform 401 Unauthorized handling (token refresh flow or logout trigger).
- Global 500 error sanitization and dispatch to error notification hooks.

## Architectural Rules
- Interceptors operate at the technical infrastructure layer.
- They must NEVER import domain features or business logic.
