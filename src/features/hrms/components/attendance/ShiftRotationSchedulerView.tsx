import React, { useState } from 'react';
import { Shift, Employee } from '../../types';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';
import {
  Sun,
  Moon,
  Clock,
  Plus,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Sliders,
  Layers,
} from 'lucide-react';

interface ShiftRotationSchedulerViewProps {
  shifts: Shift[];
  employees: Employee[];
  onAddShift?: (shift: Omit<Shift, 'id'>) => void;
  onAssignShift?: (employeeId: string, shiftId: string) => void;
}

export const ShiftRotationSchedulerView: React.FC<ShiftRotationSchedulerViewProps> = ({
  shifts,
  employees,
  onAddShift,
  onAssignShift,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'roster' | 'definitions'>('roster');
  const [isDefineModalOpen, setIsDefineModalOpen] = useState(false);
  const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);
  const [selectedShiftForDrawer, setSelectedShiftForDrawer] = useState<string>(shifts[0]?.id || '');
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [rotationPattern, setRotationPattern] = useState<string>('WEEKLY');
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // New Shift Form State
  const [newShiftCode, setNewShiftCode] = useState('');
  const [newShiftName, setNewShiftName] = useState('');
  const [newStartTime, setNewStartTime] = useState('08:00');
  const [newEndTime, setNewEndTime] = useState('17:00');
  const [newGracePeriod, setNewGracePeriod] = useState(15);
  const [newIsNight, setNewIsNight] = useState(false);

  // Local shift assignments map for interactive demonstration
  const [shiftAssignmentsMap, setShiftAssignmentsMap] = useState<Record<string, string>>({
    'emp-1': 'shift-1',
    'emp-2': 'shift-1',
    'emp-3': 'shift-3', // Night Ops
    'emp-4': 'shift-1',
    'emp-5': 'shift-2', // Early Bird
    'emp-6': 'shift-2',
    'emp-7': 'shift-3', // Night Ops
    'emp-8': 'shift-1',
  });

  const getShift = (id: string) => shifts.find((s) => s.id === id) || shifts[0];

  // Week days for rotation roster
  const weekDays = [
    { key: 'mon', label: 'Mon', date: 'Oct 05' },
    { key: 'tue', label: 'Tue', date: 'Oct 06' },
    { key: 'wed', label: 'Wed', date: 'Oct 07' },
    { key: 'thu', label: 'Thu', date: 'Oct 08' },
    { key: 'fri', label: 'Fri', date: 'Oct 09' },
    { key: 'sat', label: 'Sat', date: 'Oct 10', isWeekend: true },
    { key: 'sun', label: 'Sun', date: 'Oct 11', isWeekend: true },
  ];

  // Handle new shift submit
  const handleCreateShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShiftCode || !newShiftName) return;

    if (onAddShift) {
      onAddShift({
        shiftCode: newShiftCode.toUpperCase(),
        name: newShiftName,
        startTime: newStartTime,
        endTime: newEndTime,
        gracePeriodMinutes: Number(newGracePeriod),
        isNightShift: newIsNight,
        status: 'ACTIVE',
      });
    }

    setSuccessBanner(`Shift "${newShiftName}" created successfully!`);
    setIsDefineModalOpen(false);
    setNewShiftCode('');
    setNewShiftName('');
    setTimeout(() => setSuccessBanner(null), 4000);
  };

  // Handle shift assignment submit
  const handleApplyAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployeeIds.length === 0 || !selectedShiftForDrawer) return;

    const updated = { ...shiftAssignmentsMap };
    selectedEmployeeIds.forEach((empId) => {
      updated[empId] = selectedShiftForDrawer;
      if (onAssignShift) {
        onAssignShift(empId, selectedShiftForDrawer);
      }
    });

    setShiftAssignmentsMap(updated);
    const shift = getShift(selectedShiftForDrawer);
    setSuccessBanner(
      `Assigned ${selectedEmployeeIds.length} employee(s) to "${shift.name}" with ${rotationPattern} pattern!`
    );
    setIsAssignDrawerOpen(false);
    setSelectedEmployeeIds([]);
    setTimeout(() => setSuccessBanner(null), 4000);
  };

  const toggleEmployeeSelection = (id: string) => {
    if (selectedEmployeeIds.includes(id)) {
      setSelectedEmployeeIds(selectedEmployeeIds.filter((item) => item !== id));
    } else {
      setSelectedEmployeeIds([...selectedEmployeeIds, id]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Success Notification Banner */}
      {successBanner && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#10b981',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Header Controls & Actions Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          backgroundColor: 'var(--bg-elevated)',
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        {/* Sub-tab Navigation */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveSubTab('roster')}
            style={{
              padding: '7px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeSubTab === 'roster' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: activeSubTab === 'roster' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Calendar size={14} /> Weekly Rotation Roster
          </button>
          <button
            onClick={() => setActiveSubTab('definitions')}
            style={{
              padding: '7px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeSubTab === 'definitions' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: activeSubTab === 'definitions' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sliders size={14} /> Shift Definitions ({shifts.length})
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsDefineModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Plus size={15} /> Define New Shift
          </button>
          <button
            onClick={() => setIsAssignDrawerOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-primary)',
              color: '#ffffff',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Layers size={15} /> Assign Shift Drawer
          </button>
        </div>
      </div>

      {/* VIEW A: Weekly Rotation Roster */}
      {activeSubTab === 'roster' && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden',
          }}
        >
          {/* Week Selector Bar */}
          <div
            style={{
              padding: '12px 18px',
              backgroundColor: 'var(--bg-elevated)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Active Rotation Period:
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  color: 'var(--brand-primary)',
                }}
              >
                October 05 – October 11, 2026 (Week 41)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Current Week
              </span>
              <button
                style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Roster Matrix Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)', width: '220px' }}>
                    EMPLOYEE
                  </th>
                  {weekDays.map((day) => (
                    <th
                      key={day.key}
                      style={{
                        padding: '10px 12px',
                        fontWeight: 700,
                        color: day.isWeekend ? 'var(--text-muted)' : 'var(--text-primary)',
                        backgroundColor: day.isWeekend ? 'rgba(0,0,0,0.1)' : 'transparent',
                        borderLeft: '1px solid var(--border-subtle)',
                        textAlign: 'center',
                      }}
                    >
                      <div>{day.label}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>{day.date}</div>
                    </th>
                  ))}
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center', width: '100px' }}>
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => {
                  const assignedShiftId = shiftAssignmentsMap[emp.id] || 'shift-1';
                  const shift = getShift(assignedShiftId);

                  return (
                    <tr
                      key={emp.id}
                      style={{ borderBottom: '1px solid var(--border-subtle)' }}
                    >
                      {/* Employee Cell */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: 'var(--radius-md)',
                              backgroundColor: 'rgba(99, 102, 241, 0.12)',
                              color: 'var(--brand-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '11px',
                              border: '1px solid rgba(99, 102, 241, 0.25)',
                              flexShrink: 0,
                            }}
                          >
                            {emp.firstName?.[0] || ''}{emp.lastName?.[0] || ''}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                              {emp.firstName} {emp.lastName}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                              {emp.employeeCode} • {emp.designation}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Day Cells */}
                      {weekDays.map((day) => (
                        <td
                          key={day.key}
                          style={{
                            padding: '8px 10px',
                            borderLeft: '1px solid var(--border-subtle)',
                            backgroundColor: day.isWeekend ? 'rgba(0,0,0,0.06)' : 'transparent',
                            textAlign: 'center',
                          }}
                        >
                          {day.isWeekend ? (
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                backgroundColor: 'rgba(148, 163, 184, 0.12)',
                                color: '#94a3b8',
                                fontSize: '10px',
                                fontWeight: 700,
                              }}
                            >
                              WEEK OFF
                            </span>
                          ) : (
                            <div
                              style={{
                                display: 'inline-flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                backgroundColor: shift.isNightShift
                                  ? 'rgba(168, 85, 247, 0.15)'
                                  : 'rgba(99, 102, 241, 0.15)',
                                color: shift.isNightShift ? '#c084fc' : 'var(--brand-primary)',
                                border: shift.isNightShift
                                  ? '1px solid rgba(168, 85, 247, 0.25)'
                                  : '1px solid rgba(99, 102, 241, 0.25)',
                              }}
                            >
                              <span style={{ fontWeight: 700, fontSize: '11px' }}>{shift.shiftCode}</span>
                              <span style={{ fontSize: '9px', opacity: 0.85 }}>
                                {shift.startTime}–{shift.endTime}
                              </span>
                            </div>
                          )}
                        </td>
                      ))}

                      {/* Change Shift Action */}
                      <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                        <button
                          onClick={() => {
                            setSelectedEmployeeIds([emp.id]);
                            setSelectedShiftForDrawer(assignedShiftId);
                            setIsAssignDrawerOpen(true);
                          }}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-elevated)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-subtle)',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Reassign
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW B: Shift Definitions (Master Configuration) */}
      {activeSubTab === 'definitions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {shifts.map((shift) => (
            <div
              key={shift.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: shift.isNightShift ? 'rgba(168, 85, 247, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                        color: shift.isNightShift ? '#c084fc' : 'var(--brand-primary)',
                      }}
                    >
                      {shift.isNightShift ? <Moon size={22} /> : <Sun size={22} />}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)', fontWeight: 700 }}>
                        {shift.name}
                      </h4>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        Code: {shift.shiftCode}
                      </span>
                    </div>
                  </div>
                  <HrmsStatusBadge status={shift.status} size="sm" />
                </div>

                <div
                  style={{
                    marginTop: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '20px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>{shift.startTime}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>to</span>
                  <span>{shift.endTime}</span>
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                }}
              >
                <div style={{ color: 'var(--text-muted)' }}>
                  Grace Window: <strong style={{ color: 'var(--text-primary)' }}>{shift.gracePeriodMinutes} mins</strong>
                </div>
                {shift.isNightShift && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#c084fc',
                      backgroundColor: 'rgba(168, 85, 247, 0.12)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    Night Differential Eligible
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedShiftForDrawer(shift.id);
                  setIsAssignDrawerOpen(true);
                }}
                style={{
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-elevated)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                Assign Shift to Team →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: Define New Shift */}
      {isDefineModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '20px',
          }}
          onClick={() => setIsDefineModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              width: '100%',
              maxWidth: '480px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} style={{ color: 'var(--brand-primary)' }} />
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Define New Work Shift
                </h3>
              </div>
              <button
                onClick={() => setIsDefineModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateShift} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Shift Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MID-01"
                    value={newShiftCode}
                    onChange={(e) => setNewShiftCode(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      marginTop: '4px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Shift Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Afternoon Operations Shift"
                    value={newShiftName}
                    onChange={(e) => setNewShiftName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      marginTop: '4px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Start Time</label>
                  <input
                    type="time"
                    required
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      marginTop: '4px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>End Time</label>
                  <input
                    type="time"
                    required
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      marginTop: '4px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Grace Period (Minutes)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    required
                    value={newGracePeriod}
                    onChange={(e) => setNewGracePeriod(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      marginTop: '4px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-primary)' }}>
                    <input
                      type="checkbox"
                      checked={newIsNight}
                      onChange={(e) => setNewIsNight(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span>Night Shift (Overnight)</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsDefineModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 20px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--brand-primary)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Create Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER: Shift Assignment Drawer */}
      {isAssignDrawerOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 1000,
          }}
          onClick={() => setIsAssignDrawerOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              height: '100%',
              backgroundColor: 'var(--bg-card)',
              borderLeft: '1px solid var(--border-subtle)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              overflowY: 'auto',
              boxShadow: '-8px 0 24px rgba(0,0,0,0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Layers size={20} style={{ color: 'var(--brand-primary)' }} />
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Shift Assignment Drawer
                </h3>
              </div>
              <button
                onClick={() => setIsAssignDrawerOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleApplyAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Select Target Shift */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Target Shift Schedule
                </label>
                <select
                  value={selectedShiftForDrawer}
                  onChange={(e) => setSelectedShiftForDrawer(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    marginTop: '4px',
                    outline: 'none',
                  }}
                >
                  {shifts.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.shiftCode}) • {s.startTime}–{s.endTime}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rotation Pattern */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Rotation Pattern Policy
                </label>
                <select
                  value={rotationPattern}
                  onChange={(e) => setRotationPattern(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    marginTop: '4px',
                    outline: 'none',
                  }}
                >
                  <option value="WEEKLY">Weekly Rotation (Rotates Every Monday)</option>
                  <option value="BIWEEKLY">Bi-Weekly Rotation (14-Day Cycle)</option>
                  <option value="MONTHLY">Monthly Assignment (First of Month)</option>
                  <option value="FIXED">Permanent / Fixed Shift Assignment</option>
                </select>
              </div>

              {/* Select Target Employees (Multi-select) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Select Employees ({selectedEmployeeIds.length} Selected)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedEmployeeIds.length === employees.length) {
                        setSelectedEmployeeIds([]);
                      } else {
                        setSelectedEmployeeIds(employees.map((e) => e.id));
                      }
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--brand-primary)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {selectedEmployeeIds.length === employees.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>

                <div
                  style={{
                    maxHeight: '220px',
                    overflowY: 'auto',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-elevated)',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    marginTop: '6px',
                  }}
                >
                  {employees.map((emp) => {
                    const isSelected = selectedEmployeeIds.includes(emp.id);
                    return (
                      <div
                        key={emp.id}
                        onClick={() => toggleEmployeeSelection(emp.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 10px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-card)',
                          border: isSelected ? '1px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          style={{ cursor: 'pointer' }}
                        />
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(99, 102, 241, 0.12)',
                            color: 'var(--brand-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '10px',
                            border: '1px solid rgba(99, 102, 241, 0.25)',
                            flexShrink: 0,
                          }}
                        >
                          {emp.firstName?.[0] || ''}{emp.lastName?.[0] || ''}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {emp.firstName} {emp.lastName}
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                            {emp.employeeCode} • {emp.departmentId?.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAssignDrawerOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={selectedEmployeeIds.length === 0}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: selectedEmployeeIds.length > 0 ? 'var(--brand-primary)' : 'var(--bg-elevated)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: selectedEmployeeIds.length > 0 ? 'pointer' : 'not-allowed',
                    opacity: selectedEmployeeIds.length > 0 ? 1 : 0.6,
                  }}
                >
                  Apply Assignment ({selectedEmployeeIds.length})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
