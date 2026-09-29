# HRMS Team Developer Guide — Team 3 (Human Resource Management)

> **AUTHORITATIVE DIRECTIVE FOR HRMS-DEV-01 THROUGH HRMS-DEV-07:**
> This guide outlines the operational boundaries, canonical contracts, developer allocations, and implementation rules for Team 3.

---

## 1. HRMS Purpose

The **Human Resource Management System (HRMS)** powers people operations: maintaining the enterprise workforce directory, tracking daily attendance and shift schedules, handling leave entitlements and approvals, calculating complex monthly payroll, recruiting candidates, running appraisal cycles, and managing employee assets.

---

## 2. HRMS Feature Structure

All HRMS development is strictly isolated inside `src/features/hrms/`:

```
src/features/hrms/
├── pages/                 # Top-level routed pages for the 7 HRMS capabilities
│   ├── EmployeeManagementPage.tsx   # HRMS-DEV-01
│   ├── AttendancePage.tsx           # HRMS-DEV-02
│   ├── LeaveManagementPage.tsx      # HRMS-DEV-03
│   ├── PayrollPage.tsx              # HRMS-DEV-04
│   ├── RecruitmentPage.tsx          # HRMS-DEV-05
│   ├── PerformanceLearningPage.tsx  # HRMS-DEV-06
│   └── ESSEmployeeAssetsPage.tsx    # HRMS-DEV-07
├── components/            # Domain components partitioned by capability
│   ├── employees/
│   ├── attendance/
│   ├── leave/
│   ├── payroll/
│   ├── recruitment/
│   ├── performance/
│   └── assets/
├── hooks/                 # Custom React hooks (e.g. useEmployeeProfile, useLeaveBalance)
├── services/              # Domain service clients consuming apiClient
├── types/                 # Canonical HRMS TypeScript types (64 types)
└── utils/                 # Attendance hour calculators, tax deductions, leave quota rules
```

---

## 3. HRMS Canonical Types (64 Types)

HRMS developers must import all domain types directly from `@features/hrms/types`:

```typescript
import type {
  Department, DepartmentStatus, Skill, Certification, EmergencyContact, EmployeeDocument,
  Employee, EmployeeReference, Gender, EmploymentType, EmploymentStatus,
  AttendanceRecord, AttendanceStatus, AttendanceSummary, Shift, OvertimeRecord, AttendanceCorrection,
  LeaveType, LeaveBalance, LeaveRequest, LeaveRequestStatus, LeaveApproval,
  SalaryComponent, SalaryStructure, SalaryStructureComponent, PayrollRun, PayrollRecord, Payslip, PayslipComponent,
  JobRequisition, JobPosting, Candidate, Interview, CandidateEvaluation,
  PerformanceGoal, KPI, PerformanceReview, PerformanceFeedback,
  Course, LearningPlan, Assessment, LearningProgress,
  Asset, AssetAssignment, AssetMaintenance, EmployeeRequest
} from '@features/hrms/types';
```

---

## 4. HRMS Domain Ownership

Team 3 (HRMS) is the **exclusive canonical owner** of:
- **Organization & People:** Employee master records, departments, organizational hierarchy, skills, certifications, emergency contacts, compliance documents.
- **Attendance & Shifts:** Clock-in/out logs, shift templates, overtime tracking, attendance regularization.
- **Leave:** Leave entitlement types, balance allocations, leave request applications, manager approval workflow.
- **Payroll:** Compensation salary components, structured salary packages, monthly payroll runs, payslips.
- **Recruitment:** Hiring requisitions, external job postings, candidate applicants, interview scorecards.
- **Performance & Learning:** Goal setting, KPIs, annual appraisal reviews, 360 feedback, training courses, learning plans.
- **Employee Services & Assets:** Employee self-service requests, hardware/laptop inventory, asset assignments, maintenance logs.

---

## 5. HRMS Cross-Domain Dependencies

### HRMS Master Entities Consumed Enterprise-Wide:
- **Employee**: Consumed as: purchase requisition requester and PO approver in ERP; sales rep and deal owner in CRM; expense claimant and reimbursement payee in Finance.
- **Department**: Consumed by ERP for tracking purchase request cost centers and by Finance for departmental budgets.

### Entities Consumed by HRMS (Owned by other teams):
- HRMS operates primarily as an upstream enterprise master data authority. Asset procurement logs may reference ERP vendors via string IDs (`vendorId?: string`).

---

## 6. HRMS Navigation

All 7 HRMS capabilities are accessible from the navigation sidebar under the **HRMS Domain Accordion**:
- `/hrms` (or `/hrms/dashboard`) — Executive HRMS Overview
- `/hrms/employees` — Employee Directory & Organizational Profiles
- `/hrms/attendance` — Daily Attendance, Shifts & Regularization
- `/hrms/leave` — Leave Balances & Approval Workflow
- `/hrms/payroll` — Salary Structures & Monthly Payroll Runs
- `/hrms/recruitment` — Job Requisitions & Candidate Pipeline
- `/hrms/performance` — Appraisals, Goals & Learning Catalog
- `/hrms/ess-assets` — Employee Self-Service & Company Assets

---

## 7. Developer Allocations & Detailed Responsibilities

### HRMS-DEV-01: Employee Management
- **Route:** `/hrms/employees`
- **Primary Page:** `EmployeeManagementPage.tsx`
- **Canonical Types:** `Employee`, `EmployeeReference`, `Department`, `Skill`, `Certification`, `EmergencyContact`, `EmployeeDocument`
- **What You Own:** Master employee directory, employee profile view/edit wizard (personal details, department, manager, employment status), document verification badge, emergency contact management.
- **What You Must NOT Modify:** Payroll runs or leave approval queues.

### HRMS-DEV-02: Attendance
- **Route:** `/hrms/attendance`
- **Primary Page:** `AttendancePage.tsx`
- **Canonical Types:** `AttendanceRecord`, `AttendanceSummary`, `Shift`, `OvertimeRecord`, `AttendanceCorrection`, `Employee`
- **What You Own:** Daily attendance punch table, monthly attendance summary calendar, shift schedule assignments, overtime approval log, attendance regularization request review.
- **What You Must NOT Modify:** Annual leave balance quota allocations.

### HRMS-DEV-03: Leave Management
- **Route:** `/hrms/leave`
- **Primary Page:** `LeaveManagementPage.tsx`
- **Canonical Types:** `LeaveType`, `LeaveBalance`, `LeaveRequest`, `LeaveApproval`, `Employee`
- **What You Own:** Annual leave balance cards (Casual, Sick, Earned), leave application form with date range duration calculator, pending leave approval queue with manager decision actions.
- **What You Must NOT Modify:** Salary compensation structures or employee profile master.

### HRMS-DEV-04: Payroll
- **Route:** `/hrms/payroll`
- **Primary Page:** `PayrollPage.tsx`
- **Canonical Types:** `SalaryComponent`, `SalaryStructure`, `PayrollRun`, `PayrollRecord`, `Payslip`, `PayslipComponent`, `Employee`
- **What You Own:** Salary component setup (Basic, HRA, PF, Tax), salary structure assignment, monthly payroll batch execution drawer (`DRAFT` → `PROCESSING` → `COMPLETED`), employee payslip generator with printable view.
- **What You Must NOT Modify:** Finance general ledger journal entries or bank transactions.

### HRMS-DEV-05: Recruitment
- **Route:** `/hrms/recruitment`
- **Primary Page:** `RecruitmentPage.tsx`
- **Canonical Types:** `JobRequisition`, `JobPosting`, `Candidate`, `Interview`, `CandidateEvaluation`, `Department`, `Employee`
- **What You Own:** Departmental job requisition approval flow, public job posting manager, applicant tracking pipeline (`NEW` → `SCREENING` → `INTERVIEWING` → `OFFERED`), interview scorecard evaluator.
- **What You Must NOT Modify:** Existing active employee records.

### HRMS-DEV-06: Performance + Learning
- **Route:** `/hrms/performance`
- **Primary Page:** `PerformanceLearningPage.tsx`
- **Canonical Types:** `PerformanceGoal`, `KPI`, `PerformanceReview`, `PerformanceFeedback`, `Course`, `LearningPlan`, `Assessment`, `LearningProgress`, `Employee`
- **What You Own:** Goal setting and KPI progress tracker, annual appraisal review form (self-rating vs manager-rating), peer feedback collector, corporate training course catalog, employee course completion progress.
- **What You Must NOT Modify:** Physical asset maintenance or attendance logs.

### HRMS-DEV-07: ESS + Employee Assets
- **Route:** `/hrms/ess-assets`
- **Primary Page:** `ESSEmployeeAssetsPage.tsx`
- **Canonical Types:** `Employee`, `EmployeeRequest`, `EmployeeDocument`, `AttendanceRecord`, `LeaveBalance`, `Asset`, `AssetAssignment`, `AssetMaintenance`
- **What You Own:** Employee self-service dashboard (my profile, my leave balance, my requests), company IT asset directory (Laptops, Monitors, Phones), asset issuance and return tracking, repair/maintenance logs.
- **What You Must NOT Modify:** Payroll salary components or recruitment applicant candidate stages.

---

## 8. Intra-Team Dependencies (Between HRMS Developers)

- **HRMS-DEV-01 (Employees) & ALL Developers:** All other capabilities rely on selecting active employees created by HRMS-DEV-01.
- **HRMS-DEV-02 (Attendance) & HRMS-DEV-04 (Payroll):** Payroll runs consume monthly attendance summaries (unpaid leaves, overtime hours) to compute gross salary.
- **HRMS-DEV-03 (Leave) & HRMS-DEV-02 (Attendance):** Approved leave requests mark the employee as `ON_LEAVE` in attendance daily logging.
- **HRMS-DEV-05 (Recruitment) & HRMS-DEV-01 (Employees):** Candidates who are `HIRED` convert into new active employee records.
- **HRMS-DEV-07 (Assets) & HRMS-DEV-01 (Employees):** Assets are assigned to specific employees.

---

## 9. HRMS-Specific UI Standards

- **Punch Clock & Attendance Calendar:** Present daily attendance with colored day-cells (Green = Present, Amber = Half-day, Red = Absent, Blue = Leave).
- **Payslip View:** Format payslips in a clean, two-column statement format (Earnings on left, Deductions on right, Net Pay in highlighted summary box).
- **Approval Timelines:** Use visual step timelines for leave and requisition approval flows.

---

## 10. HRMS Completion Checklist

- [ ] Assigned page component renders without errors.
- [ ] Canonical HRMS types imported from `@features/hrms/types`.
- [ ] Zero duplicate interfaces created.
- [ ] Loading skeleton, empty state, and error handling implemented.
- [ ] Search by employee name, employee code, or department functional.
- [ ] Employment status and department filtering functional.
- [ ] `npm.cmd run typecheck` passes with 0 errors.
- [ ] `npm.cmd run build` passes with 0 errors.
- [ ] Feature branch `feature/hrms-<module>` created with conventional commits.