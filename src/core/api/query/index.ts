/**
 * Core query configuration defaults placeholder.
 */
export interface QueryDefaultsConfig {
  staleTimeMs: number;
  gcTimeMs: number;
  retryCount: number;
  refetchOnWindowFocus: boolean;
}

export const coreQueryDefaults: QueryDefaultsConfig = {
  staleTimeMs: 1000 * 60 * 5, // 5 minutes
  gcTimeMs: 1000 * 60 * 30,   // 30 minutes
  retryCount: 2,
  refetchOnWindowFocus: false,
};
