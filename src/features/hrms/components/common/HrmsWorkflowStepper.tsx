import React from 'react';
import { Check } from 'lucide-react';

export interface WorkflowStep {
  id: string;
  label: string;
  description?: string;
}

interface HrmsWorkflowStepperProps {
  steps: WorkflowStep[];
  currentStepId: string;
  onStepClick?: (id: string) => void;
}

export const HrmsWorkflowStepper: React.FC<HrmsWorkflowStepperProps> = ({
  steps,
  currentStepId,
  onStepClick,
}) => {
  const currentIndex = steps.findIndex((s) => s.id === currentStepId);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '16px 20px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflowX: 'auto',
      }}
    >
      {steps.map((step, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        const isUpcoming = idx > currentIndex;

        return (
          <React.Fragment key={step.id}>
            <div
              onClick={() => onStepClick && onStepClick(step.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: onStepClick ? 'pointer' : 'default',
                opacity: isUpcoming ? 0.6 : 1,
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: isCompleted
                    ? '#10b981'
                    : isCurrent
                    ? 'var(--brand-primary)'
                    : 'var(--bg-elevated)',
                  color: isCompleted || isCurrent ? '#ffffff' : 'var(--text-muted)',
                  border: isCurrent ? '2px solid rgba(99, 102, 241, 0.4)' : 'none',
                }}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : idx + 1}
              </div>

              <div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: isCurrent ? 600 : 500,
                    color: isCurrent ? 'var(--text-primary)' : isCompleted ? '#10b981' : 'var(--text-secondary)',
                  }}
                >
                  {step.label}
                </div>
                {step.description && (
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {step.description}
                  </div>
                )}
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: idx < currentIndex ? '#10b981' : 'var(--border-subtle)',
                  margin: '0 14px',
                  minWidth: '24px',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
