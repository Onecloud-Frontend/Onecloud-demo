import { useCallback, useEffect, useState } from 'react';

import type { ERPDashboardData } from '@features/erp/types/dashboard';
import { erpDashboardService } from '@features/erp/services/erpDashboardService';

interface UseERPDashboardResult {
  data: ERPDashboardData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useERPDashboard = (): UseERPDashboardResult => {
  const [data, setData] = useState<ERPDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const dashboardData =
        await erpDashboardService.getDashboardData();

      setData(dashboardData);
    } catch (err) {
      console.error('Failed to load ERP dashboard', err);

      setError(
        'Unable to load ERP dashboard data.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return {
    data,
    isLoading,
    error,
    refresh: loadDashboard,
  };
};