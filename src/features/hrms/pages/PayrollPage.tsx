import React, { useState, useEffect, useCallback } from 'react';
import {
  RotateCcw,
  Download,
  Calendar,
  Layers,
  ShieldCheck,
  FileText,
  Send,
  CheckCircle,
} from 'lucide-react';
import type {
  PayrollRecord,
  PayrollMetrics,
  PayrollStatus,
  PaySlip,
} from '../types/payroll';
import {
  getPayrollRecords,
  getPayrollMetrics,
  updatePayrollRecordStatus,
  updateBatchPayrollStatus,
  runMonthlyPayrollBatch,
  generatePaySlip,
} from '../services/payrollService';
import {
  PayrollKpiCards,
  PayrollTable,
  SalaryStructureView,
  StatutoryDeductionsView,
  PaySlipModal,
  RunPayrollModal,
  HrmsSubNav,
} from '../components/payroll';
import '../styles/payroll.css';

type ActiveScopeTab =
  | 'monthly-run'
  | 'salary-structure'
  | 'statutory-taxes'
  | 'payslip-distribution';

export const PayrollPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveScopeTab>('monthly-run');
  const [records, setRecords] = useState<PayrollRecord[]>([]);
  const [metrics, setMetrics] = useState<PayrollMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedPeriod, setSelectedPeriod] = useState('October 2026');
  const [selectedStatus, setSelectedStatus] = useState<PayrollStatus | 'All'>('All');

  // Modals state
  const [activePaySlip, setActivePaySlip] = useState<PaySlip | null>(null);
  const [isRunModalOpen, setIsRunModalOpen] = useState(false);

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const [fetchedRecords, fetchedMetrics] = await Promise.all([
      getPayrollRecords({
        searchQuery,
        department: selectedDepartment,
        payPeriod: selectedPeriod,
        status: selectedStatus,
      }),
      getPayrollMetrics(),
    ]);
    setRecords(fetchedRecords);
    setMetrics(fetchedMetrics);
    setIsLoading(false);
  }, [searchQuery, selectedDepartment, selectedPeriod, selectedStatus]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Actions
  const handleViewPaySlip = (record: PayrollRecord) => {
    const slip = generatePaySlip(record);
    setActivePaySlip(slip);
  };

  const handleUpdateStatus = async (id: string, newStatus: PayrollStatus) => {
    await updatePayrollRecordStatus(id, newStatus);
    fetchData();
  };

  const handleBatchStatusUpdate = async (ids: string[], newStatus: PayrollStatus) => {
    await updateBatchPayrollStatus(ids, newStatus);
    fetchData();
  };

  const handleRunPayrollBatch = async (period: string) => {
    await runMonthlyPayrollBatch(period);
    fetchData();
  };

  const handleExportCsv = () => {
    const headers = [
      'Payroll Code',
      'Employee ID',
      'Name',
      'Department',
      'Designation',
      'Annual CTC',
      'Gross Salary',
      'Total Deductions',
      'Net Payable',
      'Payment Date',
      'Status',
    ];
    const rows = records.map((r) => [
      r.payrollCode,
      r.employeeId,
      `"${r.employeeName}"`,
      `"${r.department}"`,
      `"${r.designation}"`,
      r.annualCtc,
      r.earnings.grossSalary,
      r.deductions.totalDeductions,
      r.netPayable,
      r.paymentDate,
      r.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `payroll_report_${selectedPeriod.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBatchDistributeSlips = () => {
    alert(`Success: Dispatched ${records.length} digital pay slips to respective employee work emails.`);
  };

  return (
    <div className="payroll-page-container">
      {/* HRMS Domain Sub-Navigation across all 7 capabilities */}
      <HrmsSubNav />

      {/* 1. Page Header */}
      <div className="payroll-header">
        <div>
          <div className="payroll-breadcrumb">HRMS / OPERATIONS</div>
          <div className="payroll-title-row">
            <h1 className="payroll-title">Payroll Management</h1>
          </div>
          <p className="payroll-description">
            Salary structures, earnings and deductions, monthly payroll processing, and pay slip distribution.
          </p>
        </div>
      </div>

      {/* 2. 4 Metric Summary Cards */}
      {metrics && <PayrollKpiCards metrics={metrics} />}

      {/* 3. Scope Item Tabs */}
      <div className="payroll-tabs-bar">
        <button
          type="button"
          onClick={() => setActiveTab('monthly-run')}
          className={`payroll-tab-button ${activeTab === 'monthly-run' ? 'active' : ''}`}
        >
          <Calendar size={15} />
          <span>Monthly Payroll Run &amp; Processing</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('salary-structure')}
          className={`payroll-tab-button ${activeTab === 'salary-structure' ? 'active' : ''}`}
        >
          <Layers size={15} />
          <span>Salary Structure &amp; CTC Breakdown</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('statutory-taxes')}
          className={`payroll-tab-button ${activeTab === 'statutory-taxes' ? 'active' : ''}`}
        >
          <ShieldCheck size={15} />
          <span>Statutory Deductions &amp; Taxes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('payslip-distribution')}
          className={`payroll-tab-button ${activeTab === 'payslip-distribution' ? 'active' : ''}`}
        >
          <FileText size={15} />
          <span>Pay Slip Generation &amp; Distribution</span>
        </button>
      </div>

      {/* 4. Tab Views */}
      {activeTab === 'monthly-run' && (
        <PayrollTable
          records={records}
          onViewPaySlip={handleViewPaySlip}
          onRunPayrollModalOpen={() => setIsRunModalOpen(true)}
          onUpdateStatus={handleUpdateStatus}
          onBatchStatusUpdate={handleBatchStatusUpdate}
          onSearchChange={setSearchQuery}
          onDepartmentChange={setSelectedDepartment}
          onPeriodChange={setSelectedPeriod}
          onStatusFilterChange={setSelectedStatus}
          selectedDepartment={selectedDepartment}
          selectedPeriod={selectedPeriod}
          selectedStatus={selectedStatus}
          searchQuery={searchQuery}
        />
      )}

      {activeTab === 'salary-structure' && <SalaryStructureView />}

      {activeTab === 'statutory-taxes' && <StatutoryDeductionsView />}

      {activeTab === 'payslip-distribution' && (
        <div className="distribution-card">
          <div className="distribution-header">
            <div>
              <div className="salary-struct-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--status-success)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                <CheckCircle size={13} />
                <span>Ready for One-Click Distribution</span>
              </div>
              <h3 className="salary-struct-title" style={{ fontSize: '18px' }}>
                Pay Slip Distribution Hub · {selectedPeriod}
              </h3>
              <p className="payroll-description" style={{ marginTop: '4px' }}>
                Generate and email confidential password-protected pay slips to all {records.length} employees.
              </p>
            </div>

            <button
              type="button"
              onClick={handleBatchDistributeSlips}
              className="payroll-btn-run"
            >
              <Send size={15} />
              <span>Distribute All Pay Slips ({records.length})</span>
            </button>
          </div>

          <div className="distribution-grid">
            {records.map((r) => (
              <div key={r.id} className="distribution-item-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--team-c-accent)' }}>
                      {r.payrollCode}
                    </span>
                    <span className="payroll-status-pill paid" style={{ padding: '2px 8px', fontSize: '11px' }}>
                      {r.status}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px' }}>
                    {r.employeeName}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {r.designation} · {r.department}
                  </p>
                  <p style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600, marginTop: '8px' }}>
                    Net: ₹{r.netPayable.toLocaleString()}
                  </p>
                </div>

                <div style={{ paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {r.bankAccountMasked}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleViewPaySlip(r)}
                    style={{ fontSize: '12px', fontWeight: 600, color: 'var(--brand-primary)', cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    View Slip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Bottom Actions Bar: Refresh & Export report */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px', paddingBottom: '16px' }}>
        <button
          type="button"
          onClick={fetchData}
          disabled={isLoading}
          className="payroll-btn-batch"
          style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600 }}
        >
          <RotateCcw
            size={14}
            style={{
              animation: isLoading ? 'payroll-spin 1s linear infinite' : 'none',
            }}
          />
          <span>Refresh</span>
        </button>

        <button
          type="button"
          onClick={handleExportCsv}
          className="payroll-btn-run"
        >
          <Download size={14} />
          <span>Export report</span>
        </button>
      </div>

      {/* Modals */}
      <PaySlipModal
        slip={activePaySlip}
        onClose={() => setActivePaySlip(null)}
      />

      <RunPayrollModal
        isOpen={isRunModalOpen}
        onClose={() => setIsRunModalOpen(false)}
        onConfirm={handleRunPayrollBatch}
      />
    </div>
  );
};
