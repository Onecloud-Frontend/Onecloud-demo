import { IApiClient, registerMockAdapter } from '@core/api/client';
import { ApiResponseEnvelope, PaginationParams } from '@core/api/types';
import { routeMockRequest } from './handlers/mockRouter';

/**
 * Common Mock API Adapter
 * Fulfills the IApiClient interface contract during the pre-backend phase.
 */
export const mockAdapter: IApiClient = {
  async get<T>(path: string, _params?: Record<string, unknown> | PaginationParams): Promise<ApiResponseEnvelope<T>> {
    return routeMockRequest<T>('GET', path);
  },

  async post<T>(path: string, body?: unknown): Promise<ApiResponseEnvelope<T>> {
    return routeMockRequest<T>('POST', path, body);
  },

  async put<T>(path: string, body?: unknown): Promise<ApiResponseEnvelope<T>> {
    return routeMockRequest<T>('PUT', path, body);
  },

  async delete<T>(path: string): Promise<ApiResponseEnvelope<T>> {
    return routeMockRequest<T>('DELETE', path);
  },
};

/**
 * Initialize and connect the mock adapter to the core API client.
 */
export function initializeMockApi(): void {
  registerMockAdapter(mockAdapter);
}
