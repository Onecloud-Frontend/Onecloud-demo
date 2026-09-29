import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const PerformanceLearningPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="HRMS-DEV-06"
      domain="HRMS"
      domainCategory="HRMS"
      teamBadgeVariant="team-c"
      capability="Performance + Learning"
      route="/hrms/performance"
      description="Appraisal cycles, goal/OKR tracking, training course catalog, and certifications."
      scopeItems={[
        "Appraisal Cycles & Self-Evaluation",
        "Goal & OKR Tracking",
        "Training Course Catalog",
        "Skill Certifications & Learning Progress"
]}
      typeLocation="src/features/hrms/types/performance.ts"
      serviceLocation="src/features/hrms/services/performanceService.ts"
      mockLocation="src/mock/hrms/"
    />
  );
};
