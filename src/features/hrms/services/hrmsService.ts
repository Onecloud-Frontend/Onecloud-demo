import { apiClient } from '@core/api/client';
import { ApiResponseEnvelope } from '@core/api/types';
import { HrmsWorkspaceStatus } from '../types';

/**
 * HRMS Domain Service
 * Encapsulates all data communication for the HRMS domain.
 * Communicates through the Core API Client proxy.
 */
export const hrmsService = {
  /**
   * Fetch current HRMS workspace status
   */
  async getWorkspaceStatus(): Promise<ApiResponseEnvelope<HrmsWorkspaceStatus>> {
    return apiClient.get<HrmsWorkspaceStatus>('/hrms/workspace-status');
  },
};
