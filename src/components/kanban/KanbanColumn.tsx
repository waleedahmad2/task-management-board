import { JSX, ReactNode } from 'react';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

import { Button } from '#/components/ui/button';
import { useAuth } from '#/context';
import { cn, canCreate } from '#/utils';

interface KanbanColumnProps {
  title: string;
  count?: number;
  dotColorClass?: string;
  children: ReactNode;
  className?: string;
  droppableId?: string;
  onAddItem?: () => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  items?: string[];
}

const KanbanColumn = ({
  title,
  count = 0,
  dotColorClass = 'bg-gray-500',
  children,
  className = '',
  droppableId,
  onAddItem,
  onScroll,
  items = [],
}: KanbanColumnProps): JSX.Element => {
  const { user } = useAuth();
  const canUserCreate = canCreate(user?.role);
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId || title,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex-shrink-0 w-80 transition-all duration-200 flex flex-col h-full min-h-[31.25rem]',
        isOver && 'bg-blue-50 border-2 border-blue-300 rounded-lg shadow-lg transform scale-105',
        className
      )}
    >
      {/* Fixed Header - matching GenericTable design */}
      <div className='flex items-center justify-between mb-3 flex-shrink-0 bg-white rounded-t-lg border border-gray-200 px-4 py-3'>
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

      <div
        className={cn(
          'flex-1 overflow-y-auto min-h-0',
          'bg-white border-x border-b border-gray-200 rounded-b-lg',
          'max-h-[calc(100vh-15.625rem)]'
        )}
        onScroll={onScroll}
        data-scroll-container
      >
        <SortableContext
          items={items.length > 0 ? items : [droppableId || title]}
          strategy={verticalListSortingStrategy}
        >
          <div className='p-3 space-y-4'>{children}</div>
        </SortableContext>
        {items.length === 0 && (
          <div className='text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 min-h-[12.5rem] flex items-center justify-center mx-3'>
            <div>
              <p className='text-sm'>No tasks in {title.toLowerCase()}</p>
              <p className='text-xs text-gray-400 mt-1'>Drop tasks here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
