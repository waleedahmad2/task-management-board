import { JSX, ReactNode } from 'react';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

import { cn } from '#/utils';

interface KanbanColumnProps {
  title: string;
  count?: number;
  dotColorClass?: string;
  children: ReactNode;
  className?: string;
  droppableId?: string;
  onAddItem?: () => void;
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
  items = [],
}: KanbanColumnProps): JSX.Element => {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId || title,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex-shrink-0 w-80 transition-all duration-200',
        isOver && 'bg-blue-50 border-2 border-blue-300 rounded-lg shadow-lg transform scale-105',
        className
      )}
    >
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center space-x-2'>
          <div className={cn('w-3 h-3 rounded-full', dotColorClass)} />
          <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>{title}</h3>
        </div>
        <div className='flex items-center space-x-2'>
          <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>{count}</span>
          {onAddItem && (
            <button
              onClick={onAddItem}
              className='p-1 hover:bg-gray-200 rounded transition-colors'
              title={`Add task to ${title}`}
            >
              <Plus className='w-4 h-4 text-gray-500' />
            </button>
          )}
        </div>
      </div>

      <div className='space-y-3 min-h-[25rem]'>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
        {items.length === 0 && (
          <div className='text-center py-8 text-gray-500 pointer-events-none'>
            <p className='text-sm'>No tasks in {title.toLowerCase()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
