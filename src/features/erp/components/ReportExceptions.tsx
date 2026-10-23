import { ArrowUpRight, CircleCheck, TriangleAlert } from 'lucide-react';

interface ReportExceptionsProps {
  exceptions: string[];
}

export function ReportExceptions({ exceptions }: ReportExceptionsProps) {
  return (
    <section className="erp-report-panel erp-report-exceptions-panel">
      <div className="erp-report-panel-heading"><div><span className="erp-report-panel-kicker">ATTENTION</span><h2>Exceptions</h2></div><span className="erp-report-exception-count">{exceptions.length.toString().padStart(2, '0')}</span></div>
      {exceptions.length ? (
        <ul className="erp-report-exceptions">
          {exceptions.map((exception) => <li key={exception}><span><TriangleAlert size={16} /></span><p>{exception}</p><ArrowUpRight size={14} /></li>)}
        </ul>
      ) : <div className="erp-report-all-clear"><CircleCheck size={19} /><p>No exceptions found in this reporting period.</p></div>}
      <div className="erp-report-exception-footnote">Based on the filters currently applied</div>
    </section>
  );
}