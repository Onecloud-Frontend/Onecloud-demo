/**
 * Canonical Learning & Development Types
 * Ownership: Team HRMS
 */

export interface Course {
  id: string;
  courseCode: string;
  title: string;
  description: string;
  category: string;
  durationMinutes: number;
  instructorName?: string;
  format: 'ONLINE' | 'CLASSROOM' | 'HYBRID';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface LearningPlanCourse {
  courseId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  progressPercentage: number;
}

export interface LearningPlan {
  id: string;
  employeeId: string;
  title: string;
  targetCompletionDate: string;
  courses: LearningPlanCourse[];
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'EXPIRED';
}

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  passingScorePercentage: number;
  maxAttempts: number;
  questionsCount: number;
}

export interface LearningProgress {
  id: string;
  employeeId: string;
  courseId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  progressPercentage: number;
  score?: number;
  certificateUrl?: string;
  completionDate: string | null;
}
