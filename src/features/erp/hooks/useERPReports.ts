import { useCallback, useEffect, useState } from 'react';
import { erpReportService } from '../services/reportService';
import type { ErpReportFilters, ErpReportResult, ErpReportType } from '../types/reportTypes';

const initialFilters: ErpReportFilters = {
  from: '2026-09-06',
  to: '2026-10-06',
  warehouseId: 'all',
  status: 'all',
  search: '',
};

export function useERPReports() {
  const [activeReport, setActiveReport] = useState<ErpReportType>('inventory-valuation');
  const [filters, setFilters] = useState<ErpReportFilters>(initialFilters);
  const [report, setReport] = useState<ErpReportResult | null>(null);
  const [warehouses, setWarehouses] = useState<Awaited<ReturnType<typeof erpReportService.getReportSource>>['warehouses']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExportPreviewOpen, setIsExportPreviewOpen] = useState(false);

  const executeReport = useCallback(async (type = activeReport, nextFilters = filters) => {
    setIsLoading(true);
    setError(null);
    try {
      const source = await erpReportService.getReportSource();
      const result = await erpReportService.runReport({ type, filters: nextFilters }, source);
      setWarehouses(source.warehouses);
      setReport(result);
      setActiveReport(type);
    } catch (caughtError) {
      setReport(null);
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to run this report.');
    } finally {
      setIsLoading(false);
    }
  }, [activeReport, filters]);

  useEffect(() => {
    void executeReport('inventory-valuation', initialFilters);
  }, []);

  const updateFilters = useCallback((nextFilters: ErpReportFilters) => {
    setFilters(nextFilters);
  }, []);

  const selectReport = useCallback((type: ErpReportType) => {
    setActiveReport(type);
    void executeReport(type, filters);
  }, [executeReport, filters]);

  return {
    activeReport,
    filters,
    warehouses,
    report,
    isLoading,
    error,
    isExportPreviewOpen,
    setIsExportPreviewOpen,
    updateFilters,
    selectReport,
    executeReport: (type = activeReport, nextFilters = filters) => executeReport(type, nextFilters),
  };
}