import { JSX } from 'react';

/**
 * Skeleton loader for individual task cards
 * Displays loading placeholders for task card content
 */
const TaskCardSkeleton = (): JSX.Element => {
  return (
    <div className='bg-gray-50 rounded-lg p-3 border border-gray-100 animate-pulse'>
      <div className='space-y-2'>
        {/* Title */}
        <div className='h-4 w-full bg-gray-200 rounded' />
        <div className='h-3 w-3/4 bg-gray-200 rounded' />

        {/* Priority and Status */}
        <div className='flex items-center justify-between'>
          <div className='h-3 w-16 bg-gray-200 rounded' />
          <div className='h-3 w-12 bg-gray-200 rounded' />
        </div>

        {/* Footer */}
        <div className='flex items-center justify-between pt-2'>
          <div className='h-3 w-20 bg-gray-200 rounded' />
          <div className='h-6 w-6 bg-gray-200 rounded-full' />
        </div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
