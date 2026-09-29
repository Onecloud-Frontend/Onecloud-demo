export interface TelemetryEvent {
  eventName: string;
  category: 'navigation' | 'interaction' | 'performance' | 'security';
  properties?: Record<string, unknown>;
}

export const logTelemetry = (event: TelemetryEvent): void => {
  // Demo telemetry dispatcher (no external network calls)
  if (import.meta.env.DEV && event.eventName) {
    // Development mode trace
  }
};
