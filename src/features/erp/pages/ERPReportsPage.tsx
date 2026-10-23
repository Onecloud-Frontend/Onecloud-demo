// src/pages/ERPReportsPage.tsx
import { useState } from 'react';
import { ExportPreview } from '../components/ExportPreview';
import { ReportExceptions } from '../components/ReportExceptions';
import { ReportFilterPanel } from '../components/ReportFilterPanel';
import { ReportHeader } from '../components/ReportHeader';
import { ReportKpiCards } from '../components/ReportKpiCards';
import { ReportResultsTable } from '../components/ReportResultsTable';
import { ReportTypeSelector } from '../components/ReportTypeSelector';
import { ReportChart } from '../components/ReportChart';
import { ReportEmptyState } from '../components/ReportEmptyState';
import { InventoryValuationReport } from '../inventory/InventoryValuationReport';
import { VendorDeliveryPerformanceReport } from '../vendors/VendorDeliveryPerformanceReport';
import { CarrierTurnaroundReport } from '../logistics/CarrierTurnaroundReport';
import { StockMovementReport } from '../movements/StockMovementReport';
import { useERPReports } from '../hooks/useERPReports';
// import { erpReportService } from '../services/reportService'; // Remove if unused
// mockErpReportSource tho patu layeredChartMockData ni kuda import cheskondi
import { layeredChartMockData } from '@mock/erp/erpMockData';
import type { ErpReportRow } from '../types/reportTypes';
import './ERPReportsPage.css';
import { ProfitLossAnalysisReport } from '../reports/ProfitLossAnalysisReport';
// LayeredAreaChart ni import cheskondi
import { LayeredAreaChart } from '../components/LayeredAreaChart'; 
import { ReportPieChart } from '../components/ReportPieChart';

function escapeCsv(value: string | number) {
  const text = String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function downloadReport(rows: ErpReportRow[], title: string) {
  const headers = ['Date', 'Record', 'Reference', 'Location or method', 'Quantity', 'Value USD', 'Status', 'Details'];
  const content = [headers, ...rows.map((row) => [row.date, row.primary, row.secondary, row.warehouse, row.quantity, row.value, row.status, row.detail])]
    .map((row) => row.map(escapeCsv).join(',')).join('\r\n');
  const blob = new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function ERPReportsPage() {
  const {
    activeReport, filters, report, warehouses, isLoading, error, isExportPreviewOpen,
    setIsExportPreviewOpen, updateFilters, selectReport, executeReport,
  } = useERPReports();
  const [exportError, setExportError] = useState<string | null>(null);

  const handleRun = () => { void executeReport(); };
  const handleReset = () => {
    const defaults = { from: '2026-09-06', to: '2026-10-06', warehouseId: 'all', status: 'all', search: '' };
    updateFilters(defaults);
    void executeReport(activeReport, defaults);
  };

  const handleDownload = () => {
    if (!report) return;
    try {
      downloadReport(report.rows, report.title);
      setExportError(null);
      setIsExportPreviewOpen(false);
    } catch (caughtError) {
      setExportError(caughtError instanceof Error ? caughtError.message : 'The CSV file could not be created.');
    }
  };

  return (
    <main className="erp-reports-page">
      <div className="erp-reports-shell">
        <ReportHeader activeReport={activeReport} report={report} isLoading={isLoading} onRun={handleRun} onExport={() => { setExportError(null); setIsExportPreviewOpen(true); }} />
        <ReportTypeSelector activeReport={activeReport} onSelect={selectReport} />
        <ReportFilterPanel activeReport={activeReport} filters={filters} warehouses={warehouses} isLoading={isLoading} onChange={updateFilters} onApply={handleRun} onReset={handleReset} />
        {exportError && <div className="erp-report-inline-error" role="alert">{exportError}</div>}
        {error ? <ReportEmptyState error={error} isLoading={isLoading} onRetry={handleRun} /> : !report ? <ReportEmptyState error={null} isLoading={isLoading} onRetry={handleRun} /> : (
          <>
            {report.type !== 'profit-loss' && <ReportKpiCards metrics={report.metrics} isLoading={isLoading} />}
            {report.type === 'inventory-valuation' && <InventoryValuationReport report={report} />}
            {report.type === 'vendor-delivery' && <VendorDeliveryPerformanceReport report={report} />}
            {report.type === 'carrier-turnaround' && <CarrierTurnaroundReport report={report} />}
            {report.type === 'stock-movement' && <StockMovementReport report={report} />}
            {report.type === 'profit-loss' && <ProfitLossAnalysisReport report={report} />}
        
              <>
                <div className="erp-report-main-grid">
                  <ReportChart title={report.chartTitle} points={report.chartPoints} />
                  <ReportExceptions exceptions={report.exceptions} />
                </div>
                
                {/* Ikkada alignment CSS fix chesamu[cite: 27] */}
                {report.type !== 'profit-loss' && (
                    <div className="erp-report-main-grid">
                      {/* Dynamic Layered Area Chart */}
                      <LayeredAreaChart 
                        title={`${report.title} Volume Trend`} 
                        seriesData={layeredChartMockData[report.type] || layeredChartMockData['inventory-valuation']} 
                      />

                      <ReportPieChart
                        title="Status Distribution"
                        data={[
                          { label: 'Completed', value: 45, color: '#34d399' },
                          { label: 'In Transit', value: 25, color: '#38bdf8' },
                          { label: 'Exceptions', value: 10, color: '#f87171' },
                        ]}
                      />
                    </div>
                )}
              </>
         
            <ReportResultsTable rows={report.rows} activeReport={activeReport} />
          </>
        )}
      </div>
      {isExportPreviewOpen && report && <ExportPreview report={report} onClose={() => setIsExportPreviewOpen(false)} onDownload={handleDownload} />}
    </main>
  );
}