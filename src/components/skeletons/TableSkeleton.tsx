import { JSX } from 'react';

import { range, cn } from '#/utils';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

const TableSkeleton = ({ rows = 6, columns = 6, className = '' }: TableSkeletonProps): JSX.Element => (
  <div className={cn('bg-white rounded-lg overflow-hidden', className)}>
    <table className='w-full' role='table'>
      <thead>
        <tr className='bg-gray-50 border-b border-gray-200'>
          {range(columns).map(idx => (
            <th key={idx} className='h-10 px-6 text-left'>
              <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {range(rows).map(rIdx => (
          <tr key={rIdx} className='border-b border-gray-200'>
            {range(columns).map(cIdx => (
              <td key={cIdx} className='px-6 py-4'>
                <div className='h-4 w-3/4 bg-gray-200 rounded animate-pulse' />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TableSkeleton;
