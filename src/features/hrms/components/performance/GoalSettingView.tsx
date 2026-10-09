import React, { useState } from 'react';
import { PerformanceGoal, Employee } from '../../types';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';
import { Target, Plus } from 'lucide-react';
import { HrmsModal } from '../common/HrmsModal';
import { TextInput, SelectField, TextareaField, FormRow } from '../common/HrmsFormFields';

interface GoalSettingViewProps {
  goals: PerformanceGoal[];
  employees: Employee[];
  onAddGoal: (goal: Omit<PerformanceGoal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateGoalProgress: (id: string, progress: number) => void;
}

export const GoalSettingView: React.FC<GoalSettingViewProps> = ({
  goals,
  employees,
  onAddGoal,
  onUpdateGoalProgress,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [employeeId, setEmployeeId] = useState(employees[0]?.id || 'emp-7');
  const [weightage, setWeightage] = useState(30);
  const [targetValue, setTargetValue] = useState(100);
  const [dueDate, setDueDate] = useState('2026-11-30');

  const getEmployee = (id: string) => employees.find((e) => e.id === id);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddGoal({
      employeeId,
      cycleId: 'H2-2026',
      title,
      description,
      weightage: Number(weightage),
      targetValue: Number(targetValue),
      achievedValue: 0,
      unit: '%',
      status: 'NOT_STARTED',
      dueDate,
    });
    setTitle('');
    setDescription('');
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Performance Goals & OKR Management (H2 2026)
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Track key organizational deliverables, milestone weightages, and real-time execution progress.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--brand-primary)',
            color: '#ffffff',
            border: 'none',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Plus size={15} /> Set New Goal
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
        {goals.map((goal) => {
          const emp = getEmployee(goal.employeeId);
          const percent = goal.targetValue ? Math.min(100, Math.round(((goal.achievedValue || 0) / goal.targetValue) * 100)) : 0;

          return (
            <div
              key={goal.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Target size={18} color="var(--brand-primary)" />
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Weightage: <strong>{goal.weightage}%</strong>
                    </span>
                  </div>
                  <HrmsStatusBadge status={goal.status} size="sm" />
                </div>

                <h4 style={{ margin: '10px 0 4px', fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {goal.title}
                </h4>

                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {goal.description}
                </p>

                {/* Progress bar & slider */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Completion Progress:</span>
                    <strong style={{ color: percent === 100 ? '#10b981' : 'var(--brand-primary)' }}>
                      {goal.achievedValue || 0} / {goal.targetValue || 100} {goal.unit} ({percent}%)
                    </strong>
                  </div>

                  <div
                    style={{
                      height: '7px',
                      backgroundColor: 'var(--bg-elevated)',
                      borderRadius: '999px',
                      overflow: 'hidden',
                      marginBottom: '10px',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${percent}%`,
                        backgroundColor: percent === 100 ? '#10b981' : 'var(--brand-primary)',
                        borderRadius: '999px',
                        transition: 'width 250ms ease',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span>Update:</span>
                    {[25, 50, 75, 100].map((val) => (
                      <button
                        key={val}
                        onClick={() => onUpdateGoalProgress(goal.id, val)}
                        style={{
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: goal.achievedValue === val ? 'var(--brand-primary)' : 'var(--bg-elevated)',
                          color: goal.achievedValue === val ? '#ffffff' : 'var(--text-secondary)',
                          border: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                        }}
                      >
                        {val}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>
                  Assigned: <strong>{emp ? `${emp.firstName} ${emp.lastName}` : 'Staff'}</strong>
                </span>
                <span style={{ color: 'var(--text-muted)' }}>Target: {goal.dueDate}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      <HrmsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Define Individual Performance Goal"
        subtitle="Establish measurable objective with weightage and target timeline"
        maxWidth="600px"
        footer={
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-goal-form"
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--brand-primary)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Set Goal
            </button>
          </div>
        }
      >
        <form id="add-goal-form" onSubmit={handleCreate}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextInput
              label="Goal Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement Zero-Downtime Microservice Upgrades"
            />

            <FormRow>
              <SelectField
                label="Assignee Employee"
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                options={employees.map((e) => ({
                  label: `${e.firstName} ${e.lastName} (${e.designation})`,
                  value: e.id,
                }))}
              />
              <TextInput
                label="Target Goal Value (%)"
                type="number"
                required
                value={targetValue}
                onChange={(e) => setTargetValue(Number(e.target.value))}
              />
            </FormRow>

            <FormRow>
              <TextInput
                label="Weightage (%)"
                type="number"
                required
                value={weightage}
                onChange={(e) => setWeightage(Number(e.target.value))}
              />
              <TextInput
                label="Due Date"
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </FormRow>

            <TextareaField
              label="Description & Measurement Criteria"
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed acceptance criteria and expected measurable output."
            />
          </div>
        </form>
      </HrmsModal>
    </div>
  );
};
