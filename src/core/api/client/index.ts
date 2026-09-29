/**
 * Core API Client Placeholder
 * Demonstrates the architectural contract for future HTTP transport without invoking real network requests.
 */
export interface ApiClientConfig {
  baseUrl: string;
  timeoutMs: number;
  headers?: Record<string, string>;
}

export interface ApiClientPlaceholder {
  readonly isConfigured: boolean;
  getConfig(): ApiClientConfig;
}

export const defaultClientPlaceholder: ApiClientPlaceholder = {
  isConfigured: true,
  getConfig: () => ({
    baseUrl: '[CORE_CONFIGURED_BASE_URL]',
    timeoutMs: 30000,
    headers: {
      'Accept': 'application/json',
      'X-Client-Platform': 'OneEnterpriseCloud-Web'
    }
  })
};
