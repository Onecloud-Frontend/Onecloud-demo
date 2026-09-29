export interface UserSession {
  userId: string;
  email: string;
  name: string;
  roles: string[];
  tenantId: string;
  isAuthenticated: boolean;
}

export const demoSession: UserSession = {
  userId: 'usr_demo_001',
  email: 'architect@oneenterprise.internal',
  name: 'Lead Cloud Architect',
  roles: ['EnterpriseAdmin', 'TenantAdmin'],
  tenantId: 'tenant_global_corp',
  isAuthenticated: true
};
