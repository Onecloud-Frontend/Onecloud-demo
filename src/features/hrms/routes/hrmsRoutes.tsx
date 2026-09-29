import { Route } from 'react-router-dom';
import { EmployeeManagementPage } from '../pages/EmployeeManagementPage';
import { AttendancePage } from '../pages/AttendancePage';
import { LeaveManagementPage } from '../pages/LeaveManagementPage';
import { PayrollPage } from '../pages/PayrollPage';
import { RecruitmentPage } from '../pages/RecruitmentPage';
import { PerformanceLearningPage } from '../pages/PerformanceLearningPage';
import { ESSEmployeeAssetsPage } from '../pages/ESSEmployeeAssetsPage';

/**
 * HRMS Domain Route Definitions
 * Owned by Team 3. Composed into the application router at /hrms/*
 */
export const hrmsRoutes = (
  <Route path="hrms">
    <Route index element={<EmployeeManagementPage />} />
    <Route path="employees" element={<EmployeeManagementPage />} />
    <Route path="attendance" element={<AttendancePage />} />
    <Route path="leave" element={<LeaveManagementPage />} />
    <Route path="payroll" element={<PayrollPage />} />
    <Route path="recruitment" element={<RecruitmentPage />} />
    <Route path="performance" element={<PerformanceLearningPage />} />
    <Route path="ess-assets" element={<ESSEmployeeAssetsPage />} />
  </Route>
);
