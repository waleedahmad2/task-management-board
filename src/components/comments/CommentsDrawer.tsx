import { JSX, useRef, useEffect } from 'react';

import { NoData } from '#/components/common';
import { CommentItemSkeleton } from '#/components/skeletons';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '#/components/ui/sheet';
import { useComments } from '#/hooks';
import { Task } from '#/types';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const CommentsDrawer = ({ isOpen, onClose, task }: CommentsDrawerProps): JSX.Element => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  // Use the business logic hook for comments only when drawer is open
  const { comments, isLoading, isFetchingNextPage, handleScroll, handleCommentSubmit } = useComments({
    params: {
      taskId: isOpen ? task?.id || '' : '', // Only fetch when drawer is open
    },
  });

  const { title } = task || {};

  // Auto-scroll when comments update
  useEffect(() => {
    if (isOpen && comments.length > 0) {
      scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments, isOpen]);

  // Extra effect: when opening the drawer, scroll once after mount
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        scrollAnchorRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-[25rem] sm:w-[33.75rem]'>
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription>{title ? `Comments for "${title}"` : 'Task comments'}</SheetDescription>
        </SheetHeader>

        <div className='flex flex-col h-[calc(100vh-120px)]'>
          <div ref={scrollContainerRef} className='flex-1 overflow-y-auto mt-6 mb-4' onScroll={handleScroll}>
            {isLoading ? (
              <div className='space-y-0'>
                <CommentItemSkeleton />
                <CommentItemSkeleton />
                <CommentItemSkeleton />
              </div>
            ) : comments.length === 0 ? (
              <div className='flex items-center justify-center h-full min-h-[25rem]'>
                <NoData title='No comments yet' message='Be the first to comment on this task!' />
              </div>
            ) : (
              <div className='space-y-0'>
                {comments.map(comment => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
                {isFetchingNextPage && comments.length > 0 && (
                  <div className='space-y-0'>
                    <CommentItemSkeleton />
                    <CommentItemSkeleton />
                  </div>
                )}
                {/* Anchor div for auto-scrolling */}
                <div ref={scrollAnchorRef} />
              </div>
            )}
          </div>

          {/* Comment Form - Fixed at bottom */}
          {task && (
            <div className='flex-shrink-0'>
              <CommentForm onSubmit={handleCommentSubmit} isLoading={false} placeholder={`Comment on "${title}"...`} />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentsDrawer;
