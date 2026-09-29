import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const EmployeeManagementPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="HRMS-DEV-01"
      domain="HRMS"
      domainCategory="HRMS"
      teamBadgeVariant="team-c"
      capability="Employee Management"
      route="/hrms/employees"
      description="Core employee master profiles, department hierarchy, designations, and onboarding/offboarding."
      scopeItems={[
        "Employee Master Directory",
        "Department & Job Role Mapping",
        "Onboarding & Document Verification",
        "Offboarding & Clearance Checklist"
]}
      typeLocation="src/features/hrms/types/employee.ts"
      serviceLocation="src/features/hrms/services/employeeService.ts"
      mockLocation="src/mock/hrms/"
    />
  );
};
