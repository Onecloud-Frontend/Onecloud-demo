export type PermissionKey =
  | 'platform.admin.manage'
  | 'hrms.employees.read'
  | 'hrms.employees.write'
  | 'finance.ledger.read'
  | 'finance.ledger.write';

export const checkPermission = (userRoles: string[], requiredRole: string): boolean => {
  if (userRoles.includes('EnterpriseAdmin')) return true;
  return userRoles.includes(requiredRole);
};
