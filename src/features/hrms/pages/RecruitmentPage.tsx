import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const RecruitmentPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="HRMS-DEV-05"
      domain="HRMS"
      domainCategory="HRMS"
      teamBadgeVariant="team-c"
      capability="Recruitment"
      route="/hrms/recruitment"
      description="Job postings, applicant tracking (ATS), interview schedules, and offer letter management."
      scopeItems={[
        "Job Openings & Requisitions",
        "Applicant Tracking & Resume Review",
        "Interview Scheduling & Feedback",
        "Offer Letter Issuance & Acceptance"
]}
      typeLocation="src/features/hrms/types/recruitment.ts"
      serviceLocation="src/features/hrms/services/recruitmentService.ts"
      mockLocation="src/mock/hrms/"
    />
  );
};
