import { ApiResponseEnvelope } from '@core/api/types';
import {
  Employee,
  Department,
  EmployeeDocument,
  EmployeeRequest,
  Asset,
  AssetAssignment,
  AssetMaintenance,
  LeaveBalance,
  AttendanceRecord,
  HrmsWorkspaceStatus,
  CreateEmployeeRequestPayload,
  UploadDocumentPayload,
  AssignAssetPayload,
  ReturnAssetPayload,
  ScheduleMaintenancePayload,
  PerformanceGoal,
  KPI,
  PerformanceReview,
  PerformanceFeedback,
  Course,
  LearningPlan,
  Assessment,
  LearningProgress,
} from '@features/hrms/types';
import {
  mockHrmsWorkspaceStatus,
  mockDepartments,
  mockEmployees,
  mockEmployeeDocuments,
  mockEmployeeRequests,
  mockLeaveBalances,
  mockAttendanceRecords,
  mockAssets,
  mockAssetAssignments,
  mockAssetMaintenance,
} from './hrmsMockData';
import {
  mockPerformanceGoals,
  mockKPIs,
  mockPerformanceReviews,
  mockPerformanceFeedbacks,
  mockCourses,
  mockLearningPlans,
  mockAssessments,
} from './performanceMockData';
import { delay, createMockEnvelope } from '../data/commonMockData';
import { leaveMockHandlers } from './leaveMockHandlers';

// Mutable in-memory state initialized from mock data
const state = {
  departments: [...mockDepartments],
  employees: [...mockEmployees],
  documents: [...mockEmployeeDocuments],
  requests: [...mockEmployeeRequests],
  leaveBalances: [...mockLeaveBalances],
  attendance: [...mockAttendanceRecords],
  assets: [...mockAssets],
  assignments: [...mockAssetAssignments],
  maintenance: [...mockAssetMaintenance],
};

// Mutable in-memory stores for Performance & Learning
const goalsState: PerformanceGoal[] = [...mockPerformanceGoals];
const kpisState: KPI[] = [...mockKPIs];
const reviewsState: PerformanceReview[] = [...mockPerformanceReviews];
const feedbacksState: PerformanceFeedback[] = [...mockPerformanceFeedbacks];
const coursesState: Course[] = [...mockCourses];
const learningPlansState: LearningPlan[] = [...mockLearningPlans];
const assessmentsState: Assessment[] = [...mockAssessments];

export const hrmsMockHandlers = {
  /* =======================================================
     WORKSPACE STATUS (Preserved Baseline)
     ======================================================= */
  async getWorkspaceStatus(): Promise<ApiResponseEnvelope<HrmsWorkspaceStatus>> {
    await delay(100);
    return createMockEnvelope(mockHrmsWorkspaceStatus, 'HRMS workspace baseline loaded from mock adapter');
  },

  ...leaveMockHandlers,

  async getEmployees(): Promise<ApiResponseEnvelope<Employee[]>> {
    await delay(80);
    return createMockEnvelope([...state.employees], 'Employees loaded successfully');
  },

  async getEmployeeById(id: string): Promise<ApiResponseEnvelope<Employee | null>> {
    await delay(60);
    const found = state.employees.find((e) => e.id === id || e.employeeCode.toLowerCase() === id.toLowerCase()) || null;
    return createMockEnvelope(found, found ? 'Employee found' : 'Employee not found');
  },

  async getDepartments(): Promise<ApiResponseEnvelope<Department[]>> {
    await delay(60);
    return createMockEnvelope([...state.departments], 'Departments loaded successfully');
  },

  async getEmployeeDocuments(employeeId?: string): Promise<ApiResponseEnvelope<EmployeeDocument[]>> {
    await delay(80);
    const filtered = employeeId
      ? state.documents.filter((d) => d.employeeId === employeeId)
      : [...state.documents];
    return createMockEnvelope(filtered, 'Employee documents loaded successfully');
  },

  async uploadEmployeeDocument(payload: UploadDocumentPayload): Promise<ApiResponseEnvelope<EmployeeDocument>> {
    await delay(120);
    const newDoc: EmployeeDocument = {
      id: `doc-${Date.now()}`,
      employeeId: payload.employeeId,
      documentType: payload.documentType,
      documentNumber: payload.documentNumber || `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      fileUrl: payload.fileUrl || `/documents/${payload.employeeId}-upload.pdf`,
      status: 'PENDING_VERIFICATION',
      uploadedAt: new Date().toISOString(),
      verifiedAt: null,
    };
    state.documents.unshift(newDoc);
    return createMockEnvelope(newDoc, 'Document uploaded for verification');
  },

  async getEmployeeRequests(employeeId?: string): Promise<ApiResponseEnvelope<EmployeeRequest[]>> {
    await delay(80);
    const filtered = employeeId
      ? state.requests.filter((r) => r.employeeId === employeeId)
      : [...state.requests];
    return createMockEnvelope(filtered, 'Employee requests loaded successfully');
  },

  async createEmployeeRequest(payload: CreateEmployeeRequestPayload): Promise<ApiResponseEnvelope<EmployeeRequest>> {
    await delay(120);
    const newReq: EmployeeRequest = {
      id: `req-${Date.now()}`,
      employeeId: payload.employeeId,
      requestType: payload.requestType,
      title: payload.title,
      description: payload.description,
      status: 'OPEN',
      assignedTo: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.requests.unshift(newReq);
    return createMockEnvelope(newReq, 'Request submitted successfully');
  },

  async getLeaveBalances(employeeId?: string): Promise<ApiResponseEnvelope<LeaveBalance[]>> {
    await delay(80);
    const filtered = employeeId
      ? state.leaveBalances.filter((b) => b.employeeId === employeeId)
      : [...state.leaveBalances];
    return createMockEnvelope(filtered, 'Leave balances loaded successfully');
  },

  async getAttendanceRecords(employeeId?: string): Promise<ApiResponseEnvelope<AttendanceRecord[]>> {
    await delay(80);
    const filtered = employeeId
      ? state.attendance.filter((a) => a.employeeId === employeeId)
      : [...state.attendance];
    return createMockEnvelope(filtered, 'Attendance records loaded successfully');
  },

  async getAssets(): Promise<ApiResponseEnvelope<Asset[]>> {
    await delay(80);
    return createMockEnvelope([...state.assets], 'Assets catalog loaded successfully');
  },

  async getAssetAssignments(employeeId?: string): Promise<ApiResponseEnvelope<AssetAssignment[]>> {
    await delay(80);
    const filtered = employeeId
      ? state.assignments.filter((a) => a.employeeId === employeeId)
      : [...state.assignments];
    return createMockEnvelope(filtered, 'Asset assignments loaded successfully');
  },

  async assignAsset(payload: AssignAssetPayload): Promise<ApiResponseEnvelope<AssetAssignment>> {
    await delay(120);
    const assetIndex = state.assets.findIndex((a) => a.id === payload.assetId);
    if (assetIndex !== -1) {
      state.assets[assetIndex] = {
        ...state.assets[assetIndex],
        status: 'ASSIGNED',
        updatedAt: new Date().toISOString(),
      };
    }

    const newAssignment: AssetAssignment = {
      id: `asg-${Date.now()}`,
      assetId: payload.assetId,
      employeeId: payload.employeeId,
      assignedDate: new Date().toISOString().split('T')[0],
      returnDate: null,
      conditionOnAssign: payload.conditionOnAssign,
      notes: payload.notes,
    };
    state.assignments.unshift(newAssignment);
    return createMockEnvelope(newAssignment, 'Asset assigned successfully');
  },

  async returnAsset(payload: ReturnAssetPayload): Promise<ApiResponseEnvelope<AssetAssignment>> {
    await delay(120);
    const assignmentIndex = state.assignments.findIndex((a) => a.id === payload.assignmentId);
    if (assignmentIndex === -1) {
      throw new Error(`Assignment with ID ${payload.assignmentId} not found.`);
    }

    const assignment = state.assignments[assignmentIndex];
    const updatedAssignment: AssetAssignment = {
      ...assignment,
      returnDate: new Date().toISOString().split('T')[0],
      conditionOnReturn: payload.conditionOnReturn,
      notes: payload.notes ? `${assignment.notes || ''} | Return: ${payload.notes}` : assignment.notes,
    };
    state.assignments[assignmentIndex] = updatedAssignment;

    // Update asset status to AVAILABLE
    const assetIndex = state.assets.findIndex((a) => a.id === assignment.assetId);
    if (assetIndex !== -1) {
      state.assets[assetIndex] = {
        ...state.assets[assetIndex],
        status: 'AVAILABLE',
        updatedAt: new Date().toISOString(),
      };
    }

    return createMockEnvelope(updatedAssignment, 'Asset return recorded successfully');
  },

  async getAssetMaintenance(assetId?: string): Promise<ApiResponseEnvelope<AssetMaintenance[]>> {
    await delay(80);
    const filtered = assetId
      ? state.maintenance.filter((m) => m.assetId === assetId)
      : [...state.maintenance];
    return createMockEnvelope(filtered, 'Asset maintenance records loaded successfully');
  },

  async scheduleAssetMaintenance(payload: ScheduleMaintenancePayload): Promise<ApiResponseEnvelope<AssetMaintenance>> {
    await delay(120);
    const newMaintenance: AssetMaintenance = {
      id: `mnt-${Date.now()}`,
      assetId: payload.assetId,
      maintenanceType: payload.maintenanceType,
      description: payload.description,
      scheduledDate: payload.scheduledDate,
      cost: payload.cost,
      completedDate: null,
      status: 'SCHEDULED',
    };
    state.maintenance.unshift(newMaintenance);

    // Update asset status to UNDER_MAINTENANCE
    const assetIndex = state.assets.findIndex((a) => a.id === payload.assetId);
    if (assetIndex !== -1) {
      state.assets[assetIndex] = {
        ...state.assets[assetIndex],
        status: 'UNDER_MAINTENANCE',
        updatedAt: new Date().toISOString(),
      };
    }
    return createMockEnvelope(newMaintenance, 'Asset maintenance scheduled successfully');
  },

  /* =======================================================
     HRMS-DEV-06: PERFORMANCE GOALS & OKRs
     ======================================================= */
  async getPerformanceGoals(employeeId?: string): Promise<ApiResponseEnvelope<PerformanceGoal[]>> {
    await delay(200);
    const result = employeeId ? goalsState.filter((g) => g.employeeId === employeeId) : goalsState;
    return createMockEnvelope([...result], 'Performance goals loaded successfully');
  },

  async createPerformanceGoal(
    payload: Omit<PerformanceGoal, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponseEnvelope<PerformanceGoal>> {
    await delay(250);
    const now = new Date().toISOString();
    const newGoal: PerformanceGoal = {
      ...payload,
      id: `goal-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    goalsState.unshift(newGoal);
    return createMockEnvelope(newGoal, 'Performance goal created successfully');
  },

  async updatePerformanceGoalProgress(
    id: string,
    progress: number
  ): Promise<ApiResponseEnvelope<PerformanceGoal | null>> {
    await delay(180);
    const goal = goalsState.find((g) => g.id === id);
    if (!goal) {
      return {
        success: false,
        data: null,
        message: `Performance goal with id ${id} not found`,
        timestamp: new Date().toISOString(),
      };
    }
    goal.achievedValue = progress;
    if (goal.targetValue && progress >= goal.targetValue) {
      goal.status = 'COMPLETED';
    } else if (progress > 0) {
      goal.status = 'IN_PROGRESS';
    }
    goal.updatedAt = new Date().toISOString();
    return createMockEnvelope(goal, 'Goal progress updated successfully');
  },

  /* =======================================================
     HRMS-DEV-06: DEPARTMENT KPIS
     ======================================================= */
  async getKPIs(departmentId?: string): Promise<ApiResponseEnvelope<KPI[]>> {
    await delay(180);
    const result = departmentId ? kpisState.filter((k) => k.departmentId === departmentId) : kpisState;
    return createMockEnvelope([...result], 'Department KPIs loaded successfully');
  },

  /* =======================================================
     HRMS-DEV-06: APPRAISAL REVIEWS
     ======================================================= */
  async getPerformanceReviews(employeeId?: string): Promise<ApiResponseEnvelope<PerformanceReview[]>> {
    await delay(200);
    const result = employeeId ? reviewsState.filter((r) => r.employeeId === employeeId) : reviewsState;
    return createMockEnvelope([...result], 'Performance reviews loaded successfully');
  },

  async submitPerformanceReview(
    payload: Omit<PerformanceReview, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponseEnvelope<PerformanceReview>> {
    await delay(250);
    const now = new Date().toISOString();
    const newReview: PerformanceReview = {
      ...payload,
      id: `rev-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    reviewsState.unshift(newReview);
    return createMockEnvelope(newReview, 'Performance review submitted successfully');
  },

  /* =======================================================
     HRMS-DEV-06: 360-DEGREE FEEDBACK
     ======================================================= */
  async getPerformanceFeedback(employeeId?: string): Promise<ApiResponseEnvelope<PerformanceFeedback[]>> {
    await delay(200);
    const result = employeeId ? feedbacksState.filter((f) => f.employeeId === employeeId) : feedbacksState;
    return createMockEnvelope([...result], '360 degree performance feedbacks loaded successfully');
  },

  async submitPerformanceFeedback(
    payload: Omit<PerformanceFeedback, 'id' | 'submittedAt'>
  ): Promise<ApiResponseEnvelope<PerformanceFeedback>> {
    await delay(220);
    const newFeedback: PerformanceFeedback = {
      ...payload,
      id: `fb-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    feedbacksState.unshift(newFeedback);
    return createMockEnvelope(newFeedback, '360 degree feedback recorded successfully');
  },

  /* =======================================================
     HRMS-DEV-06: LEARNING & TRAINING COURSES
     ======================================================= */
  async getLearningCourses(): Promise<ApiResponseEnvelope<Course[]>> {
    await delay(200);
    return createMockEnvelope([...coursesState], 'Learning courses loaded successfully');
  },

  async getLearningPlans(employeeId?: string): Promise<ApiResponseEnvelope<LearningPlan[]>> {
    await delay(200);
    const result = employeeId ? learningPlansState.filter((p) => p.employeeId === employeeId) : learningPlansState;
    return createMockEnvelope([...result], 'Learning plans loaded successfully');
  },

  async getAssessments(courseId?: string): Promise<ApiResponseEnvelope<Assessment[]>> {
    await delay(180);
    const result = courseId ? assessmentsState.filter((a) => a.courseId === courseId) : assessmentsState;
    return createMockEnvelope([...result], 'Assessments loaded successfully');
  },

  async enrollCourse(
    employeeId: string,
    courseId: string
  ): Promise<ApiResponseEnvelope<LearningProgress>> {
    await delay(220);
    const course = coursesState.find((c) => c.id === courseId);
    if (!course) {
      return {
        success: false,
        data: null as unknown as LearningProgress,
        message: `Course with id ${courseId} not found`,
        timestamp: new Date().toISOString(),
      };
    }
    const newProgress: LearningProgress = {
      id: `lp-prog-${Date.now()}`,
      employeeId,
      courseId,
      status: 'IN_PROGRESS',
      progressPercentage: 0,
      completionDate: null,
    };
    return createMockEnvelope(newProgress, `Enrolled into ${course.title} successfully`);
  },
};
