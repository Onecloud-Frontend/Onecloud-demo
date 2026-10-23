import { Boxes } from 'lucide-react';
import type { ErpReportResult } from '../types/reportTypes';
import { ReportPieChart } from '../components/ReportPieChart';
import { CombinedAdvancedChart } from '../components/CombinedAdvancedChart';

interface InventoryValuationReportProps { report: ErpReportResult }

export function InventoryValuationReport({ report }: InventoryValuationReportProps) {
  const locations = [...report.rows.reduce((totals, row) => totals.set(row.warehouse, (totals.get(row.warehouse) ?? 0) + row.value), new Map<string, number>())]
    .sort((left, right) => right[1] - left[1]).slice(0, 5);

  const max = Math.max(...locations.map(([, value]) => value), 1);
  
  const pieData = locations.map(([name, value], index) => ({
    label: name,
    value,
    color: ['#34d399', '#38bdf8', '#fbbf24', '#f87171', '#a78bfa'][index % 5]
  }));

  const advancedData = report.rows.slice(0, 7).map((r, i) => ({
  label: r.primary, barValue: r.quantity, areaValue: r.value / 100, dotValue: r.quantity * 1.5
}));

  return (
    <div className="erp-report-visual-grid">
      <ReportPieChart title="Warehouse Value Distribution" data={pieData} />
      <CombinedAdvancedChart title="Inventory Combined Metrics" data={advancedData} />
      
      <section className="erp-report-insight">
        <div className="erp-report-insight-heading"><span><Boxes size={16} /></span><div><strong>Value by warehouse</strong><small>On-hand quantity at average unit cost</small></div></div>
        {locations.map(([name, value]) => {
          const formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
          return (
            <div className="erp-report-location-row" key={name}>
              <div><span>{name}</span><strong>{formattedValue}</strong></div>
              <span className="erp-report-location-bar erp-chart-tooltip" data-tooltip={`${name}: ${formattedValue}`} tabIndex={0}>
                <i style={{ width: `${(value / max) * 100}%`, transition: 'width 1s ease-in-out' }} />
              </span>
            </div>
          );
        })}
        {!locations.length && <p className="erp-report-insight-empty">No valuation rows match these filters.</p>}
      </section>
    </div>
  );
}