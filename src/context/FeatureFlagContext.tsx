import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { FEATURE_FLAG_DEFAULTS, FeatureFlags, FeatureFlagKey } from '#/constants/featureFlags';

interface FeatureFlagContextType {
  flags: FeatureFlags;
  toggleFlag: (flagKey: FeatureFlagKey) => void;
  isEnabled: (flagKey: FeatureFlagKey) => boolean;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

const STORAGE_KEY = 'task-management-feature-flags';

const loadFlagsFromStorage = (): FeatureFlags => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all flags exist
      return { ...FEATURE_FLAG_DEFAULTS, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to load feature flags from storage:', error);
  }
  return FEATURE_FLAG_DEFAULTS;
};

const saveFlagsToStorage = (flags: FeatureFlags): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  } catch (error) {
    console.warn('Failed to save feature flags to storage:', error);
  }
};

interface FeatureFlagProviderProps {
  children: ReactNode;
}

export const FeatureFlagProvider = ({ children }: FeatureFlagProviderProps) => {
  const [flags, setFlags] = useState<FeatureFlags>(loadFlagsFromStorage);

  useEffect(() => {
    saveFlagsToStorage(flags);
  }, [flags]);

  const toggleFlag = (flagKey: FeatureFlagKey): void => {
    setFlags(prev => ({
      ...prev,
      [flagKey]: !prev[flagKey],
    }));
  };

  const isEnabled = (flagKey: FeatureFlagKey): boolean => {
    return flags[flagKey];
  };

  const value: FeatureFlagContextType = {
    flags,
    toggleFlag,
    isEnabled,
  };

  return <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>;
};

export const useFeatureFlags = (): FeatureFlagContextType => {
  const context = useContext(FeatureFlagContext);
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
};
