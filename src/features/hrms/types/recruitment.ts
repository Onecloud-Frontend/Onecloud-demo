/**
 * Canonical Recruitment & Hiring Types
 * Ownership: Team HRMS
 */

import type { EmploymentType } from './employee';

export type RequisitionStatus =
  | 'DRAFT'
  | 'OPEN'
  | 'ON_HOLD'
  | 'FILLED'
  | 'CANCELLED';

export interface JobRequisition {
  id: string;
  requisitionCode: string;
  title: string;
  departmentId: string;
  positionsCount: number;
  employmentType: EmploymentType;
  experienceRequired: string;
  budgetMax: number;
  status: RequisitionStatus;
  requestedBy: string;
  approvedBy: string | null;
  targetHiringDate: string;
  createdAt: string;
  updatedAt: string;
}

export type JobPostingStatus = 'DRAFT' | 'PUBLISHED' | 'EXPIRED' | 'CLOSED';

export interface JobPosting {
  id: string;
  requisitionId: string;
  postingTitle: string;
  jobDescription: string;
  requirements: string[];
  location: string;
  status: JobPostingStatus;
  publishedDate: string | null;
  expiryDate: string | null;
  postedBy: string;
}

export type CandidateStatus =
  | 'NEW'
  | 'SCREENING'
  | 'INTERVIEWING'
  | 'OFFERED'
  | 'HIRED'
  | 'REJECTED';

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentCompany?: string;
  totalExperienceYears: number;
  resumeUrl?: string;
  status: CandidateStatus;
  source: string;
  appliedDate: string;
  createdAt: string;
  updatedAt: string;
}

export type InterviewStatus =
  | 'SCHEDULED'
  | 'COMPLETED'
  | 'RESCHEDULED'
  | 'CANCELLED';

export interface Interview {
  id: string;
  candidateId: string;
  jobPostingId: string;
  interviewRound: string;
  interviewerIds: string[];
  scheduledStartTime: string;
  scheduledEndTime: string;
  meetingLink?: string;
  status: InterviewStatus;
  feedbackSummary?: string;
  rating?: number;
}

export interface CandidateEvaluation {
  id: string;
  interviewId: string;
  candidateId: string;
  evaluatorId: string;
  technicalRating: number;
  communicationRating: number;
  culturalFitRating: number;
  overallRecommendation: 'STRONG_HIRE' | 'HIRE' | 'NEUTRAL' | 'NO_HIRE';
  notes: string;
  submittedAt: string;
}
