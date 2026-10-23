import { useState, useCallback } from 'react';
import {
  PerformanceGoal,
  KPI,
  PerformanceReview,
  PerformanceFeedback,
  Course,
  LearningPlan,
  Assessment,
  Employee,
  Department,
} from '../types';
import {
  mockPerformanceGoals,
  mockKPIs,
  mockPerformanceReviews,
  mockPerformanceFeedbacks,
  mockCourses,
  mockLearningPlans,
  mockAssessments,
  mockPerformanceEmployees,
  mockPerformanceDepartments,
} from '@mock/hrms/performanceMockData';
import { performanceService } from '../services/performanceService';
import { useAttendanceData } from './useAttendanceData';
import { useLeaveData } from './useLeaveData';

export function useHrmsData() {
  const attendance = useAttendanceData();
  const leave = useLeaveData();

  const [goals, setGoals] = useState<PerformanceGoal[]>([...mockPerformanceGoals]);
  const [kpis] = useState<KPI[]>([...mockKPIs]);
  const [reviews, setReviews] = useState<PerformanceReview[]>([...mockPerformanceReviews]);
  const [feedbacks, setFeedbacks] = useState<PerformanceFeedback[]>([...mockPerformanceFeedbacks]);
  const [courses] = useState<Course[]>([...mockCourses]);
  const [learningPlans] = useState<LearningPlan[]>([...mockLearningPlans]);
  const [assessments] = useState<Assessment[]>([...mockAssessments]);
  const [employees] = useState<Employee[]>([...mockPerformanceEmployees]);
  const [departments] = useState<Department[]>([...mockPerformanceDepartments]);

  const addGoal = useCallback((newGoal: Omit<PerformanceGoal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created: PerformanceGoal = {
      ...newGoal,
      id: `goal-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setGoals((prev) => [created, ...prev]);
    performanceService.addGoal(newGoal).catch(console.error);
  }, []);

  const updateGoalProgress = useCallback((id: string, progress: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const isComplete = g.targetValue ? progress >= g.targetValue : progress >= 100;
        return {
          ...g,
          achievedValue: progress,
          status: isComplete ? 'COMPLETED' : progress > 0 ? 'IN_PROGRESS' : g.status,
          updatedAt: new Date().toISOString(),
        };
      })
    );
    performanceService.updateGoalProgress(id, progress).catch(console.error);
  }, []);

  const submitReview = useCallback(
    (newReview: Omit<PerformanceReview, 'id' | 'createdAt' | 'updatedAt'>) => {
      const created: PerformanceReview = {
        ...newReview,
        id: `rev-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setReviews((prev) => [created, ...prev]);
      performanceService.submitReview(newReview).catch(console.error);
    },
    []
  );

  const submit360Feedback = useCallback(
    (newFeedback: Omit<PerformanceFeedback, 'id' | 'submittedAt'>) => {
      const created: PerformanceFeedback = {
        ...newFeedback,
        id: `fb-${Date.now()}`,
        submittedAt: new Date().toISOString(),
      };
      setFeedbacks((prev) => [created, ...prev]);
      performanceService.submitFeedback(newFeedback).catch(console.error);
    },
    []
  );

  return {
    ...attendance,
    ...leave,
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
  };
}

export { useAttendanceData } from './useAttendanceData';
export { useLeaveData } from './useLeaveData';
export const usePerformanceData = useHrmsData;
