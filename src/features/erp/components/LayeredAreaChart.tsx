// src/components/LayeredAreaChart.tsx
import { Activity } from 'lucide-react';

export interface AreaSeries {
  label: string;
  points: number[];
  color: string;
}

function createSmoothPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

  return points.slice(0, -1).reduce((path, point, index) => {
    const next = points[index + 1];
    const previous = points[Math.max(0, index - 1)];
    const afterNext = points[Math.min(points.length - 1, index + 2)];
    const control1X = point.x + (next.x - previous.x) / 6;
    const control1Y = point.y + (next.y - previous.y) / 6;
    const control2X = next.x - (afterNext.x - point.x) / 6;
    const control2Y = next.y - (afterNext.y - point.y) / 6;

    return `${path} C ${control1X},${control1Y} ${control2X},${control2Y} ${next.x},${next.y}`;
  }, `M ${points[0].x},${points[0].y}`);
}

export function LayeredAreaChart({ title, seriesData }: { title: string, seriesData: AreaSeries[] }) {
  // Find maximum value across all series to scale the Y-axis correctly
  const allPoints = seriesData.flatMap(s => s.points);
  const max = Math.max(...allPoints, 1);
  const numPoints = seriesData[0]?.points.length || 1;

  return (
    <section className="erp-report-panel erp-report-chart-panel erp-layered-area-chart">
      <div className="erp-report-panel-heading">
        <div><span className="erp-report-panel-kicker">LAYERED AREA TREND</span><h2>{title}</h2></div>
        <span className="erp-report-panel-icon"><Activity size={18} /></span>
      </div>
      <div style={{ height: '160px', marginTop: '20px', width: '100%', position: 'relative' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label={`${title} layered area graph`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {seriesData.map((series) => {
            const plottedPoints = series.points.map((value, index) => ({
              value,
              x: numPoints === 1 ? 50 : (index / (numPoints - 1)) * 100,
              y: 100 - (value / max) * 100,
            }));
            const linePath = createSmoothPath(plottedPoints);
            const curvePath = plottedPoints.length > 1 ? linePath.slice(linePath.indexOf(' C')) : '';
            const areaPath = plottedPoints.length > 0
              ? `M ${plottedPoints[0].x},100 L ${plottedPoints[0].x},${plottedPoints[0].y}${curvePath} L ${plottedPoints[plottedPoints.length - 1].x},100 Z`
              : '';
            
            return (
              <g key={series.label} className="erp-layered-area-series">
                {series.points.length > 0 && (
                  <path className="erp-layered-area-fill" d={areaPath} fill={series.color} fillOpacity="0.18" />
                )}
                {series.points.length > 0 && (
                  <path className="erp-layered-area-line" d={linePath} fill="none" stroke={series.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                )}
                {plottedPoints.map(({ value, x, y }, index) => (
                  <circle className="erp-layered-area-point" key={`${index}-${value}`} cx={x} cy={y} r="1.8" fill={series.color} stroke="#0c1422" strokeWidth="0.8" style={{ animationDelay: `${index * 90}ms` }}>
                    <title>{`${series.label} - Point ${index + 1}: ${value}`}</title>
                  </circle>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      {/* Legend for Layered Chart */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {seriesData.map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: s.color, borderRadius: '2px', opacity: 0.8 }}></div>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}