import { ApiResponseEnvelope, PaginationParams } from '../types';
import { apiConfig } from './apiConfig';

export * from './apiConfig';

/**
 * Standard API Client Interface
 * Stable abstraction implemented by both the Mock Adapter and Real HTTP Client.
 */
export interface IApiClient {
  get<T>(path: string, params?: Record<string, unknown> | PaginationParams): Promise<ApiResponseEnvelope<T>>;
  post<T>(path: string, body?: unknown): Promise<ApiResponseEnvelope<T>>;
  put<T>(path: string, body?: unknown): Promise<ApiResponseEnvelope<T>>;
  delete<T>(path: string): Promise<ApiResponseEnvelope<T>>;
}

let mockAdapterInstance: IApiClient | null = null;

/**
 * Register the mock adapter instance.
 * Called by the mock layer during initialization.
 */
export function registerMockAdapter(adapter: IApiClient): void {
  mockAdapterInstance = adapter;
}

/**
 * Core API Client Proxy
 * Dispatches requests to either Mock Adapter or Real Transport depending on apiConfig.mode.
 */
export const apiClient: IApiClient = {
  async get<T>(path: string, params?: Record<string, unknown> | PaginationParams): Promise<ApiResponseEnvelope<T>> {
    if (apiConfig.mode === 'MOCK') {
      if (!mockAdapterInstance) {
        throw new Error('Mock API Adapter is not registered. Ensure src/mock/ is initialized.');
      }
      return mockAdapterInstance.get<T>(path, params);
    }

    // Real API client transport (TBD — Activated when backend is deployed)
    throw new Error('Real Backend API transport is pending deployment. Set apiConfig.mode = "MOCK".');
  },

  async post<T>(path: string, body?: unknown): Promise<ApiResponseEnvelope<T>> {
    if (apiConfig.mode === 'MOCK') {
      if (!mockAdapterInstance) {
        throw new Error('Mock API Adapter is not registered. Ensure src/mock/ is initialized.');
      }
      return mockAdapterInstance.post<T>(path, body);
    }

    throw new Error('Real Backend API transport is pending deployment. Set apiConfig.mode = "MOCK".');
  },

  async put<T>(path: string, body?: unknown): Promise<ApiResponseEnvelope<T>> {
    if (apiConfig.mode === 'MOCK') {
      if (!mockAdapterInstance) {
        throw new Error('Mock API Adapter is not registered. Ensure src/mock/ is initialized.');
      }
      return mockAdapterInstance.put<T>(path, body);
    }

    throw new Error('Real Backend API transport is pending deployment. Set apiConfig.mode = "MOCK".');
  },

  async delete<T>(path: string): Promise<ApiResponseEnvelope<T>> {
    if (apiConfig.mode === 'MOCK') {
      if (!mockAdapterInstance) {
        throw new Error('Mock API Adapter is not registered. Ensure src/mock/ is initialized.');
      }
      return mockAdapterInstance.delete<T>(path);
    }

    throw new Error('Real Backend API transport is pending deployment. Set apiConfig.mode = "MOCK".');
  },
};
