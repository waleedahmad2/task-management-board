import { JSX } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '#/components/ui/button';
import { useAuth } from '#/context';
import { cn } from '#/lib/utils';
import { canCreate } from '#/utils';

interface KanbanColumnHeaderProps {
  title: string;
  count?: number;
  dotColorClass?: string;
  onAddItem?: () => void;
  className?: string;
}

const KanbanColumnHeader = ({
  title,
  count = 0,
  dotColorClass = 'bg-gray-500',
  onAddItem,
  className = '',
}: KanbanColumnHeaderProps): JSX.Element => {
  const { user } = useAuth();
  const canUserCreate = canCreate(user?.role);

  return (
    <div
      className={cn(
        'flex items-center justify-between mb-3 flex-shrink-0 bg-white rounded-t-lg border border-gray-200 px-4 py-3',
        className
      )}
    >
      <div className='flex items-center space-x-2'>
        <div className={cn('w-3 h-3 rounded-full', dotColorClass)} />
        <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>{title}</h3>
      </div>
      <div className='flex items-center space-x-2'>
        <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>{count}</span>
        {onAddItem && canUserCreate && (
          <Button
            onClick={onAddItem}
            variant='ghost'
            size='sm'
            className='h-8 w-8 p-0 hover:bg-gray-200 transition-colors cursor-pointer'
            title={`Add task to ${title}`}
          >
            <Plus className='w-4 h-4 text-gray-500' />
          </Button>
        )}
      </div>
    </div>
  );
};

export default KanbanColumnHeader;
