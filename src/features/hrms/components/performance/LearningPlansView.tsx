import React from 'react';
import { LearningPlan, Course, Employee } from '../../types';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';

interface LearningPlansViewProps {
  learningPlans: LearningPlan[];
  courses: Course[];
  employees: Employee[];
}

export const LearningPlansView: React.FC<LearningPlansViewProps> = ({
  learningPlans,
  courses,
  employees,
}) => {
  const getEmployee = (id: string) => employees.find((e) => e.id === id);
  const getCourse = (id: string) => courses.find((c) => c.id === id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Active Employee Learning Plans & Career Pathways
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Assigned role upskilling roadmaps, curriculum milestone tracking, and mandatory exam criteria.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
        {learningPlans.map((plan) => {
          const emp = getEmployee(plan.employeeId);

          return (
            <div
              key={plan.id}
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
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {plan.title}
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Assigned to: <strong>{emp ? `${emp.firstName} ${emp.lastName}` : 'Staff'}</strong>
                    </span>
                  </div>
                  <HrmsStatusBadge status={plan.status} size="sm" />
                </div>

                {/* Courses within the plan */}
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.courses.map((item, idx) => {
                    const course = getCourse(item.courseId);

                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '10px 12px',
                          backgroundColor: 'var(--bg-surface, #1e293b)',
                          borderRadius: 'var(--radius-md, 6px)',
                          border: '1px solid var(--border-subtle, #334155)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            {course?.title || 'Course Module'}
                          </span>
                          <span style={{ color: item.progressPercentage === 100 ? '#10b981' : 'var(--brand-primary)', fontWeight: 700 }}>
                            {item.progressPercentage}%
                          </span>
                        </div>

                        <div
                          style={{
                            height: '5px',
                            backgroundColor: 'var(--bg-elevated)',
                            borderRadius: '999px',
                            marginTop: '6px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${item.progressPercentage}%`,
                              backgroundColor: item.progressPercentage === 100 ? '#10b981' : 'var(--brand-primary)',
                              borderRadius: '999px',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                }}
              >
                <span>Target Deadline: {plan.targetCompletionDate}</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Curriculum Enrolled</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
