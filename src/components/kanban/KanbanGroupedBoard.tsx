import { JSX, ReactNode } from 'react';

import { cn } from '#/utils';
import DragPlaceholder from './DragPlaceholder';
import KanbanBoard from './KanbanBoard';
import KanbanColumn from './KanbanColumn';

export interface KanbanSection<T> {
  key: string;
  title: string;
  items: T[];
  count?: number;
  dotColorClass?: string;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  error?: Error | null;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

interface DragTask {
  id: string;
  title: string;
}

interface KanbanGroupedBoardProps<T extends { id: string }> {
  sections: KanbanSection<T>[];
  renderItem: (item: T, index: number) => ReactNode;
  onAddItem?: (sectionKey: string) => void;
  isFetchingNextPage?: boolean;
  className?: string;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  activeTask?: DragTask | null;
  overColumn?: string | null;
}

const KanbanGroupedBoard = <T extends { id: string }>({
  sections = [],
  renderItem,
  onAddItem,
  className = '',
  activeTask,
  overColumn,
}: KanbanGroupedBoardProps<T>): JSX.Element => (
  <KanbanBoard className={className}>
    {sections.map(section => {
      const {
        key,
        title,
        items = [],
        count,
        dotColorClass,
        isLoading = false,
        isFetchingNextPage: sectionFetching = false,
        error = null,
        onScroll,
      } = section || {};
      const itemsCount = items?.length || 0;

      return (
        <KanbanColumn
          key={key}
          title={title}
          count={count ?? itemsCount}
          dotColorClass={cn('w-3 h-3 rounded-full', dotColorClass)}
          droppableId={key}
          onAddItem={onAddItem ? () => onAddItem(key) : undefined}
          items={items?.map(item => item.id) || []}
          onScroll={onScroll}
        >
          {isLoading ? (
            <div className='flex items-center justify-center py-8'>
              <div className='text-gray-500'>Loading {title.toLowerCase()}...</div>
            </div>
          ) : error ? (
            <div className='flex items-center justify-center py-8'>
              <div className='text-red-500'>Error loading {title.toLowerCase()}</div>
            </div>
          ) : itemsCount > 0 ? (
            <>
              {items.map((item, index) => renderItem(item, index))}
              {/* Show placeholder at the end when dragging over a column with tasks */}
              {activeTask && overColumn === key && (
                <DragPlaceholder taskTitle={activeTask.title} message='Drop at the end' />
              )}
              {sectionFetching && (
                <div className='flex items-center justify-center py-4'>
                  <div className='text-gray-500'>Loading more...</div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Show placeholder when dragging over empty column */}
              {activeTask && overColumn === key && <DragPlaceholder taskTitle={activeTask.title} message='Drop here' />}
            </>
          )}
        </KanbanColumn>
      );
    })}
  </KanbanBoard>
);

export default KanbanGroupedBoard;
