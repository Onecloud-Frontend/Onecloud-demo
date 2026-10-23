import { Truck } from 'lucide-react';
import type { ErpReportResult } from '../types/reportTypes';
import { ReportPieChart } from '../components/ReportPieChart';
import { CombinedAdvancedChart } from '../components/CombinedAdvancedChart';

interface CarrierTurnaroundReportProps { report: ErpReportResult }

export function CarrierTurnaroundReport({ report }: CarrierTurnaroundReportProps) {
  let totalDelivered = 0, totalLate = 0, totalExceptions = 0;

  const carriers = [...report.rows].reduce((totals, row) => {
    const current = totals.get(row.primary) ?? { delivered: 0, late: 0, exceptions: 0 };
    if (row.status === 'DELIVERED') { current.delivered += 1; totalDelivered += 1; }
    if (row.quantity > 0) { current.late += 1; totalLate += 1; }
    if (row.status === 'EXCEPTION') { current.exceptions += 1; totalExceptions += 1; }
    totals.set(row.primary, current);
    return totals;
  }, new Map<string, { delivered: number; late: number; exceptions: number }>());

  const pieData = [
    { label: 'On Time', value: Math.max(0, totalDelivered - totalLate), color: '#34d399' },
    { label: 'Late', value: totalLate, color: '#fbbf24' },
    { label: 'Exceptions', value: totalExceptions, color: '#f87171' }
  ].filter(d => d.value > 0);
  const carrierData = report.rows.slice(0, 7).map(r => ({
  label: r.primary, barValue: r.value / 10, areaValue: Math.abs(r.quantity) * 50, dotValue: r.value / 15
}));

  return (
    <div className="erp-report-visual-grid erp-stagger-fade-in">
      {pieData.length > 0 && <ReportPieChart title="Delivery Status Breakdown" data={pieData} />}
      
      <CombinedAdvancedChart title="Carrier Efficiency Overlap" data={carrierData} />
      <section className="erp-report-insight">
        <div className="erp-report-insight-heading"><span><Truck size={16} /></span><div><strong>Carrier delivery desk</strong><small>Confirmed deliveries and shipments needing attention</small></div></div>
        <div className="erp-report-carrier-list">
          {[...carriers.entries()].map(([name, stats]) => (
            <div
              className="erp-report-carrier-row erp-chart-tooltip erp-hover-scale"
              key={name}
              tabIndex={0}
              data-tooltip={`${name} - Delivered: ${stats.delivered} | Late: ${stats.late} | Exceptions: ${stats.exceptions}`}
            >
              <strong>{name}</strong>
              <span>{stats.delivered} delivered</span>
              <span className={stats.late || stats.exceptions ? 'has-alert' : ''}>{stats.late + stats.exceptions} attention</span>
            </div>
          ))}
        </div>
        {carriers.size === 0 && <p className="erp-report-insight-empty">No shipments match these filters.</p>}
      </section>
    </div>
  );
}