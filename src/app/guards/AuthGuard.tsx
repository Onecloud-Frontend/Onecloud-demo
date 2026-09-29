import React from 'react';
import { demoSession } from '@core/auth';
import { ForbiddenPage } from '@app/error-pages/ForbiddenPage';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole }) => {
  if (!demoSession.isAuthenticated) {
    return <ForbiddenPage />;
  }

  if (requiredRole && !demoSession.roles.includes(requiredRole) && !demoSession.roles.includes('EnterpriseAdmin')) {
    return <ForbiddenPage />;
  }

  return <>{children}</>;
};
