/**
 * Architectural placeholder for request/response interceptor pipeline.
 */
export interface RequestInterceptorContext {
  tenantId?: string;
  authToken?: string;
  traceId?: string;
}

export const applyStandardHeaders = (context: RequestInterceptorContext): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (context.tenantId) headers['X-Tenant-Id'] = context.tenantId;
  if (context.authToken) headers['Authorization'] = 'Bearer [TOKEN_MANAGED_BY_CORE]';
  if (context.traceId) headers['X-Correlation-Id'] = context.traceId;
  return headers;
};
