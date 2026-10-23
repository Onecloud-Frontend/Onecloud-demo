import { ApiResponseEnvelope } from '@core/api/types';
import { ErpWorkspaceStatus } from '@features/erp/types';
import { mockErpWorkspaceStatus } from './erpMockData';
import { delay, createMockEnvelope } from '../data/commonMockData';
import {ERPDashboardData,} from '@features/erp/types/dashboard';
import {mockErpDashboardData,} from './erpDashboardMockData';


export const erpMockHandlers = {
  async getWorkspaceStatus(): Promise<ApiResponseEnvelope<ErpWorkspaceStatus>> {
    await delay(250);
    return createMockEnvelope(mockErpWorkspaceStatus, 'ERP workspace baseline loaded from mock adapter');
  },
 
  async getDashboardData(): Promise<ApiResponseEnvelope<ERPDashboardData>> 
  {
    await delay(300);
    return createMockEnvelope(mockErpDashboardData,'ERP dashboard data loaded from mock adapter',);
  },
};
