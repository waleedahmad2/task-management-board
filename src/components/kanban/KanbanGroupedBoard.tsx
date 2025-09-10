import { JSX, ReactNode } from 'react';

import { cn } from '#/utils';
import KanbanBoard from './KanbanBoard';
import KanbanColumn from './KanbanColumn';
import KanbanEmpty from './KanbanEmpty';

export interface KanbanSection<T> {
  key: string;
  title: string;
  items: T[];
  dotColorClass?: string;
}

interface KanbanGroupedBoardProps<T> {
  sections: KanbanSection<T>[];
  renderItem: (item: T, index: number) => ReactNode;
  emptyRender?: (sectionKey: string) => ReactNode;
  className?: string;
}

const DefaultEmpty = ({ label }: { label: string }): JSX.Element => <KanbanEmpty label={label} />;

const KanbanGroupedBoard = <T,>({
  sections = [],
  renderItem,
  emptyRender,
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
        >
          {itemsCount > 0 ? (
            items.map((item, index) => renderItem(item, index))
          ) : emptyRender ? (
            emptyRender(key)
          ) : (
            <DefaultEmpty label={title?.toLowerCase()} />
          )}
        </KanbanColumn>
      );
    })}
  </KanbanBoard>
);

export default KanbanGroupedBoard;
