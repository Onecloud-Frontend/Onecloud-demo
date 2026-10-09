import React from 'react';
import { LeaveRequest, LeaveType, Employee } from '../../types';
import { HrmsDataTable, Column } from '../common/HrmsDataTable';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';

interface LeaveHistoryTableProps {
  leaveRequests: LeaveRequest[];
  leaveTypes: LeaveType[];
  employees: Employee[];
}

export const LeaveHistoryTable: React.FC<LeaveHistoryTableProps> = ({
  leaveRequests,
  leaveTypes,
  employees,
}) => {
  const getEmployee = (id: string) => employees.find((e) => e.id === id);
  const getLeaveType = (id: string) => leaveTypes.find((t) => t.id === id);

  const columns: Column<LeaveRequest>[] = [
    {
      key: 'employee',
      header: 'EMPLOYEE',
      render: (req) => {
        const emp = getEmployee(req.employeeId);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={emp?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
              alt=""
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {emp ? `${emp.firstName} ${emp.lastName}` : 'Employee'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{emp?.employeeCode}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'leaveType',
      header: 'LEAVE TYPE',
      render: (req) => {
        const type = getLeaveType(req.leaveTypeId);
        return <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>{type?.name || 'Leave'}</span>;
      },
    },
    {
      key: 'dates',
      header: 'DURATION',
      render: (req) => (
        <div>
          <div style={{ color: 'var(--text-primary)', fontSize: '12px' }}>
            {req.startDate} → {req.endDate}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{req.totalDays} Days Total</div>
        </div>
      ),
    },
    {
      key: 'reason',
      header: 'REASON / REMARKS',
      render: (req) => (
        <span style={{ color: 'var(--text-secondary)', fontSize: '12px', maxWidth: '240px', display: 'block' }}>
          {req.reason}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      render: (req) => <HrmsStatusBadge status={req.status} size="sm" />,
    },
    {
      key: 'createdAt',
      header: 'SUBMITTED',
      render: (req) => (
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          {new Date(req.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const filterOptions = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Approved', value: 'APPROVED' },
    { label: 'Rejected', value: 'REJECTED' },
  ];

  return (
    <HrmsDataTable
      data={leaveRequests}
      columns={columns}
      keyExtractor={(r) => r.id}
      searchPlaceholder="Search by reason or applicant..."
      searchFilter={(req, q) => {
        const emp = getEmployee(req.employeeId);
        return (
          req.reason.toLowerCase().includes(q) ||
          (emp && (emp.firstName.toLowerCase().includes(q) || emp.lastName.toLowerCase().includes(q))) ||
          false
        );
      }}
      filterOptions={filterOptions}
      filterKey="status"
    />
  );
};
