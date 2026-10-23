import { Download, FileSpreadsheet, X } from 'lucide-react';
import type { ErpReportResult } from '../types/reportTypes';

interface ExportPreviewProps {
  report: ErpReportResult;
  onClose: () => void;
  onDownload: () => void;
}

export function ExportPreview({ report, onClose, onDownload }: ExportPreviewProps) {
  const previewRows = report.rows.slice(0, 4);
  return (
    <div className="erp-report-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section aria-labelledby="erp-export-title" aria-modal="true" className="erp-report-export-modal" role="dialog">
        <div className="erp-report-export-heading"><span className="erp-report-export-icon"><FileSpreadsheet size={20} /></span><button aria-label="Close export preview" className="erp-report-icon-button" onClick={onClose} type="button"><X size={18} /></button><span className="erp-report-panel-kicker">EXPORT PREVIEW</span><h2 id="erp-export-title">{report.title}</h2><p>{report.rows.length} rows · CSV format · USD values</p></div>
        <div className="erp-report-export-preview">
          <div className="erp-report-export-preview-label">PREVIEW <span>First {previewRows.length} rows</span></div>
          <div className="erp-report-export-table-wrap"><table><thead><tr><th>Date</th><th>Record</th><th>Status</th><th>Value</th></tr></thead><tbody>{previewRows.map((row) => <tr key={row.id}><td>{row.date}</td><td>{row.primary}</td><td>{row.status.replaceAll('_', ' ')}</td><td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(row.value)}</td></tr>)}</tbody></table></div>
        </div>
        <div className="erp-report-export-actions"><button className="erp-report-button erp-report-button-secondary" onClick={onClose} type="button">Cancel</button><button className="erp-report-button erp-report-button-primary" onClick={onDownload} type="button"><Download size={16} /><span>Download CSV</span></button></div>
      </section>
    </div>
  );
}