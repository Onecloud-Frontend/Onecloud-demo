export type EntityId = string;

export type Nullable<T> = T | null;

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
