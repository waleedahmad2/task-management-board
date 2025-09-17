import { JSX, useState, useCallback } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import { SidebarFooter, SidebarHeader, SidebarItemsList } from '.';
import FeatureFlagsSection from '../common/FeatureFlagsSection';

/**
 * Main sidebar component that combines all sidebar parts
 */
const Sidebar = (): JSX.Element => {
  const [isFeatureFlagsOpen, setIsFeatureFlagsOpen] = useState(false);

  const handleToggleFeatureFlags = useCallback((): void => {
    setIsFeatureFlagsOpen(prev => !prev);
  }, []);

  return (
    <div className='flex flex-col h-full bg-white border-r border-gray-200 w-64'>
      <SidebarHeader />
      <SidebarItemsList />

      {/* Feature Flags Section */}
      <div className='border-t border-gray-200'>
        <button
          onClick={handleToggleFeatureFlags}
          className='w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200'
        >
          <span className='text-sm font-medium text-gray-700'>User Prefernces</span>
          {isFeatureFlagsOpen ? (
            <ChevronUp className='w-4 h-4 text-gray-500' />
          ) : (
            <ChevronDown className='w-4 h-4 text-gray-500' />
          )}
        </button>

        {isFeatureFlagsOpen && (
          <div className='px-4 pb-4'>
            <FeatureFlagsSection />
          </div>
        )}
      </div>

      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
