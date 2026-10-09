import React, { useState } from 'react';
import { useHrmsData } from '../hooks/useHrmsData';
import { HrmsPageContainer } from '../components/common/HrmsPageContainer';
import { HrmsTabs, TabItem } from '../components/common/HrmsTabs';
import { ClockInOutWidget } from '../components/attendance/ClockInOutWidget';
import { AttendanceDailyTable } from '../components/attendance/AttendanceDailyTable';
import { MonthlySummaryGridView } from '../components/attendance/MonthlySummaryGridView';
import { ShiftRotationSchedulerView } from '../components/attendance/ShiftRotationSchedulerView';
import { OvertimeRegularizationLogView } from '../components/attendance/OvertimeRegularizationLogView';
import { AttendanceCorrectionModal } from '../components/attendance/AttendanceCorrectionModal';
import {
  Clock,
  Calendar,
  Layers,
  ShieldAlert,
  RotateCcw,
} from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const {
    attendance,
    employees,
    shifts,
    overtime,
    corrections,
    clockIn,
    clockOut,
    reviewOvertime,
    submitOvertime,
    submitAttendanceCorrection,
    reviewCorrection,
    addShift,
    assignShift,
  } = useHrmsData();

  const [activeTab, setActiveTab] = useState('01');
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);

  const pendingCorrectionsCount = corrections.filter((c) => c.status === 'PENDING').length;
  const pendingOtCount = overtime.filter((o) => o.status === 'PENDING').length;
  const totalPendingManagerQueue = pendingCorrectionsCount + pendingOtCount;

  const todayRecord = attendance.find((a) => a.employeeId === 'emp-1');

  const tabs: TabItem[] = [
    {
      id: '01',
      label: '01 Daily Punch Table',
      icon: <Clock size={16} />,
    },
    {
      id: '02',
      label: '02 Monthly Summary Grid',
      icon: <Calendar size={16} />,
    },
    {
      id: '03',
      label: '03 Shift Rotation Scheduler',
      icon: <Layers size={16} />,
    },
    {
      id: '04',
      label: '04 Overtime & Regularization Log',
      icon: <ShieldAlert size={16} />,
      badge: totalPendingManagerQueue || undefined,
    },
  ];

  return (
    <HrmsPageContainer
      title="Attendance Management"
      description="Daily clock-in/out attendance logs, shift rotation schedules, overtime recording, and employee attendance regularization requests."
      badgeText="HRMS-DEV-02"
      actionsSlot={
        <button
          onClick={() => setIsCorrectionModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={14} /> Regularize Attendance
          {pendingCorrectionsCount > 0 && (
            <span
              style={{
                marginLeft: '4px',
                fontSize: '11px',
                padding: '1px 6px',
                borderRadius: '999px',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                fontWeight: 700,
              }}
            >
              {pendingCorrectionsCount}
            </span>
          )}
        </button>
      }
    >
      {/* Live Punch Clock Terminal Header */}
      <div style={{ marginBottom: '24px' }}>
        <ClockInOutWidget
          todayRecord={todayRecord}
          shifts={shifts}
          onClockIn={() => clockIn('emp-1')}
          onClockOut={() => clockOut('emp-1')}
        />
      </div>

      {/* Canonical Functional Slices Tabs */}
      <HrmsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* 01 Daily Punch Table */}
      {activeTab === '01' && (
        <AttendanceDailyTable
          attendanceRecords={attendance}
          employees={employees}
          shifts={shifts}
          onAddCorrectionClick={() => setIsCorrectionModalOpen(true)}
        />
      )}

      {/* 02 Monthly Summary Grid */}
      {activeTab === '02' && (
        <MonthlySummaryGridView
          attendanceRecords={attendance}
          employees={employees}
          overtimeRecords={overtime}
        />
      )}

      {/* 03 Shift Rotation Scheduler */}
      {activeTab === '03' && (
        <ShiftRotationSchedulerView
          shifts={shifts}
          employees={employees}
          onAddShift={addShift}
          onAssignShift={assignShift}
        />
      )}

      {/* 04 Overtime & Regularization Log */}
      {activeTab === '04' && (
        <OvertimeRegularizationLogView
          corrections={corrections}
          overtimeRecords={overtime}
          employees={employees}
          attendanceRecords={attendance}
          onReviewCorrection={reviewCorrection}
          onReviewOvertime={reviewOvertime}
          onSubmitCorrection={submitAttendanceCorrection}
          onSubmitOvertime={submitOvertime}
        />
      )}

      {/* Attendance Regularization Modal */}
      <AttendanceCorrectionModal
        isOpen={isCorrectionModalOpen}
        onClose={() => setIsCorrectionModalOpen(false)}
        corrections={corrections}
        employees={employees}
        onSubmitCorrection={submitAttendanceCorrection}
        onReviewCorrection={reviewCorrection}
      />
    </HrmsPageContainer>
  );
};
