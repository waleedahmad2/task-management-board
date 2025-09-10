import { JSX } from 'react';

import { cn } from '#/utils';

interface ProjectCardSkeletonProps {
  className?: string;
}

const ProjectCardSkeleton = ({ className = '' }: ProjectCardSkeletonProps): JSX.Element => (
  <div className={cn('bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden', className)}>
    <div className='flex items-start justify-between mb-5'>
      <div className='flex-1 pr-4'>
        <div className='h-6 bg-gray-200 rounded animate-pulse mb-2 w-3/4' />
        <div className='space-y-2'>
          <div className='h-4 bg-gray-200 rounded animate-pulse w-full' />
          <div className='h-4 bg-gray-200 rounded animate-pulse w-2/3' />
        </div>
      </div>
    </div>

    <div className='flex items-center mb-5'>
      <div className='w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-3' />
      <div className='flex-1'>
        <div className='h-4 bg-gray-200 rounded animate-pulse w-24 mb-1' />
        <div className='h-3 bg-gray-200 rounded animate-pulse w-20' />
      </div>
    </div>

    <div className='mb-5'>
      <div className='flex items-center mb-3'>
        <div className='h-4 w-4 bg-gray-200 rounded animate-pulse mr-2' />
        <div className='h-4 bg-gray-200 rounded animate-pulse w-24 mr-2' />
        <div className='h-5 w-6 bg-gray-200 rounded-full animate-pulse' />
      </div>

      <div className='flex items-center'>
        <div className='flex -space-x-3'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='w-9 h-9 bg-gray-200 rounded-full animate-pulse border-2 border-white' />
          ))}
        </div>
      </div>
    </div>

    <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
      <div className='flex items-center'>
        <div className='h-3 w-3 bg-gray-200 rounded animate-pulse mr-1.5' />
        <div className='h-3 bg-gray-200 rounded animate-pulse w-20' />
      </div>
      <div className='h-3 bg-gray-200 rounded animate-pulse w-16' />
    </div>
  </div>
);

export default ProjectCardSkeleton;
