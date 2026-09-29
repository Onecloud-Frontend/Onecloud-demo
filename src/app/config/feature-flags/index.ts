export interface FeatureFlags {
  teamAPlatformAdminDemo: boolean;
  teamBHrmsDemo: boolean;
  teamCFinanceDemo: boolean;
  enableInteractiveRules: boolean;
}

export const featureFlags: FeatureFlags = {
  teamAPlatformAdminDemo: true,
  teamBHrmsDemo: true,
  teamCFinanceDemo: true,
  enableInteractiveRules: true,
};
