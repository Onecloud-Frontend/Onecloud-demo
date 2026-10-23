import React, { useState } from 'react';
import { useLeaveData } from '../hooks/useLeaveData';
import { HrmsPageContainer } from '../components/common/HrmsPageContainer';
import { HrmsTabs, TabItem } from '../components/common/HrmsTabs';
import { LeaveBalanceCards } from '../components/leave/LeaveBalanceCards';
import { LeaveApplicationFormView } from '../components/leave/LeaveApplicationFormView';
import { LeaveCalendarView } from '../components/leave/LeaveCalendarView';
import { ManagerApprovalQueue } from '../components/leave/ManagerApprovalQueue';
import { LeaveRequestModal } from '../components/leave/LeaveRequestModal';
import { Calendar, FileEdit, CalendarDays, CheckSquare, Plus, RotateCcw } from 'lucide-react';
import '../styles/leave.css';

export const LeaveManagementPage: React.FC = () => {
  const {
    leaveTypes,
    leaveBalances,
    leaveRequests,
    employees,
    applyLeave,
    reviewLeaveRequest,
    resetToDefault,
  } = useLeaveData();

  const [activeTab, setActiveTab] = useState('01');
  const [selectedLeaveTypeId, setSelectedLeaveTypeId] = useState<string | undefined>(undefined);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const pendingLeaves = leaveRequests.filter((r) => r.status === 'PENDING');

  const tabs: TabItem[] = [
    {
      id: '01',
      label: '01 Leave Balance Overview',
      icon: <Calendar size={16} />,
    },
    {
      id: '02',
      label: '02 Leave Application Form',
      icon: <FileEdit size={16} />,
    },
    {
      id: '03',
      label: '03 Team Absence Calendar',
      icon: <CalendarDays size={16} />,
    },
    {
      id: '04',
      label: '04 Approval Action Queue',
      icon: <CheckSquare size={16} />,
      badge: pendingLeaves.length || undefined,
    },
  ];

  return (
    <HrmsPageContainer
      title="Leave Management"
      description="Employee entitlement quotas, leave application workflow, department absence calendar, and manager approval queues."
      badgeText="HRMS-DEV-03"
      actionsSlot={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => {
              if (confirm('Reset all demo leave data back to initial mock records?')) {
                resetToDefault();
              }
            }}
            title="Reset Leave Demo Data"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={14} /> Reset Data
          </button>
          <button
            onClick={() => {
              setSelectedLeaveTypeId(undefined);
              setActiveTab('02');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            }}
          >
            <Plus size={15} /> Apply for Leave
          </button>
        </div>
      }
    >
      <HrmsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* 01 Leave Balance Overview */}
      {activeTab === '01' && (
        <LeaveBalanceCards
          leaveBalances={leaveBalances}
          leaveTypes={leaveTypes}
          onApplyClick={(typeId) => {
            if (typeId) setSelectedLeaveTypeId(typeId);
            setActiveTab('02');
          }}
        />
      )}

      {/* 02 Leave Application Form */}
      {activeTab === '02' && (
        <LeaveApplicationFormView
          leaveTypes={leaveTypes}
          leaveBalances={leaveBalances}
          employees={employees}
          defaultLeaveTypeId={selectedLeaveTypeId}
          onSubmit={applyLeave}
          onSuccess={() => setActiveTab('04')}
        />
      )}

      {/* 03 Team Absence Calendar */}
      {activeTab === '03' && (
        <LeaveCalendarView
          leaveRequests={leaveRequests}
          employees={employees}
          leaveTypes={leaveTypes}
        />
      )}

      {/* 04 Approval Action Queue */}
      {activeTab === '04' && (
        <ManagerApprovalQueue
          pendingRequests={pendingLeaves}
          allRequests={leaveRequests}
          leaveTypes={leaveTypes}
          employees={employees}
          onReview={reviewLeaveRequest}
        />
      )}

      {/* Optional Modal Fallback */}
      <LeaveRequestModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        leaveTypes={leaveTypes}
        employees={employees}
        onSubmit={applyLeave}
      />
    </HrmsPageContainer>
  );
};
