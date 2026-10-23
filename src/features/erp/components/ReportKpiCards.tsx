import { Activity, AlertTriangle, Boxes, CircleDollarSign, PackageCheck, Truck, UsersRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ErpReportMetric } from '../types/reportTypes';

const icons: LucideIcon[] = [CircleDollarSign, Boxes, AlertTriangle, Activity, UsersRound, Truck, PackageCheck];

interface ReportKpiCardsProps {
  metrics: ErpReportMetric[];
  isLoading: boolean;
}


export function ReportKpiCards({ metrics, isLoading }: ReportKpiCardsProps) {
  if (isLoading && metrics.length === 0) {
    return <div className="erp-report-kpis" aria-label="Loading report metrics">{[1, 2, 3, 4].map((item) => <div className="erp-report-kpi erp-report-kpi-skeleton" key={item} />)}</div>;
  }
  return (
    <section className="erp-report-kpis" aria-label="Report metrics" aria-live="polite">
      {metrics.map((item, index) => {
        const Icon = icons[index % icons.length];
        return (
          <article className={`erp-report-kpi tone-${item.tone}`} key={item.id}>
            <div className="erp-report-kpi-top"><span>{item.label}</span><span className="erp-report-kpi-icon"><Icon size={17} /></span></div>
            <strong>{item.value}</strong>
            <small>{item.context}</small>
          </article>
        );
      })}
    </section>
  );
}