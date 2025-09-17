import { JSX, useEffect, useMemo, useState } from 'react';

import { CommentsSkeleton } from '#/components/skeletons';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '#/components/ui/sheet';
import { useAuth } from '#/context/AuthContext';
import { useGetCommentsInfinite } from '#/data/comments/queries/getCommentsInfinite';
import { createComment } from '#/data/comments/mutations';
import { useInfiniteScroll } from '#/hooks';
import { CommentFormData } from '#/schemas/commentFormSchema';
import { CommentsResponse } from '#/types/comment.types';
import { Task } from '#/types/task.types';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const CommentsDrawer = ({ isOpen, onClose, task }: CommentsDrawerProps): JSX.Element => {
  const { user } = useAuth();

  const {
    data: commentsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetCommentsInfinite({
    params: {
      taskId: task?.id || '',
      pageSize: 10,
    },
  });

  // Flatten all pages of comments and sort chronologically
  const serverComments = useMemo(() => {
    const data = commentsData as { pages?: CommentsResponse[] } | undefined;
    if (!data?.pages) return [];

    const flattened = data.pages.flatMap(({ data: pageData = [] }) => pageData);
    return flattened.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [commentsData]);

  // Use server comments directly
  const [comments, setComments] = useState(serverComments);
  const [isPending, setIsPending] = useState(false);

  // Update local comments when server comments change
  useEffect(() => {
    setComments(serverComments);
  }, [serverComments]);

  const handleScroll = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: hasNextPage || false,
    isFetchingNextPage: isFetchingNextPage || false,
  });

  const handleCommentSubmit = async (data: CommentFormData): Promise<void> => {
    if (!task?.id || !user) return;

    // Create optimistic comment
    const optimisticComment = {
      id: `temp-comment-${Date.now()}`,
      content: data.content,
      taskId: task.id,
      user: {
        id: user.id || 'current-user',
        name: user.name || 'Current User',
        email: user.email || 'user@example.com',
        role: user.role || 'member',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add optimistically to local state
    setComments(prev => [...prev, optimisticComment]);
    setIsPending(true);

    try {
      await createComment({
        formData: { ...data, taskId: task.id },
        taskId: task.id,
        user: {
          id: user.id || 'current-user',
          name: user.name || 'Current User',
          email: user.email || 'user@example.com',
          role: user.role || 'member',
        },
      });

      // Refetch comments to get the real comment
      refetch();
    } catch (error) {
      console.error('Failed to create comment:', error);
      // Remove optimistic comment on error
      setComments(prev => prev.filter(comment => comment.id !== optimisticComment.id));
    } finally {
      setIsPending(false);
    }
  };

  const { title } = task || {};

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription>{title ? `Comments for "${title}"` : 'Task comments'}</SheetDescription>
        </SheetHeader>

        <div className='flex flex-col h-[calc(100vh-120px)]'>
          {/* Comments List */}
          <div className='flex-1 overflow-y-auto mt-6 mb-4' onScroll={handleScroll}>
            {isLoading ? (
              <div className='flex items-center justify-center py-8'>
                <div className='text-gray-500'>Loading comments...</div>
              </div>
            ) : comments.length === 0 ? (
              <div className='flex items-center justify-center py-8'>
                <div className='text-center'>
                  <p className='text-gray-500 mb-2'>No comments yet</p>
                  <p className='text-sm text-gray-400'>Be the first to comment!</p>
                </div>
              </div>
            ) : (
              <div className='space-y-0'>
                {comments.map(comment => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
                {isFetchingNextPage && comments.length > 0 && <CommentsSkeleton count={2} />}
              </div>
            )}
          </div>

          {/* Comment Form - Fixed at bottom */}
          {task && (
            <div className='flex-shrink-0'>
              <CommentForm
                onSubmit={handleCommentSubmit}
                isLoading={isPending}
                placeholder={`Comment on "${title}"...`}
              />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentsDrawer;
