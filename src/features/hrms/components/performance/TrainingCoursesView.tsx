import React, { useState } from 'react';
import { Course } from '../../types';
import { Clock, CheckCircle2 } from 'lucide-react';

interface TrainingCoursesViewProps {
  courses: Course[];
}

export const TrainingCoursesView: React.FC<TrainingCoursesViewProps> = ({ courses }) => {
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set(['crs-1']));
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleEnroll = (id: string, title: string) => {
    setEnrolledIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setToastMessage(`Withdrawn enrollment from "${title}".`);
      } else {
        next.add(id);
        setToastMessage(`Successfully enrolled in "${title}"! Module added to your Active Learning Plan.`);
      }
      setTimeout(() => setToastMessage(null), 4000);
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {toastMessage && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#10b981',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Learning & Development Course Catalog
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Company compliance certifications, engineering masterclasses, and executive leadership workshops.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {courses.map((course) => {
          const formatColor =
            course.format === 'ONLINE' ? '#10b981' : course.format === 'HYBRID' ? '#38bdf8' : '#c084fc';

          return (
            <div
              key={course.id}
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
                  <span style={{ fontSize: '11px', color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                    {course.courseCode}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      backgroundColor: `${formatColor}18`,
                      color: formatColor,
                    }}
                  >
                    {course.format}
                  </span>
                </div>

                <h4 style={{ margin: '8px 0 4px', fontSize: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {course.title}
                </h4>

                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Category: <strong>{course.category}</strong>
                </span>

                <p style={{ margin: '12px 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {course.description}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                  <Clock size={14} />
                  <span>{course.durationMinutes} Minutes</span>
                </div>

                <div style={{ color: 'var(--text-secondary)' }}>
                  Instructor: <strong>{course.instructorName || 'Guild Faculty'}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggleEnroll(course.id, course.title)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: enrolledIds.has(course.id)
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'var(--brand-primary)',
                  color: enrolledIds.has(course.id) ? '#10b981' : '#ffffff',
                  border: enrolledIds.has(course.id) ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  transition: 'all 150ms ease',
                }}
              >
                {enrolledIds.has(course.id) ? (
                  <>✓ Enrolled in Curriculum</>
                ) : (
                  <>Enroll in Course →</>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
