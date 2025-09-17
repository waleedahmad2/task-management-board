import { JSX } from 'react';

/**
 * Skeleton component for CommentItem loading state
 */
const CommentItemSkeleton = (): JSX.Element => (
  <div className='flex space-x-3 p-4 border-b border-gray-100'>
    {/* Avatar skeleton */}
    <div className='flex-shrink-0'>
      <div className='w-8 h-8 bg-gray-200 rounded-full animate-pulse' />
    </div>

    {/* Content skeleton */}
    <div className='flex-1 space-y-2'>
      {/* Header skeleton */}
      <div className='flex items-center space-x-2'>
        <div className='h-4 bg-gray-200 rounded w-20 animate-pulse' />
        <div className='h-3 bg-gray-200 rounded w-16 animate-pulse' />
      </div>

      {/* Comment text skeleton */}
      <div className='space-y-1'>
        <div className='h-4 bg-gray-200 rounded w-full animate-pulse' />
        <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse' />
        <div className='h-4 bg-gray-200 rounded w-1/2 animate-pulse' />
      </div>
    </div>
  </div>
);

export default CommentItemSkeleton;
