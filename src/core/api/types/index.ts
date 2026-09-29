/**
 * Generic API envelope used across enterprise backend microservices.
 */
export interface ApiResponseEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
