import { ApiResponseEnvelope, PaginatedResult } from '@core/api/types';

export const delay = (ms = 250): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function createMockEnvelope<T>(data: T, message = 'Success (Mock Adapter)'): ApiResponseEnvelope<T> {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

export function createMockPaginatedEnvelope<T>(
  items: T[],
  page = 1,
  pageSize = 10
): ApiResponseEnvelope<PaginatedResult<T>> {
  const totalCount = items.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const start = (page - 1) * pageSize;
  const paginatedItems = items.slice(start, start + pageSize);

  return {
    success: true,
    data: {
      items: paginatedItems,
      totalCount,
      page,
      pageSize,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
    message: 'Success (Mock Paginated)',
    timestamp: new Date().toISOString(),
  };
}
