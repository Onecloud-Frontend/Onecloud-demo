export interface EnvironmentConfig {
  appEnv: 'development' | 'staging' | 'production';
  apiBaseUrl: string;
  enableTelemetry: boolean;
  version: string;
}

export const environment: EnvironmentConfig = {
  appEnv: (import.meta.env.MODE as 'development' | 'staging' | 'production') || 'development',
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string) || 'https://api.oneenterprisecloud.internal',
  enableTelemetry: false,
  version: '1.0.0-demo',
};
