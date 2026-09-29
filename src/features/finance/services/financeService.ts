import { apiClient } from '@core/api/client';
import { ApiResponseEnvelope } from '@core/api/types';
import { FinanceWorkspaceStatus } from '../types';

export const financeService = {
  getWorkspaceStatus: async (): Promise<ApiResponseEnvelope<FinanceWorkspaceStatus>> => {
    return apiClient.get<FinanceWorkspaceStatus>('/finance/workspace-status');
  },
};
