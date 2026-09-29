/**
 * Navigation Configuration
 * Dedicated centralized specification for application sidebar navigation.
 *
 * All business module items map directly to approved domain capabilities.
 * Clean enterprise product UI (no developer IDs, team IDs, or Git badges).
 */

export interface NavigationSubItem {
  id: string;
  label: string;
  path: string;
  isTBD?: boolean;
}

export interface NavigationDomain {
  id: 'erp' | 'crm' | 'hrms' | 'finance';
  label: string;
  rootPath: string;
  iconName: 'Boxes' | 'Briefcase' | 'Users' | 'Landmark';
  subItems: NavigationSubItem[];
}

export interface NavigationConfig {
  main: {
    id: string;
    label: string;
    path: string;
  }[];
  businessModules: NavigationDomain[];
}

export const navigationConfig: NavigationConfig = {
  main: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
    },
  ],
  businessModules: [
    {
      id: 'erp',
      label: 'ERP',
      rootPath: '/erp',
      iconName: 'Boxes',
      subItems: [
        { id: 'erp-overview', label: 'Overview', path: '/erp' },
        { id: 'erp-procurement', label: 'Procurement', path: '/erp/procurement' },
        { id: 'erp-vendors', label: 'Vendor Management', path: '/erp/vendors' },
        { id: 'erp-inventory', label: 'Inventory', path: '/erp/inventory' },
        { id: 'erp-warehouse', label: 'Warehouse', path: '/erp/warehouse' },
        { id: 'erp-fulfillment', label: 'Sales Fulfillment', path: '/erp/fulfillment' },
        { id: 'erp-reports', label: 'Reports', path: '/erp/reports' },
      ],
    },
    {
      id: 'crm',
      label: 'CRM',
      rootPath: '/crm',
      iconName: 'Briefcase',
      subItems: [
        { id: 'crm-overview', label: 'Overview', path: '/crm' },
        { id: 'crm-leads', label: 'Lead Management', path: '/crm/leads' },
        { id: 'crm-opportunities', label: 'Opportunity', path: '/crm/opportunities' },
        { id: 'crm-customers', label: 'Customer / Contact', path: '/crm/customers' },
        { id: 'crm-quotations', label: 'Quotation / Sales', path: '/crm/quotations' },
        { id: 'crm-support', label: 'Support Portal', path: '/crm/support' },
        { id: 'crm-reports', label: 'Reports', path: '/crm/reports' },
      ],
    },
    {
      id: 'hrms',
      label: 'HRMS',
      rootPath: '/hrms',
      iconName: 'Users',
      subItems: [
        { id: 'hrms-employees', label: 'Employee Management', path: '/hrms/employees' },
        { id: 'hrms-attendance', label: 'Attendance', path: '/hrms/attendance' },
        { id: 'hrms-leave', label: 'Leave Management', path: '/hrms/leave' },
        { id: 'hrms-payroll', label: 'Payroll', path: '/hrms/payroll' },
        { id: 'hrms-recruitment', label: 'Recruitment', path: '/hrms/recruitment' },
        { id: 'hrms-performance', label: 'Performance & Learning', path: '/hrms/performance' },
        { id: 'hrms-ess-assets', label: 'ESS & Assets', path: '/hrms/ess-assets' },
      ],
    },
    {
      id: 'finance',
      label: 'Finance',
      rootPath: '/finance',
      iconName: 'Landmark',
      subItems: [
        { id: 'fin-gl', label: 'General Ledger', path: '/finance/general-ledger' },
        { id: 'fin-apar', label: 'AP, AR & Banking', path: '/finance/ap-ar-banking' },
        { id: 'fin-tax', label: 'Expenses, Budgets & Tax', path: '/finance/expenses-budgets-tax' },
      ],
    },
  ],
};
