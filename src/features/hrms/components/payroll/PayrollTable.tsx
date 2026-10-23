import React, { useState, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  RotateCcw,
  PauseCircle,
  PlayCircle,
  FileText,
  Play,
} from 'lucide-react';
import type { PayrollRecord, PayrollStatus } from '../../types/payroll';
import { DEPARTMENTS, PAY_PERIODS } from '@mock/hrms/payrollMockData';

interface PayrollTableProps {
  records: PayrollRecord[];
  onViewPaySlip: (record: PayrollRecord) => void;
  onRunPayrollModalOpen: () => void;
  onUpdateStatus: (id: string, status: PayrollStatus) => void;
  onBatchStatusUpdate: (ids: string[], status: PayrollStatus) => void;
  onSearchChange: (query: string) => void;
  onDepartmentChange: (dept: string) => void;
  onPeriodChange: (period: string) => void;
  onStatusFilterChange: (status: PayrollStatus | 'All') => void;
  selectedDepartment: string;
  selectedPeriod: string;
  selectedStatus: PayrollStatus | 'All';
  searchQuery: string;
}

export const PayrollTable: React.FC<PayrollTableProps> = ({
  records,
  onViewPaySlip,
  onRunPayrollModalOpen,
  onUpdateStatus,
  onBatchStatusUpdate,
  onSearchChange,
  onDepartmentChange,
  onPeriodChange,
  onStatusFilterChange,
  selectedDepartment,
  selectedPeriod,
  selectedStatus,
  searchQuery,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 7;

  // Reset to page 1 whenever any filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDepartment, selectedPeriod, selectedStatus]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(records.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, records.length);
  const paginatedRecords = records.slice(startIndex, endIndex);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const pageIds = paginatedRecords.map((r) => r.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    } else {
      const pageIds = new Set(paginatedRecords.map((r) => r.id));
      setSelectedIds((prev) => prev.filter((id) => !pageIds.has(id)));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isCurrentPageAllSelected =
    paginatedRecords.length > 0 &&
    paginatedRecords.every((r) => selectedIds.includes(r.id));

  const renderStatusBadge = (status: PayrollStatus) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="payroll-status-pill paid">
            <span className="payroll-status-dot paid" />
            Paid
          </span>
        );
      case 'Processing':
        return (
          <span className="payroll-status-pill processing">
            <span className="payroll-status-dot processing" />
            Processing
          </span>
        );
      case 'Review':
        return (
          <span className="payroll-status-pill review">
            <span className="payroll-status-dot review" />
            Review
          </span>
        );
      case 'On Hold':
        return (
          <span className="payroll-status-pill on-hold">
            <span className="payroll-status-dot on-hold" />
            On Hold
          </span>
        );
      default:
        return (
          <span className="payroll-status-pill">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="payroll-table-card">
      {/* Search & Filters Toolbar */}
      <div className="payroll-toolbar">
        <div className="payroll-toolbar-left">
          {/* Search Input */}
          <div className="payroll-search-wrapper">
            <Search size={15} className="payroll-search-icon" />
            <input
              type="text"
              placeholder="Search employee, ID..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="payroll-search-input"
            />
          </div>

          {/* Department Filter */}
          <div className="payroll-select-wrapper">
            <select
              value={selectedDepartment}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="payroll-select"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="payroll-select-icon" />
          </div>

          {/* Pay Period Filter */}
          <div className="payroll-select-wrapper">
            <select
              value={selectedPeriod}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="payroll-select"
            >
              {PAY_PERIODS.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="payroll-select-icon" />
          </div>

          {/* Status Filter */}
          <div className="payroll-select-wrapper">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusFilterChange(e.target.value as PayrollStatus | 'All')}
              className="payroll-select"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Processing">Processing</option>
              <option value="Review">Review</option>
              <option value="On Hold">On Hold</option>
            </select>
            <ChevronDown size={14} className="payroll-select-icon" />
          </div>
        </div>

        {/* CTA: Run Monthly Payroll Button */}
        <button
          type="button"
          onClick={onRunPayrollModalOpen}
          className="payroll-btn-run"
        >
          <Play size={14} fill="currentColor" />
          <span>Run Monthly Payroll</span>
        </button>
      </div>

      {/* Enterprise Data Table */}
      <div className="payroll-table-responsive">
        <table className="payroll-table">
          <thead className="payroll-table-head">
            <tr>
              <th className="payroll-table-th checkbox-col">
                <input
                  type="checkbox"
                  checked={isCurrentPageAllSelected}
                  onChange={handleSelectAll}
                  className="payroll-checkbox"
                />
              </th>
              <th className="payroll-table-th">PAYROLL ID</th>
              <th className="payroll-table-th">EMPLOYEE &amp; CTC</th>
              <th className="payroll-table-th">EARNINGS / DEDUCTIONS</th>
              <th className="payroll-table-th">PAYMENT DATE</th>
              <th className="payroll-table-th">PAYROLL STATUS</th>
              <th className="payroll-table-th action-col">PAY SLIP</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRecords.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: '48px 20px',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                  }}
                >
                  No payroll records match the specified filters.
                </td>
              </tr>
            ) : (
              paginatedRecords.map((record) => {
                const isSelected = selectedIds.includes(record.id);
                return (
                  <tr
                    key={record.id}
                    className={`payroll-table-row ${isSelected ? 'selected' : ''}`}
                  >
                    {/* Checkbox */}
                    <td className="payroll-table-td checkbox-col">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(record.id)}
                        className="payroll-checkbox"
                      />
                    </td>

                    {/* Payroll Code */}
                    <td className="payroll-table-td payroll-code-badge">
                      {record.payrollCode}
                    </td>

                    {/* Employee & CTC */}
                    <td className="payroll-table-td">
                      <div className="payroll-emp-name">{record.employeeName}</div>
                      <div className="payroll-emp-sub">
                        {record.designation} · {record.department}
                      </div>
                      <div className="payroll-emp-ctc">
                        CTC: ₹{(record.annualCtc / 100000).toFixed(1)} LPA
                      </div>
                    </td>

                    {/* Earnings & Deductions */}
                    <td className="payroll-table-td">
                      <div className="payroll-net-amount">
                        Net: ₹{record.netPayable.toLocaleString()}
                      </div>
                      <div className="payroll-gross-ded">
                        Gross: ₹{record.earnings.grossSalary.toLocaleString()} | Ded: ₹{record.deductions.totalDeductions.toLocaleString()}
                      </div>
                    </td>

                    {/* Payment Date */}
                    <td className="payroll-table-td" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {record.paymentDate}
                    </td>

                    {/* Payroll Status */}
                    <td className="payroll-table-td">
                      {renderStatusBadge(record.status)}
                    </td>

                    {/* Actions: View Pay Slip & Quick Status */}
                    <td className="payroll-table-td action-col">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateStatus(
                              record.id,
                              record.status === 'On Hold' ? 'Review' : 'On Hold'
                            )
                          }
                          className={`payroll-btn-toggle-hold ${record.status === 'On Hold' ? 'release' : 'hold'}`}
                        >
                          {record.status === 'On Hold' ? 'Release' : 'Hold'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onViewPaySlip(record)}
                          className="payroll-btn-slip"
                        >
                          <FileText size={13} />
                          <span>Pay Slip</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer: Batch Actions (Left) & Fully Workable Pagination (Right) */}
      <div className="payroll-footer">
        {/* Left Action Buttons */}
        <div className="payroll-footer-actions">
          <button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={() => onBatchStatusUpdate(selectedIds, 'Processing')}
            className="payroll-btn-batch"
          >
            <RotateCcw size={13} />
            <span>Recalculate</span>
          </button>

          <button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={() => onBatchStatusUpdate(selectedIds, 'On Hold')}
            className="payroll-btn-batch"
          >
            <PauseCircle size={13} />
            <span>Hold</span>
          </button>

          <button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={() => onBatchStatusUpdate(selectedIds, 'Paid')}
            className="payroll-btn-batch approve"
          >
            <PlayCircle size={13} />
            <span>Approve &amp; Pay</span>
          </button>
        </div>

        {/* Right Workable Pagination */}
        <div className="payroll-pagination-wrapper">
          <span>
            Showing {records.length === 0 ? 0 : startIndex + 1} to {endIndex} of {records.length} entries
          </span>

          <div className="payroll-pagination-controls">
            {/* Prev Button */}
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="payroll-page-nav-btn"
              title="Previous Page"
            >
              ‹
            </button>

            {/* Dynamic Interactive Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setCurrentPage(pageNumber)}
                className={`payroll-page-number-btn ${safeCurrentPage === pageNumber ? 'active' : ''}`}
              >
                {pageNumber}
              </button>
            ))}

            {/* Next Button */}
            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="payroll-page-nav-btn"
              title="Next Page"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
