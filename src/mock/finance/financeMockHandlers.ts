import { ApiResponseEnvelope } from '@core/api/types';
import { FinanceWorkspaceStatus } from '@features/finance/types';
import { mockFinanceWorkspaceStatus } from './financeMockData';
import { delay, createMockEnvelope } from '../data/commonMockData';

export const financeMockHandlers = {
  async getWorkspaceStatus(): Promise<ApiResponseEnvelope<FinanceWorkspaceStatus>> {
    await delay(180);
    return createMockEnvelope(mockFinanceWorkspaceStatus, 'Finance workspace baseline loaded from mock adapter');
  },
};
