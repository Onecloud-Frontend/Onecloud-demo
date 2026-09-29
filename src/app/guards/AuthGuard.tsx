import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@core/auth';
import { ForbiddenPage } from '@app/error-pages/ForbiddenPage';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to /login while saving original intended path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user && !user.roles.includes(requiredRole) && !user.roles.includes('EnterpriseAdmin')) {
    return <ForbiddenPage />;
  }

  return <>{children}</>;
};
