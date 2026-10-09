import React, { useState } from 'react';
import { Course, LearningPlan, Assessment, Employee } from '../../types';
import { TrainingCoursesView } from './TrainingCoursesView';
import { LearningPlansView } from './LearningPlansView';
import { AssessmentTrackingView } from './AssessmentTrackingView';
import { BookOpen, GraduationCap, CheckSquare } from 'lucide-react';

interface LearningCatalogProgressViewProps {
  courses: Course[];
  learningPlans: LearningPlan[];
  assessments: Assessment[];
  employees: Employee[];
}

export const LearningCatalogProgressView: React.FC<LearningCatalogProgressViewProps> = ({
  courses,
  learningPlans,
  assessments,
  employees,
}) => {
  const [subTab, setSubTab] = useState<'catalog' | 'plans' | 'assessments'>('catalog');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Sub-tab switcher */}
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
            onClick={() => setSubTab('catalog')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: subTab === 'catalog' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: subTab === 'catalog' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <BookOpen size={14} /> Training Course Catalog ({courses.length})
          </button>
          <button
            onClick={() => setSubTab('plans')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: subTab === 'plans' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: subTab === 'plans' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <GraduationCap size={14} /> Employee Learning Plans ({learningPlans.length})
          </button>
          <button
            onClick={() => setSubTab('assessments')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: subTab === 'assessments' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: subTab === 'assessments' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <CheckSquare size={14} /> Quizzes & Certifications ({assessments.length})
          </button>
        </div>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          L&D Competency Enablement
        </span>
      </div>

      {subTab === 'catalog' && <TrainingCoursesView courses={courses} />}
      {subTab === 'plans' && (
        <LearningPlansView
          learningPlans={learningPlans}
          courses={courses}
          employees={employees}
        />
      )}
      {subTab === 'assessments' && (
        <AssessmentTrackingView assessments={assessments} courses={courses} />
      )}
    </div>
  );
};
