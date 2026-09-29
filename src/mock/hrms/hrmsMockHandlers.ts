import { ApiResponseEnvelope } from '@core/api/types';
import { HrmsWorkspaceStatus } from '@features/hrms/types';
import { mockHrmsWorkspaceStatus } from './hrmsMockData';
import { delay, createMockEnvelope } from '../data/commonMockData';

export const hrmsMockHandlers = {
  async getWorkspaceStatus(): Promise<ApiResponseEnvelope<HrmsWorkspaceStatus>> {
    await delay(250);
    return createMockEnvelope(mockHrmsWorkspaceStatus, 'HRMS workspace baseline loaded from mock adapter');
  },
};
