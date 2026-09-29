import { Route } from 'react-router-dom';
import { ErpHomePage } from '../pages/ErpHomePage';

/**
 * ERP Domain Route Definitions
 * Composed into the application router at /erp/*
 */
export const erpRoutes = (
  <Route path="erp">
    <Route index element={<ErpHomePage />} />
    {/* TBD — Additional confirmed ERP module routes will be registered here */}
  </Route>
);
