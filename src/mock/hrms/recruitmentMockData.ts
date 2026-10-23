import type {
  JobRequisition,
  JobPosting,
  Candidate,
  Interview,
  CandidateEvaluation,
} from '@features/hrms/types';

import {
  MOCK_JOB_REQUISITIONS,
  MOCK_JOB_POSTINGS,
  MOCK_CANDIDATES as CANONICAL_MOCK_CANDIDATES,
  MOCK_INTERVIEWS,
  MOCK_CANDIDATE_EVALUATIONS,
} from './recruitmentMockApi';

export interface UnifiedJobOpening {
  id: string;
  requisitionCode: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'Full-Time' | 'Contract';
  positionsCount: number;
  experienceYears: string;
  budgetMaxLpa: number;
  status: 'Active' | 'Draft' | 'Closed';
  applicantsCount: number;
  hiringManager: string;
}

export const MOCK_JOB_OPENINGS: UnifiedJobOpening[] = [
  {
    id: 'REQ-2026-01',
    requisitionCode: 'REQ-4011',
    title: 'Senior Cloud Platform Engineer',
    department: 'Engineering',
    location: 'Hyderabad HQ (Hybrid)',
    employmentType: 'Full-Time',
    positionsCount: 2,
    experienceYears: '5 - 8 Years',
    budgetMaxLpa: 26.0,
    status: 'Active',
    applicantsCount: 38,
    hiringManager: 'Aarav Sharma',
  },
  {
    id: 'REQ-2026-02',
    requisitionCode: 'REQ-4012',
    title: 'Product Growth Manager',
    department: 'Product Management',
    location: 'Bengaluru Office',
    employmentType: 'Full-Time',
    positionsCount: 1,
    experienceYears: '4 - 7 Years',
    budgetMaxLpa: 22.0,
    status: 'Active',
    applicantsCount: 24,
    hiringManager: 'Priya Venkatesh',
  },
  {
    id: 'REQ-2026-03',
    requisitionCode: 'REQ-4013',
    title: 'Enterprise Account Executive',
    department: 'Sales & Growth',
    location: 'Mumbai Office',
    employmentType: 'Full-Time',
    positionsCount: 2,
    experienceYears: '3 - 6 Years',
    budgetMaxLpa: 19.5,
    status: 'Active',
    applicantsCount: 19,
    hiringManager: 'Rohan Mehta',
  },
  {
    id: 'REQ-2026-04',
    requisitionCode: 'REQ-4014',
    title: 'Staff UI Design Architect',
    department: 'Design',
    location: 'Hyderabad HQ / Remote',
    employmentType: 'Full-Time',
    positionsCount: 1,
    experienceYears: '6 - 9 Years',
    budgetMaxLpa: 25.0,
    status: 'Active',
    applicantsCount: 42,
    hiringManager: 'Vikramaditya Roy',
  },
];

export interface UnifiedCandidate {
  id: string;
  candidateCode: string;
  fullName: string;
  email: string;
  phone: string;
  applyingFor: string;
  currentCompany: string;
  experienceYears: number;
  stage: 'Applied' | 'Screening' | 'Technical Round' | 'Managerial Round' | 'Offer Extended' | 'Hired';
  rating: number;
  appliedDate: string;
}

export const UNIFIED_MOCK_CANDIDATES: UnifiedCandidate[] = [
  {
    id: 'CAN-801',
    candidateCode: 'CAN-801',
    fullName: 'Aniket Mukherjee',
    email: 'aniket.m@gmail.com',
    phone: '+91 98301 22910',
    applyingFor: 'Senior Cloud Platform Engineer',
    currentCompany: 'Infosys FinTech',
    experienceYears: 6.5,
    stage: 'Technical Round',
    rating: 4.5,
    appliedDate: '2026-09-28',
  },
  {
    id: 'CAN-802',
    candidateCode: 'CAN-802',
    fullName: 'Deepika Sundaram',
    email: 'deepika.sundaram@outlook.com',
    phone: '+91 97410 88201',
    applyingFor: 'Product Growth Manager',
    currentCompany: 'Swiggy',
    experienceYears: 5.2,
    stage: 'Offer Extended',
    rating: 4.8,
    appliedDate: '2026-09-22',
  },
  {
    id: 'CAN-803',
    candidateCode: 'CAN-803',
    fullName: 'Rahul Bhatnagar',
    email: 'bhatnagar.rahul@gmail.com',
    phone: '+91 98112 44921',
    applyingFor: 'Enterprise Account Executive',
    currentCompany: 'Zomato Enterprise',
    experienceYears: 4.0,
    stage: 'Managerial Round',
    rating: 4.2,
    appliedDate: '2026-10-01',
  },
  {
    id: 'CAN-804',
    candidateCode: 'CAN-804',
    fullName: 'Sameera Khan',
    email: 'sameera.design@gmail.com',
    phone: '+91 98450 66719',
    applyingFor: 'Staff UI Design Architect',
    currentCompany: 'Razorpay',
    experienceYears: 7.0,
    stage: 'Technical Round',
    rating: 4.9,
    appliedDate: '2026-09-30',
  },
  {
    id: 'CAN-805',
    candidateCode: 'CAN-805',
    fullName: 'Karthik Subramanian',
    email: 'karthik.subra@yahoo.com',
    phone: '+91 94450 11928',
    applyingFor: 'Senior Cloud Platform Engineer',
    currentCompany: 'Freshworks',
    experienceYears: 6.0,
    stage: 'Hired',
    rating: 4.7,
    appliedDate: '2026-09-15',
  },
];

export const mockJobRequisitions: JobRequisition[] = [...MOCK_JOB_REQUISITIONS];
export const mockJobPostings: JobPosting[] = [...MOCK_JOB_POSTINGS];
export const mockCandidates: Candidate[] = [...CANONICAL_MOCK_CANDIDATES];
export const mockInterviews: Interview[] = [...MOCK_INTERVIEWS];
export const mockCandidateEvaluations: CandidateEvaluation[] = [...MOCK_CANDIDATE_EVALUATIONS];
