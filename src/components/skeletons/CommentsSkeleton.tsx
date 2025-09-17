import { JSX } from 'react';

interface CommentsSkeletonProps {
  count?: number;
}

const CommentsSkeleton = ({ count = 3 }: CommentsSkeletonProps): JSX.Element => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='flex space-x-3 p-4 border-b border-gray-100 last:border-b-0'>
          <div className='flex-shrink-0'>
            <div className='w-8 h-8 rounded-full bg-gray-300 animate-pulse' />
          </div>

          <div className='flex-1 min-w-0'>
            <div className='flex items-center space-x-2 mb-1'>
              <div className='h-4 w-20 bg-gray-300 rounded animate-pulse' />
              <div className='h-3 w-16 bg-gray-300 rounded animate-pulse' />
            </div>
            <div className='space-y-2'>
              <div className='h-4 w-full bg-gray-300 rounded animate-pulse' />
              <div className='h-4 w-3/4 bg-gray-300 rounded animate-pulse' />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentsSkeleton;
