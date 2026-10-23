import { UsersRound } from 'lucide-react';
import type { ErpReportResult } from '../types/reportTypes';
import { ReportDotGraph } from '../components/ReportDotGraph';
import { CombinedAdvancedChart } from '../components/CombinedAdvancedChart';

interface VendorDeliveryPerformanceReportProps { report: ErpReportResult }

export function VendorDeliveryPerformanceReport({ report }: VendorDeliveryPerformanceReportProps) {
  const suppliers = [...report.rows].sort((left, right) => Number(right.detail.match(/([\d.]+) \/ 5/)?.[1] ?? 0) - Number(left.detail.match(/([\d.]+) \/ 5/)?.[1] ?? 0));
  
  const dotData = suppliers.map((row) => ({
    x: row.primary,
    y: Number(row.detail.match(/([\d.]+) \/ 5/)?.[1] ?? 0),
    z: row.value > 0 ? Math.min(Math.max(row.value / 1000, 10), 30) : 10 // Bubble size based on PO value
  }));
  const vendorData = report.rows.slice(0, 7).map(r => ({
  label: r.primary, barValue: r.quantity * 10, areaValue: r.value / 1000, dotValue: Number(r.detail.match(/([\d.]+) \/ 5/)?.[1] ?? 0) * 20
}));

  return (
    <div className="erp-report-visual-grid">
      <ReportDotGraph title="Supplier Rating Matrix" data={dotData} />
      <CombinedAdvancedChart title="Vendor Health Overlay" data={vendorData} />
      
      <section className="erp-report-insight">
        <div className="erp-report-insight-heading"><span><UsersRound size={16} /></span><div><strong>Supplier delivery scores</strong><small>Most recent evaluation for each supplier</small></div></div>
        <div className="erp-report-rating-list">{suppliers.slice(0, 4).map((row) => {
          const rating = Number(row.detail.match(/([\d.]+) \/ 5/)?.[1] ?? 0);
          return (
            <div className="erp-report-rating-row erp-chart-tooltip" key={row.id} tabIndex={0} data-tooltip={`${row.primary}: ${rating.toFixed(1)} / 5 Delivery Score`}>
              <span><strong>{row.primary}</strong><small>{row.secondary}</small></span>
              <span className={`erp-report-rating-score${rating < 4 ? ' is-low' : ''}`}>{rating.toFixed(1)}<small>/ 5</small></span>
            </div>
          );
        })}</div>
        {!suppliers.length && <p className="erp-report-insight-empty">No supplier evaluations match these filters.</p>}
      </section>
    </div>
  );
}