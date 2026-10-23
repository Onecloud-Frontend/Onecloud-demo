import { Download, RefreshCw } from 'lucide-react';
import type { ErpReportResult, ErpReportType } from '../types/reportTypes';

const reportTitles: Record<ErpReportType, string> = {
  'inventory-valuation': 'Inventory valuation',
  'vendor-delivery': 'Vendor performance',
  'carrier-turnaround': 'Carrier turnaround',
  'stock-movement': 'Stock movement',
};

interface ReportHeaderProps {
  activeReport: ErpReportType;
  report: ErpReportResult | null;
  isLoading: boolean;
  onRun: () => void;
  onExport: () => void;
}

export function ReportHeader({ activeReport, report, isLoading, onRun, onExport }: ReportHeaderProps) {
  const generatedAt = report?.generatedAt
    ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(report.generatedAt))
    : 'Not run yet';

  return (
    <header className="erp-report-header">
      <div className="erp-report-heading">
        <div className="erp-report-eyebrow"><span /> ERP ANALYTICS <span className="erp-report-eyebrow-divider">/</span> REPORTS</div>
        <h1>Operational reports</h1>
        <p>One clear view across stock, suppliers, shipments, and movement activity.</p>
        <div className="erp-report-generated">Last generated <strong>{generatedAt}</strong></div>
      </div>
      <div className="erp-report-actions">
        <button className="erp-report-button erp-report-button-secondary" type="button" onClick={onRun} disabled={isLoading}>
          <RefreshCw size={16} className={isLoading ? 'erp-report-spinning' : ''} />
          <span>{isLoading ? 'Running...' : 'Run report'}</span>
        </button>
        <button className="erp-report-button erp-report-button-primary" type="button" onClick={onExport} disabled={!report?.rows.length || isLoading}>
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
      <span className="erp-report-current-title" aria-live="polite">{report?.title ?? reportTitles[activeReport]}</span>
    </header>
  );
}