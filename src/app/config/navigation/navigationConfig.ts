/**
 * Navigation Configuration
 * Dedicated centralized specification for application sidebar navigation.
 *
 * IMPORTANT:
 * Page and module lists are derived ONLY from confirmed requirements.
 * Unconfirmed modules are marked as TBD — Awaiting Approved Requirements.
 */

export interface NavigationSubItem {
  id: string;
  label: string;
  path: string;
  isTBD?: boolean;
}

export interface NavigationDomain {
  id: 'erp' | 'crm' | 'hrms';
  label: string;
  rootPath: string;
  iconName: 'Boxes' | 'Briefcase' | 'Users';
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
        {
          id: 'erp-overview',
          label: 'Overview',
          path: '/erp',
        },
        {
          id: 'erp-modules-tbd',
          label: 'Modules (TBD — Awaiting Requirements)',
          path: '/erp',
          isTBD: true,
        },
      ],
    },
    {
      id: 'crm',
      label: 'CRM',
      rootPath: '/crm',
      iconName: 'Briefcase',
      subItems: [
        {
          id: 'crm-overview',
          label: 'Overview',
          path: '/crm',
        },
        {
          id: 'crm-modules-tbd',
          label: 'Modules (TBD — Awaiting Requirements)',
          path: '/crm',
          isTBD: true,
        },
      ],
    },
    {
      id: 'hrms',
      label: 'HRMS',
      rootPath: '/hrms',
      iconName: 'Users',
      subItems: [
        {
          id: 'hrms-overview',
          label: 'Overview',
          path: '/hrms',
        },
        {
          id: 'hrms-modules-tbd',
          label: 'Modules (TBD — Awaiting Requirements)',
          path: '/hrms',
          isTBD: true,
        },
      ],
    },
  ],
};
