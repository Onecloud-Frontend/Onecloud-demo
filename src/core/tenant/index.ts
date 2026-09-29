export interface TenantInfo {
  tenantId: string;
  tenantName: string;
  tier: 'Enterprise' | 'Professional' | 'Standard';
  region: string;
}

export const activeDemoTenant: TenantInfo = {
  tenantId: 'tenant_global_corp',
  tenantName: 'Global Enterprises Inc.',
  tier: 'Enterprise',
  region: 'ap-south-1'
};
