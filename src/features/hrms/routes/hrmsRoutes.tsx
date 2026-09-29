import { Route } from 'react-router-dom';
import { HrmsHomePage } from '../pages/HrmsHomePage';

/**
 * HRMS Domain Route Definitions
 * Composed into the application router at /hrms/*
 */
export const hrmsRoutes = (
  <Route path="hrms">
    <Route index element={<HrmsHomePage />} />
    {/* TBD — Additional confirmed HRMS module routes will be registered here */}
  </Route>
);
