/**
 * Canonical Performance & Appraisal Types
 * Ownership: Team HRMS
 */

export type GoalStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface PerformanceGoal {
  id: string;
  employeeId: string;
  cycleId: string;
  title: string;
  description: string;
  weightage: number;
  targetValue?: number;
  achievedValue?: number;
  unit?: string;
  status: GoalStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface KPI {
  id: string;
  code: string;
  name: string;
  description: string;
  departmentId: string | null;
  targetMetric: string;
  unit: string;
  frequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
}

export type ReviewStatus =
  | 'DRAFT'
  | 'SELF_REVIEW_PENDING'
  | 'MANAGER_REVIEW_PENDING'
  | 'COMPLETED'
  | 'LOCKED';

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewCycle: string;
  reviewerId: string;
  selfRating?: number;
  managerRating?: number;
  finalRating?: number;
  selfComments?: string;
  managerComments?: string;
  status: ReviewStatus;
  reviewDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PerformanceFeedback {
  id: string;
  reviewId?: string;
  employeeId: string;
  providedBy: string;
  feedbackType: 'PEER' | 'MANAGER' | 'UPWARD';
  comments: string;
  isAnonymous: boolean;
  submittedAt: string;
}
