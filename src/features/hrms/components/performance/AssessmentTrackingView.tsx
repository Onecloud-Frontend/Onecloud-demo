import React, { useState } from 'react';
import { Assessment, Course } from '../../types';
import { Award, CheckCircle2, Clock, HelpCircle, Play, ShieldCheck } from 'lucide-react';

interface AssessmentTrackingViewProps {
  assessments: Assessment[];
  courses: Course[];
}

export const AssessmentTrackingView: React.FC<AssessmentTrackingViewProps> = ({
  assessments,
  courses,
}) => {
  const [activeExamId, setActiveExamId] = useState<string | null>(null);
  const [completedExams, setCompletedExams] = useState<Record<string, { score: number; passed: boolean }>>({
    'asm-1': { score: 92, passed: true },
  });

  const getCourse = (courseId: string) => courses.find((c) => c.id === courseId);

  const handleSimulateExam = (asmId: string, passingScore: number) => {
    setActiveExamId(asmId);
    setTimeout(() => {
      const simulatedScore = Math.floor(Math.random() * 25) + 75; // 75 - 100
      setCompletedExams((prev) => ({
        ...prev,
        [asmId]: {
          score: simulatedScore,
          passed: simulatedScore >= passingScore,
        },
      }));
      setActiveExamId(null);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Assessment & Certification Tracking
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Course compliance exams, technical competency assessments, and automated certification validations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
        {assessments.map((asm) => {
          const course = getCourse(asm.courseId);
          const result = completedExams[asm.id];
          const isTaking = activeExamId === asm.id;

          return (
            <div
              key={asm.id}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'rgba(99, 102, 241, 0.15)',
                        color: 'var(--brand-primary)',
                      }}
                    >
                      <Award size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Course: {course?.courseCode || 'GENERAL'}
                      </span>
                      <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {asm.title}
                      </h4>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <HelpCircle size={14} color="var(--text-muted)" />
                    <span>Questions: <strong>{asm.questionsCount}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <ShieldCheck size={14} color="#10b981" />
                    <span>Pass Score: <strong>{asm.passingScorePercentage}%</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <Clock size={14} color="var(--text-muted)" />
                    <span>Max Attempts: <strong>{asm.maxAttempts}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Format:</span>
                    <strong>Online MCQ</strong>
                  </div>
                </div>
              </div>

              {/* Assessment Status & Actions */}
              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  {result ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={16} color={result.passed ? '#10b981' : '#ef4444'} />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: result.passed ? '#10b981' : '#ef4444' }}>
                        {result.passed ? `Passed (${result.score}%)` : `Failed (${result.score}%)`}
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Not attempted yet</span>
                  )}
                </div>

                <button
                  onClick={() => handleSimulateExam(asm.id, asm.passingScorePercentage)}
                  disabled={isTaking}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: result?.passed ? 'var(--bg-elevated)' : 'var(--brand-primary)',
                    color: result?.passed ? 'var(--text-primary)' : '#ffffff',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: isTaking ? 'not-allowed' : 'pointer',
                    opacity: isTaking ? 0.6 : 1,
                  }}
                >
                  <Play size={12} />
                  {isTaking ? 'Grading...' : result?.passed ? 'Retake Exam' : 'Launch Exam'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
