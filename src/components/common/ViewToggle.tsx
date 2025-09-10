import { JSX } from 'react';

import { Table, Grid3X3 } from 'lucide-react';

import { Button } from '#/components/ui/Button';
import { VIEW_TYPES } from '#/constants';
import { cn } from '#/utils';

/**
 * View type options
 */
export type ViewType = (typeof VIEW_TYPES)[keyof typeof VIEW_TYPES];

/**
 * Props for ViewToggle component
 */
interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  className?: string;
  showLabels?: boolean;
}

/**
 * View toggle component for switching between table and card views
 */
const ViewToggle = ({ currentView, onViewChange, className = '', showLabels = true }: ViewToggleProps): JSX.Element => {
  const currentViewType = currentView;

  const views = [
    {
      type: VIEW_TYPES.TABLE,
      icon: Table,
      label: 'Table View',
      description: 'View as table',
    },
    {
      type: VIEW_TYPES.CARD,
      icon: Grid3X3,
      label: 'Card View',
      description: 'View as cards',
    },
  ];

  const handleViewChange = (viewType: ViewType): void => {
    onViewChange?.(viewType);
  };

  return (
    <div className={cn('flex items-center bg-gray-100 rounded-lg p-1 cursor-pointer', className)}>
      {views.map(view => {
        const { type, icon: Icon, label, description } = view || {};
        const isActive = currentViewType === type;

        return (
          <Button
            key={type}
            variant={isActive ? 'default' : 'ghost'}
            size='sm'
            onClick={() => handleViewChange(type)}
            className={cn(
              'flex items-center space-x-2 px-3 py-2 transition-all duration-200 cursor-pointer',
              isActive
                ? 'bg-white text-indigo-600 shadow-sm hover:bg-white hover:text-indigo-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
            title={description}
          >
            <Icon className='w-4 h-4' />
            {showLabels && <span className='text-sm font-medium'>{label}</span>}
          </Button>
        );
      })}
    </div>
  );
};

export default ViewToggle;
