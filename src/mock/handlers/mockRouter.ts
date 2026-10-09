import { ApiResponseEnvelope } from '@core/api/types';
import { erpMockHandlers } from '../erp';
import { crmMockHandlers } from '../crm';
import { hrmsMockHandlers } from '../hrms';
import { financeMockHandlers } from '../finance';
import type {
  UploadDocumentPayload,
  CreateEmployeeRequestPayload,
  AssignAssetPayload,
  ReturnAssetPayload,
  ScheduleMaintenancePayload,
} from '@features/hrms/types';

export async function routeMockRequest<T>(
  method: string,
  path: string,
  _body?: unknown
): Promise<ApiResponseEnvelope<T>> {
  const [basePath, queryString] = path.split('?');
  const searchParams = new URLSearchParams(queryString || '');
  const cleanPath = basePath.toLowerCase().replace(/^\//, '');

  if (cleanPath.startsWith('erp')) {
    if (cleanPath.includes('workspace-status') || cleanPath === 'erp') {
      const res = await erpMockHandlers.getWorkspaceStatus();
      return res as unknown as ApiResponseEnvelope<T>;
    }
  }

  if (cleanPath.startsWith('crm')) {
    if (cleanPath.includes('workspace-status') || cleanPath === 'crm') {
      const res = await crmMockHandlers.getWorkspaceStatus();
      return res as unknown as ApiResponseEnvelope<T>;
    }
  }

  if (cleanPath.startsWith('hrms')) {
    if (cleanPath.includes('workspace-status') || cleanPath === 'hrms') {
      const res = await hrmsMockHandlers.getWorkspaceStatus();
      return res as unknown as ApiResponseEnvelope<T>;
    }
    if (cleanPath === 'hrms/leave/types') {
      const res = await hrmsMockHandlers.getLeaveTypes();
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath === 'hrms/leave/requests') {
      const employeeId = searchParams.get('employeeId') || undefined;
      const res = await hrmsMockHandlers.getLeaveRequests(employeeId);
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath === 'hrms/employees') {
      const res = await hrmsMockHandlers.getEmployees();
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath.startsWith('hrms/employees/')) {
      const id = cleanPath.replace('hrms/employees/', '');
      const res = await hrmsMockHandlers.getEmployeeById(id);
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath === 'hrms/departments') {
      const res = await hrmsMockHandlers.getDepartments();
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath === 'hrms/documents') {
      if (method === 'POST') {
        const payload = _body as UploadDocumentPayload;
        const res = await hrmsMockHandlers.uploadEmployeeDocument(payload);
        return res as unknown as ApiResponseEnvelope<T>;
      }
      const empId = searchParams.get('employeeId') || undefined;
      const res = await hrmsMockHandlers.getEmployeeDocuments(empId);
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath === 'hrms/requests') {
      if (method === 'POST') {
        const payload = _body as CreateEmployeeRequestPayload;
        const res = await hrmsMockHandlers.createEmployeeRequest(payload);
        return res as unknown as ApiResponseEnvelope<T>;
      }
      const empId = searchParams.get('employeeId') || undefined;
      const res = await hrmsMockHandlers.getEmployeeRequests(empId);
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath === 'hrms/leave/balances' || cleanPath === 'hrms/leave-balances') {
      const empId = searchParams.get('employeeId') || undefined;
      const res = await hrmsMockHandlers.getLeaveBalances(empId);
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath === 'hrms/attendance') {
      const empId = searchParams.get('employeeId') || undefined;
      const res = await hrmsMockHandlers.getAttendanceRecords(empId);
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath.includes('shift')) {
      const res = await hrmsMockHandlers.getShifts();
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath.includes('overtime')) {
      const res = await hrmsMockHandlers.getOvertimeRecords();
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath.includes('correction')) {
      const res = await hrmsMockHandlers.getCorrections();
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath === 'hrms/assets') {
      const res = await hrmsMockHandlers.getAssets();
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath === 'hrms/assets/assignments') {
      if (method === 'POST') {
        const payload = _body as AssignAssetPayload;
        const res = await hrmsMockHandlers.assignAsset(payload);
        return res as unknown as ApiResponseEnvelope<T>;
      }
      const empId = searchParams.get('employeeId') || undefined;
      const res = await hrmsMockHandlers.getAssetAssignments(empId);
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath === 'hrms/assets/returns') {
      const payload = _body as ReturnAssetPayload;
      const res = await hrmsMockHandlers.returnAsset(payload);
      return res as unknown as ApiResponseEnvelope<T>;
    }

    if (cleanPath === 'hrms/assets/maintenance') {
      if (method === 'POST') {
        const payload = _body as ScheduleMaintenancePayload;
        const res = await hrmsMockHandlers.scheduleAssetMaintenance(payload);
        return res as unknown as ApiResponseEnvelope<T>;
      }
      const assetId = searchParams.get('assetId') || undefined;
      const res = await hrmsMockHandlers.getAssetMaintenance(assetId);
      return res as unknown as ApiResponseEnvelope<T>;
    }
  }

  if (cleanPath.startsWith('finance')) {
    if (cleanPath.includes('workspace-status') || cleanPath === 'finance') {
      const res = await financeMockHandlers.getWorkspaceStatus();
      return res as unknown as ApiResponseEnvelope<T>;
    }
  }

  throw new Error(`Mock handler for route [${method} ${path}] is not registered. (TBD — Backend Contract Required)`);
}
