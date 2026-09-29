import { Route } from 'react-router-dom';
import { ERPDashboardPage } from '../pages/ERPDashboardPage';
import { ProcurementPage } from '../pages/ProcurementPage';
import { VendorManagementPage } from '../pages/VendorManagementPage';
import { InventoryPage } from '../pages/InventoryPage';
import { WarehousePage } from '../pages/WarehousePage';
import { FulfillmentPage } from '../pages/FulfillmentPage';
import { ERPReportsPage } from '../pages/ERPReportsPage';

/**
 * ERP Domain Route Definitions
 * Owned by Team 1. Composed into the application router at /erp/*
 */
export const erpRoutes = (
  <Route path="erp">
    <Route index element={<ERPDashboardPage />} />
    <Route path="dashboard" element={<ERPDashboardPage />} />
    <Route path="procurement" element={<ProcurementPage />} />
    <Route path="vendors" element={<VendorManagementPage />} />
    <Route path="inventory" element={<InventoryPage />} />
    <Route path="warehouse" element={<WarehousePage />} />
    <Route path="fulfillment" element={<FulfillmentPage />} />
    <Route path="reports" element={<ERPReportsPage />} />
  </Route>
);
