import React from 'react';
import { KPI, Department } from '../../types';
import { Gauge } from 'lucide-react';

interface KpiTrackingViewProps {
  kpis: KPI[];
  departments: Department[];
}

export const KpiTrackingView: React.FC<KpiTrackingViewProps> = ({ kpis, departments }) => {
  const getDept = (id: string | null) => departments.find((d) => d.id === id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Organizational Key Performance Indicators (KPI Scorecard)
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
          High-level department performance benchmarks, service level agreements, and review intervals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {kpis.map((kpi) => {
          const dept = getDept(kpi.departmentId);

          return (
            <div
              key={kpi.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        padding: '8px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'rgba(99, 102, 241, 0.12)',
                        color: 'var(--brand-primary)',
                      }}
                    >
                      <Gauge size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {kpi.code}
                      </span>
                      <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {kpi.name}
                      </h4>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {kpi.frequency}
                  </span>
                </div>

                <p style={{ margin: '12px 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {kpi.description}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Dept: <strong>{dept?.departmentCode || 'Global'}</strong>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target: </span>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#10b981' }}>
                    {kpi.targetMetric}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
