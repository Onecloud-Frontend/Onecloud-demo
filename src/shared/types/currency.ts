/**
 * Canonical Currency & Monetary Value Types
 * ISO 4217 currency identifiers and monetary value objects.
 */

export type CurrencyCode =
  | 'INR'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'AED'
  | 'SGD'
  | 'JPY'
  | 'CAD'
  | 'AUD';

export interface Money {
  amount: number;
  currency: CurrencyCode;
  formatted?: string;
}
