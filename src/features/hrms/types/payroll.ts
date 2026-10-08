/**
 * Canonical Payroll & Compensation Types
 * Ownership: Team HRMS
 */

export type SalaryComponentType = 'EARNING' | 'DEDUCTION';

export type SalaryCalculationType = 'FLAT' | 'PERCENTAGE_OF_BASIC';

export interface SalaryComponent {
  id: string;
  code: string;
  name: string;
  type: SalaryComponentType;
  calculationType: SalaryCalculationType;
  taxable: boolean;
  isMandatory: boolean;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface SalaryStructureComponent {
  componentId: string;
  componentName: string;
  type: SalaryComponentType;
  amount: number;
  formula?: string;
}

export interface SalaryStructure {
  id: string;
  name: string;
  description?: string;
  basicPay: number;
  components: SalaryStructureComponent[];
  totalGross: number;
  totalDeductions: number;
  netPay: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export type PayrollRunStatus =
  | 'DRAFT'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'LOCKED'
  | 'CANCELLED';

export interface PayrollRun {
  id: string;
  runCode: string;
  payrollPeriod: string;
  startDate: string;
  endDate: string;
  status: PayrollRunStatus;
  totalEmployees: number;
  totalGrossPay: number;
  totalDeductions: number;
  totalNetPay: number;
  processedBy: string;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type PayrollStatus = 'Paid' | 'Processing' | 'Review' | 'On Hold' | 'Pending';

export interface SalaryBreakdown {
  basicSalary: number;
  houseRentAllowance: number;
  specialAllowance: number;
  conveyanceAllowance: number;
  medicalAllowance: number;
  performanceBonus: number;
  grossSalary: number;
}

export interface StatutoryDeduction {
  providentFund: number; // PF (12% of Basic)
  employeeStateInsurance: number; // ESI (0.75% of Gross if applicable)
  professionalTax: number; // PT (~200 standard)
  taxDeductedAtSource: number; // TDS / Income Tax
  healthAndEducationCess: number; // 4% of TDS
  totalDeductions: number;
}

export interface PayrollRecord {
  id: string;
  payrollCode: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  department: string;
  designation: string;
  workEmail: string;
  annualCtc: number;
  monthlyCtc: number;
  earnings: SalaryBreakdown;
  deductions: StatutoryDeduction;
  netPayable: number;
  payPeriod: string;
  paymentDate: string;
  bankAccountMasked: string;
  panNumber: string;
  pfUan: string;
  status: PayrollStatus;
  remarks?: string;

  // Canonical compatibility fields
  payrollRunId?: string;
  baseSalary?: number;
  grossEarnings?: number;
  netPay?: number;
  paymentStatus?: 'PENDING' | 'PROCESSED' | 'FAILED';
}

export interface PayrollMetrics {
  totalMonthlyPayroll: number;
  payrollGrowthPercentage: number;
  activeEmployeesCount: number;
  disbursementRatePercentage: number;
  pendingReviewsCount: number;
  pendingDaysNotice: number;
  statutoryHoldsCount: number;
  statutoryNoticeText: string;
}

export interface PaySlip {
  slipId: string;
  payrollRecordId: string;
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  panNumber: string;
  pfUan: string;
  bankAccount: string;
  bankName: string;
  payPeriod: string;
  paymentDate: string;
  daysWorked: number;
  lossOfPayDays: number;
  earnings: SalaryBreakdown;
  deductions: StatutoryDeduction;
  netPay: number;
  netPayInWords: string;
  generatedDate: string;
}

export interface PayrollFilterOptions {
  searchQuery?: string;
  department?: string;
  payPeriod?: string;
  status?: PayrollStatus | 'All';
}

export interface PayslipComponent {
  name: string;
  code: string;
  type: SalaryComponentType;
  amount: number;
}

export interface Payslip {
  id: string;
  payslipNumber: string;
  payrollRunId: string;
  employeeId: string;
  payrollPeriod: string;
  issueDate: string;
  paymentMethod: 'BANK_TRANSFER' | 'CHEQUE' | 'CASH';
  bankAccountNumber?: string;
  components: PayslipComponent[];
  grossAmount: number;
  totalDeductions: number;
  netAmount: number;
  generatedAt: string;
}
