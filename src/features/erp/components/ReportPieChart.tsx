import { PieChart as PieIcon } from 'lucide-react';

export function ReportPieChart({ title, data }: { title: string, data: { label: string, value: number, color: string }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const circumference = 2 * Math.PI * 42;
  let offset = 0;

  return (
    <section className="erp-report-insight">
      <div className="erp-report-insight-heading">
        <span><PieIcon size={16} /></span>
        <div><strong>{title}</strong><small>Distribution breakdown</small></div>
      </div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
        <svg viewBox="0 0 120 120" role="img" aria-label={`${title}, ${total} total`} style={{ width: '120px', height: '120px', flexShrink: 0, transform: 'rotate(-90deg)' }}>
          <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(148, 163, 184, .12)" strokeWidth="18" />
          {data.map((item) => {
            const segmentLength = total ? (item.value / total) * circumference : 0;
            const percentage = total ? ((item.value / total) * 100).toFixed(1) : '0.0';
            const segmentOffset = offset;
            offset += segmentLength;
            return (
              <circle
                key={item.label}
                cx="60"
                cy="60"
                r="42"
                fill="none"
                stroke={item.color}
                strokeWidth="18"
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={-segmentOffset}
                tabIndex={0}
                aria-label={`${item.label}: ${item.value} (${percentage}%)`}
              >
                <title>{`${item.label}: ${item.value} (${percentage}%)`}</title>
              </circle>
            );
          })}
        </svg>
        <div style={{ display: 'grid', gap: '8px', flex: 1, minWidth: '150px' }}>
          {data.map((d) => {
            const percentage = total ? ((d.value / total) * 100).toFixed(1) : '0.0';
            return (
            <div key={d.label} title={`${d.label}: ${d.value} (${percentage}%)`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#b3c0d3' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: d.color }} />
                {d.label}
              </span>
              <strong style={{ color: '#e2eaf5' }}>{percentage}%</strong>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}