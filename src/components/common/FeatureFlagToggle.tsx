import { JSX } from 'react';

import { Switch } from '#/components/ui';
import { FEATURE_FLAG_LABELS, FeatureFlagKey } from '#/constants/featureFlags';
import { useFeatureFlags } from '#/context/FeatureFlagContext';
import { cn } from '#/utils';

interface FeatureFlagToggleProps {
  flagKey: FeatureFlagKey;
  className?: string;
}

const FeatureFlagToggle = ({ flagKey, className = '' }: FeatureFlagToggleProps): JSX.Element => {
  const { isEnabled, toggleFlag } = useFeatureFlags();
  const isOn = isEnabled(flagKey);

  return (
    <div className={cn('flex items-start justify-between p-4 bg-white border border-gray-200 rounded-lg', className)}>
      <div className='flex-1 mr-4'>
        <h3 className='text-sm font-medium text-gray-900 mb-1'>{FEATURE_FLAG_LABELS[flagKey]}</h3>
      </div>
      <Switch checked={isOn} onCheckedChange={() => toggleFlag(flagKey)} className='flex-shrink-0' />
    </div>
  );
};

export default FeatureFlagToggle;
