import { ArrowDown, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ErpReportRow, ErpReportType } from '../types/reportTypes';
import { useState } from 'react';

interface ReportResultsTableProps {
  rows: ErpReportRow[];
  activeReport: ErpReportType;
}

const currency = (value: number) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0,
}).format(value);

const shortDate = (value: string) => new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${value.slice(0, 10)}T00:00:00Z`));

const quantityLabel: Record<ErpReportType, string> = {
  'inventory-valuation': 'On hand',
  'vendor-delivery': 'POs',
  'carrier-turnaround': 'Variance',
  'stock-movement': 'Quantity',
  'profit-loss': 'Profit/Loss',
};

const valueLabel: Record<ErpReportType, string> = {
  'inventory-valuation': 'Stock value',
  'vendor-delivery': 'PO value',
  'carrier-turnaround': 'Freight cost',
  'stock-movement': 'Cost value',
  'profit-loss': 'Revenue',
};

export function ReportResultsTable({ rows, activeReport }: ReportResultsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const paginatedRows = rows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <section className="erp-report-panel erp-report-results-panel">
      <div className="erp-report-panel-heading erp-report-results-heading">
        <div><span className="erp-report-panel-kicker">DETAIL</span><h2>Report results <span>{rows.length}</span></h2></div>
        <button className="erp-report-sort-button" type="button" title="Sorted by date, newest first"><ArrowDown size={14} /><span>Newest first</span><ArrowUpDown size={14} /></button>
      </div>
      {rows.length ? (
        <div className="erp-report-table-wrap">
          <table className="erp-report-table">
            <thead><tr><th>Date</th><th>Record</th><th>Location / method</th><th>{quantityLabel[activeReport]}</th><th>{valueLabel[activeReport]}</th><th>Status</th></tr></thead>
            <tbody>
              {paginatedRows.map(row => (
                <tr key={row.id}>
                  <td className="erp-report-date-cell">{shortDate(row.date)}</td>
                  <td><strong className="erp-report-row-name">{row.primary}</strong><span className="erp-report-row-secondary">{row.secondary}</span><span className="erp-report-row-detail">{row.detail}</span></td>
                  <td className="erp-report-location-cell">{row.warehouse}</td>
                  <td className="erp-report-number-cell">{activeReport === 'carrier-turnaround' && row.quantity > 0 ? `+${row.quantity} days` : activeReport === 'carrier-turnaround' ? `${row.quantity} days` : row.quantity.toLocaleString()}</td>
                  <td className="erp-report-value-cell">{currency(row.value)}</td>
                  <td><span className={`erp-report-status status-${row.status.toLowerCase().replaceAll('_', '-')}`}>{row.status.replaceAll('_', ' ')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <div className="erp-report-table-empty"><ArrowUpDown size={18} /><p>No matching rows. Adjust the filters or reporting period.</p></div>}
      <div className="erp-report-table-footer" style={{ alignItems: 'center' }}>
        <span>Showing {paginatedRows.length} of {rows.length} records</span>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(p => p - 1)}
            style={{ padding: '4px 8px', background: 'transparent', border: '1px solid rgba(148, 163, 184, 0.2)', color: '#b3c0d3', borderRadius: '4px', cursor: 'pointer' }}
          ><ChevronLeft size={14} /></button>
          
          <span style={{ fontSize: '11px', color: '#e2eaf5' }}>Page {currentPage} of {totalPages || 1}</span>
          
          <button 
            disabled={currentPage === totalPages || totalPages === 0} 
            onClick={() => setCurrentPage(p => p + 1)}
            style={{ padding: '4px 8px', background: 'transparent', border: '1px solid rgba(148, 163, 184, 0.2)', color: '#b3c0d3', borderRadius: '4px', cursor: 'pointer' }}
          ><ChevronRight size={14} /></button>
        </div>
      </div>
    </section>
  );
}