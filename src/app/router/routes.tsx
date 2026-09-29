import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@app/layouts/AppLayout';
import { AuthGuard } from '@app/guards/AuthGuard';
import { LoginPage } from '@app/auth-pages/LoginPage';
import { OverviewPage } from '@app/pages/OverviewPage';

// The Three Primary Module Workspaces
import { ErpHomePage } from '@features/erp';
import { CrmHomePage } from '@features/crm';
import { HrmsHomePage } from '@features/hrms';

import { NotFoundPage } from '@app/error-pages/NotFoundPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public Authentication Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Enterprise Application Shell */}
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

        {/* Business Modules */}
        <Route path="erp" element={<ErpHomePage />} />
        <Route path="crm" element={<CrmHomePage />} />
        <Route path="hrms" element={<HrmsHomePage />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
