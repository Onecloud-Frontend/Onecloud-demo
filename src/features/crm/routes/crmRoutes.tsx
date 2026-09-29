import { Route } from 'react-router-dom';
import { CRMDashboardPage } from '../pages/CRMDashboardPage';
import { LeadManagementPage } from '../pages/LeadManagementPage';
import { OpportunityPage } from '../pages/OpportunityPage';
import { CustomerContactPage } from '../pages/CustomerContactPage';
import { QuotationSalesPage } from '../pages/QuotationSalesPage';
import { SupportPortalPage } from '../pages/SupportPortalPage';
import { CRMReportsPage } from '../pages/CRMReportsPage';

/**
 * CRM Domain Route Definitions
 * Owned by Team 2. Composed into the application router at /crm/*
 */
export const crmRoutes = (
  <Route path="crm">
    <Route index element={<CRMDashboardPage />} />
    <Route path="dashboard" element={<CRMDashboardPage />} />
    <Route path="leads" element={<LeadManagementPage />} />
    <Route path="opportunities" element={<OpportunityPage />} />
    <Route path="customers" element={<CustomerContactPage />} />
    <Route path="quotations" element={<QuotationSalesPage />} />
    <Route path="support" element={<SupportPortalPage />} />
    <Route path="reports" element={<CRMReportsPage />} />
  </Route>
);
