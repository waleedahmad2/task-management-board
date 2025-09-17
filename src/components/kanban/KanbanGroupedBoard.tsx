import { JSX, ReactNode } from 'react';

import { cn } from '#/utils';
import KanbanBoard from './KanbanBoard';
import KanbanColumn from './KanbanColumn';

export interface KanbanSection<T> {
  key: string;
  title: string;
  items: T[];
  dotColorClass?: string;
}

interface KanbanGroupedBoardProps<T> {
  sections: KanbanSection<T>[];
  renderItem: (item: T, index: number) => ReactNode;
  onAddItem?: (sectionKey: string) => void;
  className?: string;
}

const KanbanGroupedBoard = <T,>({
  sections = [],
  renderItem,
  onAddItem,
  className = '',
}: KanbanGroupedBoardProps<T>): JSX.Element => (
  <KanbanBoard className={className}>
    {sections.map(section => {
      const { key, title, items = [], dotColorClass } = section || {};
      const itemsCount = items?.length || 0;

      return (
        <KanbanColumn
          key={key}
          title={title}
          count={itemsCount}
          dotColorClass={cn('w-3 h-3 rounded-full', dotColorClass)}
          droppableId={key}
          onAddItem={onAddItem ? () => onAddItem(key) : undefined}
          items={items?.map((item: any) => item.id) || []}
        >
          {itemsCount > 0 ? (
            items.map((item, index) => renderItem(item, index))
          ) : null}
        </KanbanColumn>
      );
    })}
  </KanbanBoard>
);

export default KanbanGroupedBoard;
