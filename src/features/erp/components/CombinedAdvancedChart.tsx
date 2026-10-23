// src/features/erp/components/CombinedAdvancedChart.tsx
import { BarChart2 } from 'lucide-react';

export interface CombinedChartData {
  label: string;
  barValue: number;
  areaValue: number;
  dotValue: number;
}

export function CombinedAdvancedChart({ title, data }: { title: string, data: CombinedChartData[] }) {
  const plot = { left: 4, right: 96, top: 8, bottom: 92 };
  const maxBar = Math.max(...data.map((point) => point.barValue), 1);
  const maxArea = Math.max(...data.map((point) => point.areaValue), 1);
  const maxDot = Math.max(...data.map((point) => point.dotValue), 1);
  const xPosition = (index: number) => plot.left + (index / Math.max(data.length - 1, 1)) * (plot.right - plot.left);
  const yPosition = (value: number, max: number) => plot.bottom - (value / max) * (plot.bottom - plot.top);

  const createAreaPath = (points: {x: number, y: number}[]) => {
    if (points.length === 0) return '';
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
    return `${path} L ${points[points.length - 1].x},${plot.bottom} L ${points[0].x},${plot.bottom} Z`;
  };

  const areaPoints = data.map((d, i) => ({
    x: xPosition(i),
    y: yPosition(d.areaValue, maxArea)
  }));

  return (
    <section className="erp-report-panel erp-report-chart-panel erp-hover-scale erp-stagger-fade-in">
      <div className="erp-report-panel-heading">
        <div><span className="erp-report-panel-kicker">ADVANCED METRICS</span><h2>{title}</h2></div>
        <span className="erp-report-panel-icon"><BarChart2 size={18} /></span>
      </div>
      <div className="erp-combined-chart-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label={`${title} combined metrics`}>
          
          {/* 1. Bar Graph Layer */}
          {data.map((d, i) => {
            const yPos = yPosition(d.barValue, maxBar);
            const xPos = xPosition(i);
            return (
              <rect 
                key={`bar-${i}`} x={xPos - 2} y={yPos} width="4" height={plot.bottom - yPos} 
                fill="#38bdf8" opacity="0.6" rx="1" 
                className="erp-chart-tooltip erp-animated-bar" 
                data-tooltip={`${d.label} Bar: ${d.barValue}`} 
                tabIndex={0}
              >
                <title>{`${d.label} Bar: ${d.barValue}`}</title>
              </rect>
            );
          })}

          {/* 2. Area Graph Layer */}
          {areaPoints.length > 0 && (
            <path 
              d={createAreaPath(areaPoints)} 
              fill="#a8d29b" fillOpacity="0.25" stroke="#a8d29b" strokeWidth="1.5" 
              className="erp-animated-area"
            >
              <title>{`${title} area series`}</title>
            </path>
          )}

          {/* 3. Dot Graph Layer */}
          {data.map((d, i) => {
            const yPos = yPosition(d.dotValue, maxDot);
            const xPos = xPosition(i);
            return (
              <circle 
                key={`dot-${i}`} cx={xPos} cy={yPos} r="2.5" 
                fill="#fbbf24" stroke="#0c1422" strokeWidth="0.8"
                className="erp-chart-tooltip erp-animated-dot" 
                data-tooltip={`${d.label} Dot: ${d.dotValue}`} 
                tabIndex={0} style={{ animationDelay: `${i * 100}ms` }}
              >
                <title>{`${d.label} Dot: ${d.dotValue}`}</title>
              </circle>
            );
          })}
        </svg>
      </div>
    </section>
  );
}