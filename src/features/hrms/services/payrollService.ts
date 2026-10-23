import type {
  PayrollRecord,
  PayrollMetrics,
  PayrollFilterOptions,
  PayrollStatus,
  PaySlip,
} from '../types/payroll';
import { MOCK_PAYROLL_RECORDS, INITIAL_PAYROLL_METRICS } from '@mock/hrms/payrollMockData';

let payrollStore: PayrollRecord[] = [...MOCK_PAYROLL_RECORDS];
let metricsStore: PayrollMetrics = { ...INITIAL_PAYROLL_METRICS };

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPayrollRecords = async (
  options?: PayrollFilterOptions
): Promise<PayrollRecord[]> => {
  await delay(100);
  let records = [...payrollStore];

  if (!options) return records;

  const { searchQuery, department, payPeriod, status } = options;

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    records = records.filter(
      (r) =>
        r.employeeName.toLowerCase().includes(q) ||
        r.employeeId.toLowerCase().includes(q) ||
        r.payrollCode.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.designation.toLowerCase().includes(q)
    );
  }

  if (department && department !== 'All' && department !== 'All Departments') {
    records = records.filter((r) => r.department === department);
  }

  if (payPeriod && payPeriod !== 'All') {
    records = records.filter((r) => r.payPeriod === payPeriod);
  }

  if (status && status !== 'All') {
    records = records.filter((r) => r.status === status);
  }

  return records;
};

export const getPayrollMetrics = async (): Promise<PayrollMetrics> => {
  await delay(80);
  return { ...metricsStore };
};

export const updatePayrollRecordStatus = async (
  id: string,
  newStatus: PayrollStatus
): Promise<PayrollRecord> => {
  await delay(120);
  const index = payrollStore.findIndex((r) => r.id === id);
  if (index === -1) {
    throw new Error(`Record with id ${id} not found.`);
  }

  payrollStore[index] = {
    ...payrollStore[index],
    status: newStatus,
    paymentDate:
      newStatus === 'Paid'
        ? new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : payrollStore[index].paymentDate,
  };

  return payrollStore[index];
};

export const updateBatchPayrollStatus = async (
  ids: string[],
  newStatus: PayrollStatus
): Promise<PayrollRecord[]> => {
  await delay(150);
  payrollStore = payrollStore.map((record) => {
    if (ids.includes(record.id)) {
      return {
        ...record,
        status: newStatus,
        paymentDate:
          newStatus === 'Paid'
            ? new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : record.paymentDate,
      };
    }
    return record;
  });

  return payrollStore.filter((r) => ids.includes(r.id));
};

export const runMonthlyPayrollBatch = async (
  payPeriod: string
): Promise<{ success: boolean; processedCount: number; message: string }> => {
  await delay(300);

  let processed = 0;
  payrollStore = payrollStore.map((record) => {
    if (record.status !== 'On Hold') {
      processed += 1;
      return {
        ...record,
        payPeriod,
        status: 'Paid',
        paymentDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };
    }
    return record;
  });

  metricsStore = {
    ...metricsStore,
    disbursementRatePercentage: 99.2,
    pendingReviewsCount: 0,
  };

  return {
    success: true,
    processedCount: processed,
    message: `Successfully executed monthly payroll run for ${payPeriod}. ${processed} employee payouts processed.`,
  };
};

export const convertAmountToWords = (num: number): string => {
  if (num === 0) return 'Zero Rupees Only';

  const units = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  const helper = (n: number): string => {
    if (n === 0) return '';
    if (n < 20) return units[n];
    if (n < 100) {
      const u = n % 10;
      return tens[Math.floor(n / 10)] + (u > 0 ? ' ' + units[u] : '');
    }
    const h = Math.floor(n / 100);
    const rem = n % 100;
    return units[h] + ' Hundred' + (rem > 0 ? ' and ' + helper(rem) : '');
  };

  const parts: string[] = [];
  const crores = Math.floor(num / 10000000);
  let rem = num % 10000000;
  if (crores > 0) {
    parts.push(`${helper(crores)} Crore${crores > 1 ? 's' : ''}`);
  }

  const lakhs = Math.floor(rem / 100000);
  rem %= 100000;
  if (lakhs > 0) {
    parts.push(`${helper(lakhs)} Lakh${lakhs > 1 ? 's' : ''}`);
  }

  const thousands = Math.floor(rem / 1000);
  rem %= 1000;
  if (thousands > 0) {
    parts.push(`${helper(thousands)} Thousand`);
  }

  if (rem > 0) {
    parts.push(helper(rem));
  }

  return `${parts.join(' ')} Rupees Only`.replace(/\s+/g, ' ').trim();
};

export const generatePaySlip = (record: PayrollRecord): PaySlip => {
  return {
    slipId: `SLIP-${record.payrollCode.replace('PAY-', '')}`,
    payrollRecordId: record.id,
    employeeId: record.employeeId,
    employeeName: record.employeeName,
    designation: record.designation,
    department: record.department,
    panNumber: record.panNumber,
    pfUan: record.pfUan,
    bankAccount: record.bankAccountMasked,
    bankName:
      record.bankAccountMasked.split(' ')[0] || 'Scheduled Commercial Bank',
    payPeriod: record.payPeriod,
    paymentDate: record.paymentDate,
    daysWorked: 30,
    lossOfPayDays: 0,
    earnings: record.earnings,
    deductions: record.deductions,
    netPay: record.netPayable,
    netPayInWords: convertAmountToWords(record.netPayable),
    generatedDate: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };
};
