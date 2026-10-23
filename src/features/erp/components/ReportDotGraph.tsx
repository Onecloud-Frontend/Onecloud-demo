import { ScatterChart } from 'lucide-react';

export function ReportDotGraph({ title, data }: { title: string, data: { x: string, y: number, z: number }[] }) {
  const maxY = Math.max(...data.map(d => d.y), 1);
  
  return (
    <section className="erp-report-panel erp-report-chart-panel">
       <div className="erp-report-panel-heading">
        <div><span className="erp-report-panel-kicker">DISTRIBUTION</span><h2>{title}</h2></div>
        <span className="erp-report-panel-icon"><ScatterChart size={18} /></span>
      </div>
      <div className="erp-report-dot-plot">
        {data.map((d, i) => (
          <div key={i} className="erp-chart-tooltip" data-tooltip={`${d.x}: ${d.y}`} aria-label={`${d.x}: ${d.y}, size ${d.z}`} tabIndex={0} title={`${d.x}: ${d.y}, size ${d.z}`} style={{
            position: 'absolute',
            left: `${4 + (i / Math.max(data.length - 1, 1)) * 92}%`,
            bottom: `${8 + (d.y / maxY) * 84}%`,
            width: `${Math.min(d.z, 30)}px`, height: `${Math.min(d.z, 30)}px`,
            backgroundColor: '#34d399', borderRadius: '50%',
            transform: 'translate(-50%, 50%)', opacity: 0.8
          }} />
        ))}
      </div>
    </section>
  );
}