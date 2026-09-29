# HRMS Domain (`src/features/hrms/`)

## 1. Domain Purpose
Human Resource Management System (HRMS) governs employee master profiles, attendance and shift scheduling, leave policies and approvals, payroll calculation and payslips, talent acquisition (ATS), performance appraisal cycles, and employee self-service (ESS) asset requests.

## 2. Team Ownership & Developer Allocation
- **Team**: Team 3 (7 Developers)
- **Developers**:
  - `HRMS-DEV-01`: Employee Management (`EmployeeManagementPage.tsx` / `/hrms/employees`)
  - `HRMS-DEV-02`: Attendance (`AttendancePage.tsx` / `/hrms/attendance`)
  - `HRMS-DEV-03`: Leave Management (`LeaveManagementPage.tsx` / `/hrms/leave`)
  - `HRMS-DEV-04`: Payroll (`PayrollPage.tsx` / `/hrms/payroll`)
  - `HRMS-DEV-05`: Recruitment (`RecruitmentPage.tsx` / `/hrms/recruitment`)
  - `HRMS-DEV-06`: Performance + Learning (`PerformanceLearningPage.tsx` / `/hrms/performance`)
  - `HRMS-DEV-07`: ESS + Assets (`ESSEmployeeAssetsPage.tsx` / `/hrms/ess-assets`)

## 3. Folder Structure
```
src/features/hrms/
├── components/   # Domain-specific UI components
├── constants/    # HRMS constant values and status codes
├── docs/         # Developer assignment details
├── hooks/        # HRMS custom React hooks
├── pages/        # 7 starter pages + domain overview
├── routes/       # hrmsRoutes.tsx (composed into AppRouter)
├── services/     # Feature services consuming apiClient
├── types/        # Domain TypeScript interfaces
├── utils/        # Domain pure utility functions
├── README.md     # Domain reference
└── index.ts      # Public domain boundary export
```

## 4. Developer Responsibilities
- **Allowed Modifications**:
  - Create and modify files within `src/features/hrms/`.
  - Create and maintain mock data and handlers in `src/mock/hrms/`.
- **Prohibited Modifications**:
  - Do NOT modify ERP, CRM, or Finance features.
  - Do NOT modify `src/core/` or `src/shared/` without foundation review.
  - Do NOT make direct network requests.

## 5. Mock & Backend Workflow
1. Author domain types in `src/features/hrms/types/`.
2. Define mock responses in `src/mock/hrms/` wrapped in standard `ApiResponseEnvelope`.
3. In `services/`, consume `apiClient`.
4. When backend deploys, toggling `apiConfig.ts` to `'REAL'` connects live endpoints with zero page rewrites.
