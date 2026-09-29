import { apiClient } from '@core/api/client';
import { ApiResponseEnvelope } from '@core/api/types';
import { CrmWorkspaceStatus } from '../types';

/**
 * CRM Domain Service
 * Encapsulates all data communication for the CRM domain.
 * Communicates through the Core API Client proxy.
 */
export const crmService = {
  /**
   * Fetch current CRM workspace status
   */
  async getWorkspaceStatus(): Promise<ApiResponseEnvelope<CrmWorkspaceStatus>> {
    return apiClient.get<CrmWorkspaceStatus>('/crm/workspace-status');
  },
};
