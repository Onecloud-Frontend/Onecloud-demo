import { apiClient } from '@core/api/client';
import { ApiResponseEnvelope } from '@core/api/types';
import { ErpWorkspaceStatus } from '../types';

/**
 * ERP Domain Service
 * Encapsulates all data communication for the ERP domain.
 * Communicates through the Core API Client proxy.
 */
export const erpService = {
  /**
   * Fetch current ERP workspace status
   */
  async getWorkspaceStatus(): Promise<ApiResponseEnvelope<ErpWorkspaceStatus>> {
    return apiClient.get<ErpWorkspaceStatus>('/erp/workspace-status');
  },
};
