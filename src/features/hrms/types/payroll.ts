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

export interface PayrollRecord {
  id: string;
  payrollRunId: string;
  employeeId: string;
  baseSalary: number;
  grossEarnings: number;
  totalDeductions: number;
  netPay: number;
  paymentStatus: 'PENDING' | 'PROCESSED' | 'FAILED';
  paymentDate: string | null;
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
