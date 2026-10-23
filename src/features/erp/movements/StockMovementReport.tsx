import { ArrowDownUp } from 'lucide-react';
import type { ErpReportResult } from '../types/reportTypes';
import { ReportPieChart } from '../components/ReportPieChart';
import { CombinedAdvancedChart } from '../components/CombinedAdvancedChart';

interface StockMovementReportProps { report: ErpReportResult }

export function StockMovementReport({ report }: StockMovementReportProps) {
  const movements = [...report.rows.reduce((totals, row) => totals.set(row.status, (totals.get(row.status) ?? 0) + 1), new Map<string, number>())]
    .sort((left, right) => right[1] - left[1]);

  const max = Math.max(...movements.map(([, count]) => count), 1);
  
  const pieData = movements.map(([type, count], index) => ({
    label: type.replaceAll('_', ' '),
    value: count,
    color: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 5]
  }));
  const moveData = report.rows.slice(0, 7).map(r => ({
  label: r.status, barValue: r.quantity, areaValue: r.value / 50, dotValue: r.quantity * 1.2
}));

  return (
    <div className="erp-report-visual-grid">
      <ReportPieChart title="Movement Composition" data={pieData} />
      <CombinedAdvancedChart title="Movement Dynamics" data={moveData} />
      
      <section className="erp-report-insight">
        <div className="erp-report-insight-heading"><span><ArrowDownUp size={16} /></span><div><strong>Movement mix</strong><small>Recorded events by movement type</small></div></div>
        <div className="erp-report-movement-list">
          {movements.slice(0, 5).map(([type, count]) => (
            <div className="erp-report-movement-row" key={type}>
              <span>{type.replaceAll('_', ' ')}</span>
              <i className="erp-chart-tooltip" data-tooltip={`${type.replaceAll('_', ' ')}: ${count} movements`} tabIndex={0}>
                <b style={{ width: `${(count / max) * 100}%`, transition: 'width 0.8s ease' }} />
              </i>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
        {!movements.length && <p className="erp-report-insight-empty">No stock movements match these filters.</p>}
      </section>
    </div>
  );
}