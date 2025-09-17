import { JSX } from 'react';

/**
 * Skeleton loader for task detail page
 * Displays loading placeholders for task detail content
 */
const TaskDetailSkeleton = (): JSX.Element => {
  return (
    <div className='h-screen bg-white flex flex-col'>
      {/* Header Skeleton */}
      <div className='flex-shrink-0 border-b border-gray-200 px-6 py-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='h-4 w-16 bg-gray-200 rounded animate-pulse' />
            <div className='h-4 w-4 text-gray-400'>/</div>
            <div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
            <div className='h-4 w-4 text-gray-400'>/</div>
            <div className='h-4 w-32 bg-gray-200 rounded animate-pulse' />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className='flex-1 overflow-y-auto'>
        <div className='p-6'>
          {/* Title Section */}
          <div className='mb-6'>
            <div className='flex items-start justify-between group'>
              <div className='flex-1 min-w-0'>
                <div className='h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-2' />
                <div className='h-6 w-1/2 bg-gray-200 rounded animate-pulse' />
              </div>
              <div className='flex items-center space-x-2 ml-4'>
                <div className='h-8 w-20 bg-gray-200 rounded animate-pulse' />
              </div>
            </div>
          </div>

          {/* Properties Section */}
          <div className='mb-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {/* Priority */}
              <div className='space-y-2'>
                <div className='h-4 w-16 bg-gray-200 rounded animate-pulse' />
                <div className='h-6 w-20 bg-gray-200 rounded-full animate-pulse' />
              </div>

              {/* Status */}
              <div className='space-y-2'>
                <div className='h-4 w-12 bg-gray-200 rounded animate-pulse' />
                <div className='h-6 w-24 bg-gray-200 rounded-full animate-pulse' />
              </div>

              {/* Due Date */}
              <div className='space-y-2'>
                <div className='h-4 w-16 bg-gray-200 rounded animate-pulse' />
                <div className='h-6 w-28 bg-gray-200 rounded animate-pulse' />
              </div>

              {/* Assignee */}
              <div className='space-y-2'>
                <div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
                <div className='flex items-center space-x-2'>
                  <div className='h-8 w-8 bg-gray-200 rounded-full animate-pulse' />
                  <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className='space-y-4'>
            <div className='h-6 w-24 bg-gray-200 rounded animate-pulse' />
            <div className='space-y-2'>
              <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
              <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
              <div className='h-4 w-3/4 bg-gray-200 rounded animate-pulse' />
              <div className='h-4 w-1/2 bg-gray-200 rounded animate-pulse' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailSkeleton;
