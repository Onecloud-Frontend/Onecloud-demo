import { ApiResponseEnvelope } from '@core/api/types';
import {
  PerformanceGoal,
  KPI,
  PerformanceReview,
  PerformanceFeedback,
  Course,
  LearningPlan,
  Assessment,
  LearningProgress,
} from '../types';
import { hrmsMockHandlers } from '@mock/hrms/hrmsMockHandlers';

export const performanceService = {
  async getGoals(employeeId?: string): Promise<ApiResponseEnvelope<PerformanceGoal[]>> {
    return hrmsMockHandlers.getPerformanceGoals(employeeId);
  },

  async addGoal(
    goal: Omit<PerformanceGoal, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponseEnvelope<PerformanceGoal>> {
    return hrmsMockHandlers.createPerformanceGoal(goal);
  },

  async updateGoalProgress(
    id: string,
    achievedValue: number
  ): Promise<ApiResponseEnvelope<PerformanceGoal | null>> {
    return hrmsMockHandlers.updatePerformanceGoalProgress(id, achievedValue);
  },

  async getKpis(departmentId?: string): Promise<ApiResponseEnvelope<KPI[]>> {
    return hrmsMockHandlers.getKPIs(departmentId);
  },

  async getReviews(employeeId?: string): Promise<ApiResponseEnvelope<PerformanceReview[]>> {
    return hrmsMockHandlers.getPerformanceReviews(employeeId);
  },

  async submitReview(
    review: Omit<PerformanceReview, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponseEnvelope<PerformanceReview>> {
    return hrmsMockHandlers.submitPerformanceReview(review);
  },

  async getFeedbacks(employeeId?: string): Promise<ApiResponseEnvelope<PerformanceFeedback[]>> {
    return hrmsMockHandlers.getPerformanceFeedback(employeeId);
  },

  async submitFeedback(
    feedback: Omit<PerformanceFeedback, 'id' | 'submittedAt'>
  ): Promise<ApiResponseEnvelope<PerformanceFeedback>> {
    return hrmsMockHandlers.submitPerformanceFeedback(feedback);
  },

  async getCourses(): Promise<ApiResponseEnvelope<Course[]>> {
    return hrmsMockHandlers.getLearningCourses();
  },

  async getLearningPlans(employeeId?: string): Promise<ApiResponseEnvelope<LearningPlan[]>> {
    return hrmsMockHandlers.getLearningPlans(employeeId);
  },

  async getAssessments(courseId?: string): Promise<ApiResponseEnvelope<Assessment[]>> {
    return hrmsMockHandlers.getAssessments(courseId);
  },

  async enrollCourse(
    employeeId: string,
    courseId: string
  ): Promise<ApiResponseEnvelope<LearningProgress>> {
    return hrmsMockHandlers.enrollCourse(employeeId, courseId);
  },
};
