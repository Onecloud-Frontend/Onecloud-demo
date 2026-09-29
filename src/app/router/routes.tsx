import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@app/layouts/AppLayout';
import { OverviewPage } from '@app/pages/OverviewPage';
import { TeamOwnershipPage } from '@app/pages/TeamOwnershipPage';
import { GitWorkflowPage } from '@app/pages/GitWorkflowPage';
import { ArchitectureRulesPage } from '@app/pages/ArchitectureRulesPage';
import { CoreApiOverviewPage } from '@app/pages/CoreApiOverviewPage';
import { PlatformAdminDemoPage } from '@features/platform-admin';
import { HrmsDemoPage } from '@features/hrms';
import { FinanceDemoPage } from '@features/finance';
import { NotFoundPage } from '@app/error-pages/NotFoundPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="teams/ownership" element={<TeamOwnershipPage />} />
        <Route path="git/workflow" element={<GitWorkflowPage />} />
        <Route path="architecture/rules" element={<ArchitectureRulesPage />} />
        <Route path="core/api-overview" element={<CoreApiOverviewPage />} />

        {/* Feature Domain Demonstration Routes */}
        <Route path="features/platform-admin" element={<PlatformAdminDemoPage />} />
        <Route path="features/hrms" element={<HrmsDemoPage />} />
        <Route path="features/finance" element={<FinanceDemoPage />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
