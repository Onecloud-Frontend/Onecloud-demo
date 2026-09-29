/**
 * Centralized API Client Configuration & Mode Switch
 * Controls whether feature services route to the local Mock Adapter or the Real Backend API Gateway.
 */

export type ApiMode = 'MOCK' | 'REAL';

export interface ApiConfiguration {
  /**
   * Current execution mode.
   * Defaults to 'MOCK' while backend microservices deployment is pending.
   */
  mode: ApiMode;
  baseUrl: string;
  timeoutMs: number;
  headers?: Record<string, string>;
}

export const apiConfig: ApiConfiguration = {
  mode: 'MOCK', // TBD — Switch to 'REAL' once backend API Gateway is deployed
  baseUrl: (import.meta.env.VITE_API_BASE_URL as string) || '[CORE_CONFIGURED_BASE_URL]',
  timeoutMs: 30000,
  headers: {
    'Accept': 'application/json',
    'X-Client-Platform': 'OneEnterpriseCloud-Web',
  },
};
