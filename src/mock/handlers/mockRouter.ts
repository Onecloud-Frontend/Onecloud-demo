import { ApiResponseEnvelope } from '@core/api/types';
import { erpMockHandlers } from '../erp';
import { crmMockHandlers } from '../crm';
import { hrmsMockHandlers } from '../hrms';
import { financeMockHandlers } from '../finance';

export async function routeMockRequest<T>(
  method: string,
  path: string,
  _body?: unknown
): Promise<ApiResponseEnvelope<T>> {
  const normalizedPath = path.toLowerCase().replace(/^\//, '');

  if (normalizedPath.startsWith('erp')) {
    if (normalizedPath.includes('workspace-status') || normalizedPath === 'erp') {
      const res = await erpMockHandlers.getWorkspaceStatus();
      return res as unknown as ApiResponseEnvelope<T>;
    }
  }

  if (normalizedPath.startsWith('crm')) {
    if (normalizedPath.includes('workspace-status') || normalizedPath === 'crm') {
      const res = await crmMockHandlers.getWorkspaceStatus();
      return res as unknown as ApiResponseEnvelope<T>;
    }
  }

  if (normalizedPath.startsWith('hrms')) {
    if (normalizedPath.includes('workspace-status') || normalizedPath === 'hrms') {
      const res = await hrmsMockHandlers.getWorkspaceStatus();
      return res as unknown as ApiResponseEnvelope<T>;
    }
  }

  
  if (normalizedPath.startsWith('finance')) {
    if (normalizedPath.includes('workspace-status') || normalizedPath === 'finance') {
      const res = await financeMockHandlers.getWorkspaceStatus();
      return res as unknown as ApiResponseEnvelope<T>;
    }
  }

  throw new Error(`Mock handler for route [${method} ${path}] is not registered. (TBD — Backend Contract Required)`);
}
