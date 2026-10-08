import { IApiClient, registerMockAdapter } from '@core/api/client';
import { ApiResponseEnvelope, PaginationParams } from '@core/api/types';
import { routeMockRequest } from './handlers/mockRouter';

/**
 * Common Mock API Adapter
 * Fulfills the IApiClient interface contract during the pre-backend phase.
 */
export const mockAdapter: IApiClient = {
  async get<T>(path: string, params?: Record<string, unknown> | PaginationParams): Promise<ApiResponseEnvelope<T>> {
    let url = path;
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      for (const [key, val] of Object.entries(params)) {
        if (val !== undefined && val !== null) {
          searchParams.append(key, String(val));
        }
      }
      const qs = searchParams.toString();
      if (qs) {
        url = url.includes('?') ? `${url}&${qs}` : `${url}?${qs}`;
      }
    }
    return routeMockRequest<T>('GET', url);
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
