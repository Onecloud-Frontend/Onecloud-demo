/**
 * Technical API Infrastructure Types
 * Centralized generic contracts for request/response envelopes, pagination, and error handling.
 * NOTE: Domain-specific business models belong in src/features/<domain>/types/, NOT here.
 */

export interface ApiResponseEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ApiErrorDetail[];
  timestamp: string;
}

export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export interface ApiErrorDetail {
  code: ApiErrorCode | string;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: ApiErrorDetail[];
  statusCode: number;
  timestamp: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface RequestMeta {
  requestId?: string;
  timestamp?: string;
  tenantId?: string;
}
