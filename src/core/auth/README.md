# Core Authentication Infrastructure

**Layer:** `src/core/auth/`  
**Purpose:** Enterprise user identity, session management, token storage, and OIDC/OAuth state abstraction.

## Current Demonstration Mode
Backend authentication services are currently pending deployment.
To support realistic UX testing and team collaboration:
- Authentication state is maintained locally via React Context + LocalStorage abstraction (`onecloud:demo_auth_session`).
- **No live API endpoints or fake HTTP servers are used.**
- Simulated login delay (450ms) provides visual loading state feedback.

## Future Backend Connection Path
When enterprise SSO / OAuth2 microservices are deployed, this module will connect via:
```
src/core/auth/
   ↓ (token dispatch & refresh)
src/core/api/interceptors/ (Authorization: Bearer <token>)
   ↓
API Gateway
   ↓
Identity & Access Management (IAM) Microservice
```
Domain features (`src/features/erp/`, `src/features/crm/`, `src/features/hrms/`) will continue consuming `useAuth()` without any code changes!
