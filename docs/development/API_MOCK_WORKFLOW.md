# API Mock Layer & Backend Handoff Workflow

## 1. Purpose of the Mock Layer

Backend services for ERP, CRM, and HRMS are currently pending deployment.  
The mock layer allows all three teams to develop real user interfaces, forms, and tables against **stable TypeScript contracts** without blocking on backend delivery.

---

## 2. Centralized Mock Architecture

The mock layer is centralized under `src/mock/`:

```
src/mock/
├── erp/                  # ERP mock data & handlers (Owned by Team A)
│   ├── erpMockData.ts
│   ├── erpMockHandlers.ts
│   └── index.ts
├── crm/                  # CRM mock data & handlers (Owned by Team B)
│   ├── crmMockData.ts
│   ├── crmMockHandlers.ts
│   └── index.ts
├── hrms/                 # HRMS mock data & handlers (Owned by Team C)
│   ├── hrmsMockData.ts
│   ├── hrmsMockHandlers.ts
│   └── index.ts
├── handlers/
│   └── mockRouter.ts     # Dispatches path requests to domain handlers
├── data/
│   └── commonMockData.ts # Envelopes, pagination helpers, simulated delay
├── mockAdapter.ts        # Implements IApiClient interface
└── index.ts
```

---

## 3. Separation of Responsibilities

| Responsibility | Owner | Scope |
|---|---|---|
| **Core API Client & Mock Adapter** | Central Foundation Owner | `src/core/api/client/`, `src/mock/mockAdapter.ts`, `src/mock/handlers/mockRouter.ts` |
| **Common API Infrastructure Types** | Central Foundation Owner | `src/core/api/types/` (envelopes, pagination, error schemas) |
| **ERP Mock Contracts & Data** | **Team A (ERP)** | `src/mock/erp/`, `src/features/erp/types/` |
| **CRM Mock Contracts & Data** | **Team B (CRM)** | `src/mock/crm/`, `src/features/crm/types/` |
| **HRMS Mock Contracts & Data** | **Team C (HRMS)** | `src/mock/hrms/`, `src/features/hrms/types/` |

---

## 4. Centralized Mode Switch: Mock vs Real

In `src/core/api/client/apiConfig.ts`:

```typescript
export type ApiMode = 'MOCK' | 'REAL';

export const apiConfig: ApiConfiguration = {
  mode: 'MOCK', // Set to 'REAL' when backend is deployed
  baseUrl: (import.meta.env.VITE_API_BASE_URL as string) || '[CORE_CONFIGURED_BASE_URL]',
  timeoutMs: 30000,
};
```

### Pre-Backend (Current):
```
UI Component ──> Feature Service ──> apiClient ──> mockAdapter ──> mockData
```

### Post-Backend Deployment:
```
UI Component ──> Feature Service ──> apiClient ──> Real HTTP Client ──> API Gateway
```

> **CRITICAL BENEFIT:**  
> Switching to the real backend requires **ZERO changes to UI components or pages**.  
> Only the underlying client transport configuration is switched!

---

## 5. Rules for Mocking
1. **Never invent backend endpoint URLs:** Use contract identifiers (e.g. `/erp/workspace-status`). The backend team will provide OpenAPI / Swagger specifications.
2. **Deterministic data:** Keep mock data small, clean, and representative.
3. **Simulated latency:** Handlers include realistic delay (200–300ms) to ensure loading indicators are thoroughly tested.
4. **Contract adherence:** All mock responses must match `ApiResponseEnvelope<T>`.
