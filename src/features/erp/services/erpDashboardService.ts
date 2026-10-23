import { erpMockHandlers } from '@mock/erp';
import type { ERPDashboardData } from '@features/erp/types/dashboard';

export const erpDashboardService = {
  async getDashboardData(): Promise<ERPDashboardData> {
    const response = await erpMockHandlers.getDashboardData();

    return response.data;
  },
};