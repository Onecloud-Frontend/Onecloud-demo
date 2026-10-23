import { ApiResponseEnvelope } from '@core/api/types';
import { ErpWorkspaceStatus } from '@features/erp/types';
import { mockErpReportSource, mockErpWorkspaceStatus } from './erpMockData';
import { delay, createMockEnvelope } from '../data/commonMockData';

export const erpMockHandlers = {
  async getReportSource(): Promise<ApiResponseEnvelope<typeof mockErpReportSource>> {
    await delay(300);
    return createMockEnvelope(mockErpReportSource, 'ERP report source data loaded');
  },

  async getWorkspaceStatus(): Promise<ApiResponseEnvelope<ErpWorkspaceStatus>> {
    await delay(250);
    return createMockEnvelope(mockErpWorkspaceStatus, 'ERP workspace baseline loaded from mock adapter');
  },
};
