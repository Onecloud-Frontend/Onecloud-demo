import React, { useState } from 'react';
import { useHrmsData } from '../hooks/useHrmsData';
import { HrmsPageContainer } from '../components/common/HrmsPageContainer';
import { HrmsTabs, TabItem } from '../components/common/HrmsTabs';
import { KpiGoalManagementView } from '../components/performance/KpiGoalManagementView';
import { PerformanceReviewsView } from '../components/performance/PerformanceReviewsView';
import { Feedback360View } from '../components/performance/Feedback360View';
import { LearningCatalogProgressView } from '../components/performance/LearningCatalogProgressView';
import { Target, Award, MessageSquare, BookOpen } from 'lucide-react';

export const PerformanceLearningPage: React.FC = () => {
  const {
    goals,
    kpis,
    reviews,
    feedbacks,
    courses,
    learningPlans,
    assessments,
    employees,
    departments,
    addGoal,
    updateGoalProgress,
    submitReview,
    submit360Feedback,
  } = useHrmsData();

  const [activeTab, setActiveTab] = useState('01');

  const tabs: TabItem[] = [
    {
      id: '01',
      label: '01 KPI Goal Management',
      icon: <Target size={16} />,
    },
    {
      id: '02',
      label: '02 Appraisal Review Wizard',
      icon: <Award size={16} />,
    },
    {
      id: '03',
      label: '03 360 Peer Feedback',
      icon: <MessageSquare size={16} />,
    },
    {
      id: '04',
      label: '04 Learning Catalog & Progress',
      icon: <BookOpen size={16} />,
    },
  ];

  return (
    <HrmsPageContainer
      title="Performance & Learning Management"
      description="Individual OKR targets, departmental KPI tracking, multi-stage appraisal reviews, 360 peer feedback, and training courses."
      badgeText="HRMS-DEV-06"
    >
      <HrmsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* 01 KPI Goal Management */}
      {activeTab === '01' && (
        <KpiGoalManagementView
          goals={goals}
          kpis={kpis}
          employees={employees}
          departments={departments}
          onAddGoal={addGoal}
          onUpdateGoalProgress={updateGoalProgress}
        />
      )}

      {/* 02 Appraisal Review Wizard */}
      {activeTab === '02' && (
        <PerformanceReviewsView
          reviews={reviews}
          employees={employees}
          onSubmitReview={submitReview}
        />
      )}

      {/* 03 360 Peer Feedback */}
      {activeTab === '03' && (
        <Feedback360View
          feedbacks={feedbacks}
          employees={employees}
          onSubmitFeedback={submit360Feedback}
        />
      )}

      {/* 04 Learning Catalog & Progress */}
      {activeTab === '04' && (
        <LearningCatalogProgressView
          courses={courses}
          learningPlans={learningPlans}
          assessments={assessments}
          employees={employees}
        />
      )}
    </HrmsPageContainer>
  );
};
