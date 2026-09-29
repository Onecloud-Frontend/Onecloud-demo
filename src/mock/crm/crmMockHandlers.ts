import { ApiResponseEnvelope } from '@core/api/types';
import { CrmWorkspaceStatus } from '@features/crm/types';
import { mockCrmWorkspaceStatus } from './crmMockData';
import { delay, createMockEnvelope } from '../data/commonMockData';

export const crmMockHandlers = {
  async getWorkspaceStatus(): Promise<ApiResponseEnvelope<CrmWorkspaceStatus>> {
    await delay(250);
    return createMockEnvelope(mockCrmWorkspaceStatus, 'CRM workspace baseline loaded from mock adapter');
  },
};
