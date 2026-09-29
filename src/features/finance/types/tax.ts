/**
 * Canonical Indian & Statutory Tax Types
 * Ownership: Team Finance
 */

export type TaxType = 'GST' | 'TDS' | 'TCS' | 'VAT' | 'CUSTOMS';

export interface TaxConfiguration {
  id: string;
  taxCode: string;
  taxName: string;
  taxType: TaxType;
  ratePercentage: number;
  isInterState: boolean;
  glAccountId: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface TaxRule {
  id: string;
  name: string;
  hsnSacCode?: string;
  cgstRate: number;
  sgstRate: number;
  igstRate: number;
  effectiveFrom: string;
  effectiveTo: string | null;
}

export interface TaxCalculation {
  taxableAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalTax: number;
}

export interface TaxPeriod {
  id: string;
  periodName: string;
  startDate: string;
  endDate: string;
  status: 'OPEN' | 'FILED' | 'AUDITED';
  filedDate: string | null;
  totalOutputTax: number;
  totalInputTaxCredit: number;
  netTaxPayable: number;
}
