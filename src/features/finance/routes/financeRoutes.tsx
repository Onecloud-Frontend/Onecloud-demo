import { Route, Navigate } from 'react-router-dom';
import { GLReportingPage } from '../pages/GLReportingPage';
import { APARBankingPage } from '../pages/APARBankingPage';
import { ExpensesBudgetsTaxPage } from '../pages/ExpensesBudgetsTaxPage';

/**
 * Finance Domain Route Definitions
 * Owned by Team 4. Composed into the application router at /finance/*
 */
export const financeRoutes = (
  <Route path="finance">
    <Route index element={<Navigate to="general-ledger" replace />} />
    <Route path="general-ledger" element={<GLReportingPage />} />
    <Route path="ap-ar-banking" element={<APARBankingPage />} />
    <Route path="expenses-budgets-tax" element={<ExpensesBudgetsTaxPage />} />
  </Route>
);
