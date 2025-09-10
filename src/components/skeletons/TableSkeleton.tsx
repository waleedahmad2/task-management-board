import { JSX } from 'react';

import { range } from '#/utils';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

const TableSkeleton = ({ rows = 6, columns = 6, className = '' }: TableSkeletonProps): JSX.Element => (
  <div className={`bg-white rounded-lg overflow-hidden ${className}`}>
    <div className='w-full'>
      <div className='bg-gray-50 border-b border-gray-200'>
        <div className='grid grid-cols-6 gap-0'>
          {range(columns).map(idx => (
            <div key={idx} className='h-10 px-6 flex items-center'>
              <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
            </div>
          ))}
        </div>
      </div>
      <div>
        {range(rows).map(rIdx => (
          <div key={rIdx} className='grid grid-cols-6 gap-0 border-b border-gray-200'>
            {range(columns).map(cIdx => (
              <div key={cIdx} className='px-6 py-4'>
                <div className='h-4 w-3/4 bg-gray-200 rounded animate-pulse' />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TableSkeleton;
