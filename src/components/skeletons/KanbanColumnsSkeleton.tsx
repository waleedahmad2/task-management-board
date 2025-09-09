import { JSX } from 'react';

import ProjectCardSkeleton from './ProjectCardSkeleton';

interface KanbanColumnsSkeletonProps {
  columns?: number;
  cardsPerColumn?: number;
  className?: string;
}

const KanbanColumnsSkeleton = ({
  columns = 3,
  cardsPerColumn = 3,
  className = '',
}: KanbanColumnsSkeletonProps): JSX.Element => (
  <div className={`px-6 pb-6 ${className}`}>
    <div className='flex gap-6 overflow-x-auto pb-4'>
      {Array.from({ length: columns }).map((_, colIdx) => (
        <div key={colIdx} className='flex-shrink-0 w-80'>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-gray-300 rounded-full animate-pulse' />
              <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
            </div>
            <div className='h-4 w-8 bg-gray-200 rounded animate-pulse' />
          </div>

          <div className='space-y-3 min-h-[400px]'>
            {Array.from({ length: cardsPerColumn }).map((__, cardIdx) => (
              <ProjectCardSkeleton key={cardIdx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default KanbanColumnsSkeleton;
