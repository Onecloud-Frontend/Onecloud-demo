import { ApiResponseEnvelope } from '@core/api/types';
import { ErpWorkspaceStatus } from '@features/erp/types';
import { mockErpWorkspaceStatus } from './erpMockData';
import { delay, createMockEnvelope } from '../data/commonMockData';

export const erpMockHandlers = {
  async getWorkspaceStatus(): Promise<ApiResponseEnvelope<ErpWorkspaceStatus>> {
    await delay(250);
    return createMockEnvelope(mockErpWorkspaceStatus, 'ERP workspace baseline loaded from mock adapter');
  },
};
