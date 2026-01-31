import { createContext, useContext, type PropsWithChildren } from 'react';
import type { FeatureFlags } from './types';

const FeatureFlagContext = createContext<FeatureFlags | null>(null);

export function FeatureFlagProvider({ children, value }: PropsWithChildren<{ value: FeatureFlags }>) {
    return (
        <FeatureFlagContext.Provider value={value}>
            {children}
        </FeatureFlagContext.Provider>
    );
}

export function useFeatureFlag(flagName: keyof FeatureFlags) {
    const flags = useContext(FeatureFlagContext);
    if (!flags) throw new Error('useFeatureFlag must be used within FeatureFlagProvider');
    return flags[flagName];
}