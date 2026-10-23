import { ChartNoAxesColumnIncreasing } from 'lucide-react';
import type { ErpReportPoint } from '../types/reportTypes';

interface ReportChartProps {
  title: string;
  points: ErpReportPoint[];
}

const compactNumber = (value: number) => new Intl.NumberFormat('en-US', {
  notation: 'compact', maximumFractionDigits: 1,
}).format(value);

export function ReportChart({ title, points }: ReportChartProps) {
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  return (
    <section className="erp-report-panel erp-report-chart-panel">
      <div className="erp-report-panel-heading"><div><span className="erp-report-panel-kicker">TREND</span><h2>{title}</h2></div><span className="erp-report-panel-icon"><ChartNoAxesColumnIncreasing size={18} /></span></div>
      {points.length ? (
        <div className="erp-report-chart" role="list" aria-label={`${title}, ${points.length} data points`}>
          {points.map((point) => (
            <div
              className="erp-report-chart-column erp-chart-tooltip"
              key={point.label}
              role="listitem"
              tabIndex={0}
              title={`${point.label}: ${new Intl.NumberFormat('en-US').format(point.value)}`}
              aria-label={`${point.label}: ${new Intl.NumberFormat('en-US').format(point.value)}`}
              data-tooltip={`${point.label}: ${new Intl.NumberFormat('en-US').format(point.value)}`}
            >
              <span className="erp-report-chart-value">{compactNumber(point.value)}</span>
              <div className="erp-report-chart-track"><span style={{ height: `${Math.max(8, (point.value / maxValue) * 100)}%` }} /></div>
              <span className="erp-report-chart-label">{point.label}</span>
            </div>
          ))}
        </div>
      ) : <p className="erp-report-chart-empty">Run the report to see activity over time.</p>}
      <div className="erp-report-chart-axis"><span>REPORTING PERIOD</span><span>{points.length ? `${points.length} points` : 'No activity'}</span></div>
    </section>
  );
}