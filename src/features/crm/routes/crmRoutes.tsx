import { Route } from 'react-router-dom';
import { CrmHomePage } from '../pages/CrmHomePage';

/**
 * CRM Domain Route Definitions
 * Composed into the application router at /crm/*
 */
export const crmRoutes = (
  <Route path="crm">
    <Route index element={<CrmHomePage />} />
    {/* TBD — Additional confirmed CRM module routes will be registered here */}
  </Route>
);
