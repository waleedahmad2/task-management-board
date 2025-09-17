import { JSX } from 'react';

/**
 * Skeleton loader for the project board page
 * Displays loading placeholders for the entire board layout
 */
const ProjectBoardSkeleton = (): JSX.Element => {
  return (
    <div className='p-6'>
      {/* Header Skeleton */}
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <div className='h-8 w-48 bg-gray-200 rounded animate-pulse' />
            <div className='h-4 w-64 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='flex items-center space-x-4'>
            <div className='h-8 w-8 bg-gray-200 rounded animate-pulse' />
            <div className='h-8 w-8 bg-gray-200 rounded animate-pulse' />
          </div>
        </div>
      </div>

      {/* Kanban Board Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='bg-white rounded-lg border border-gray-200 p-4'>
            {/* Column Header */}
            <div className='flex items-center justify-between mb-4'>
              <div className='h-6 w-24 bg-gray-200 rounded animate-pulse' />
              <div className='h-8 w-8 bg-gray-200 rounded animate-pulse' />
            </div>

            {/* Task Cards */}
            <div className='space-y-3'>
              {Array.from({ length: 3 }).map((_, taskIndex) => (
                <div key={taskIndex} className='bg-gray-50 rounded-lg p-3 border border-gray-100'>
                  <div className='space-y-2'>
                    <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
                    <div className='h-3 w-3/4 bg-gray-200 rounded animate-pulse' />
                    <div className='flex items-center justify-between'>
                      <div className='h-3 w-16 bg-gray-200 rounded animate-pulse' />
                      <div className='h-6 w-6 bg-gray-200 rounded-full animate-pulse' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectBoardSkeleton;
