import { JSX } from 'react';

import { Settings } from 'lucide-react';

import { FEATURE_FLAGS } from '#/constants/featureFlags';
import FeatureFlagToggle from './FeatureFlagToggle';

interface FeatureFlagsSectionProps {
  className?: string;
}

const FeatureFlagsSection = ({ className = '' }: FeatureFlagsSectionProps): JSX.Element => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className='flex items-center space-x-2 mb-4'>
        <Settings className='w-4 h-4 text-gray-600' />
        <h2 className='text-sm font-semibold text-gray-900'>User Preferences</h2>
      </div>

      <div className='space-y-3'>
        <FeatureFlagToggle flagKey={FEATURE_FLAGS.ENABLE_REALTIME} />
        <FeatureFlagToggle flagKey={FEATURE_FLAGS.ENABLE_ASSIGNEES} />
      </div>
    </div>
  );
};

export default FeatureFlagsSection;
