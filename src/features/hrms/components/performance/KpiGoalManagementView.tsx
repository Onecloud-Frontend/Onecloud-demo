import React, { useState } from 'react';
import { PerformanceGoal, KPI, Employee, Department } from '../../types';
import { GoalSettingView } from './GoalSettingView';
import { KpiTrackingView } from './KpiTrackingView';
import { Target, Gauge } from 'lucide-react';

interface KpiGoalManagementViewProps {
  goals: PerformanceGoal[];
  kpis: KPI[];
  employees: Employee[];
  departments: Department[];
  onAddGoal: (goal: Omit<PerformanceGoal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateGoalProgress: (id: string, progress: number) => void;
}

export const KpiGoalManagementView: React.FC<KpiGoalManagementViewProps> = ({
  goals,
  kpis,
  employees,
  departments,
  onAddGoal,
  onUpdateGoalProgress,
}) => {
  const [subView, setSubView] = useState<'goals' | 'kpis'>('goals');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Sub-navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-elevated)',
          padding: '10px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setSubView('goals')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: subView === 'goals' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: subView === 'goals' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Target size={14} /> Individual & Team Goals ({goals.length})
          </button>
          <button
            onClick={() => setSubView('kpis')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: subView === 'kpis' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: subView === 'kpis' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Gauge size={14} /> Department KPI Scorecards ({kpis.length})
          </button>
        </div>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Milestone Metrics & Target Thresholds
        </span>
      </div>

      {subView === 'goals' && (
        <GoalSettingView
          goals={goals}
          employees={employees}
          onAddGoal={onAddGoal}
          onUpdateGoalProgress={onUpdateGoalProgress}
        />
      )}

      {subView === 'kpis' && (
        <KpiTrackingView kpis={kpis} departments={departments} />
      )}
    </div>
  );
};
