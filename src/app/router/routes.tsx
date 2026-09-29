import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@app/layouts/AppLayout';
import { AuthGuard } from '@app/guards/AuthGuard';
import { LoginPage } from '@app/auth-pages/LoginPage';
import { OverviewPage } from '@app/pages/OverviewPage';
import { TeamOwnershipPage } from '@app/pages/TeamOwnershipPage';
import { GitWorkflowPage } from '@app/pages/GitWorkflowPage';
import { ArchitectureRulesPage } from '@app/pages/ArchitectureRulesPage';
import { CoreApiOverviewPage } from '@app/pages/CoreApiOverviewPage';

// Three Team Bases
import { ErpHomePage } from '@features/erp';
import { CrmHomePage } from '@features/crm';
import { HrmsHomePage } from '@features/hrms';

// Secondary Demonstration Domains (retained for regression safety)
import { PlatformAdminDemoPage } from '@features/platform-admin';
import { FinanceDemoPage } from '@features/finance';
import { NotFoundPage } from '@app/error-pages/NotFoundPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public Authentication Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Enterprise Application Routes */}
      <Route
        path="/"
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        {/* Root redirect to /dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<OverviewPage />} />

        {/* Primary Three Team Workspaces */}
        <Route path="erp" element={<ErpHomePage />} />
        <Route path="crm" element={<CrmHomePage />} />
        <Route path="hrms" element={<HrmsHomePage />} />

        {/* Architecture & Engineering Standards */}
        <Route path="teams/ownership" element={<TeamOwnershipPage />} />
        <Route path="git/workflow" element={<GitWorkflowPage />} />
        <Route path="architecture/rules" element={<ArchitectureRulesPage />} />
        <Route path="core/api-overview" element={<CoreApiOverviewPage />} />

        {/* Secondary Domain Demos */}
        <Route path="features/platform-admin" element={<PlatformAdminDemoPage />} />
        <Route path="features/finance" element={<FinanceDemoPage />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
