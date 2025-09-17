import { JSX, useEffect, useMemo, useState } from 'react';

import { CommentsSkeleton } from '#/components/skeletons';
import { useAuth } from '#/context/AuthContext';
import { useGetCommentsInfinite } from '#/data/comments/queries/getCommentsInfinite';
import { createComment } from '#/data/comments/mutations';
import { useInfiniteScroll } from '#/hooks';
import { CommentFormData } from '#/schemas/commentFormSchema';
import { CommentsResponse } from '#/types/comment.types';
import { Task } from '#/types/task.types';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentsSidebarProps {
  task: Task | null;
  className?: string;
}

const CommentsSidebar = ({ task, className = '' }: CommentsSidebarProps): JSX.Element => {
  const { user } = useAuth();

  const {
    data: commentsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetCommentsInfinite({
    taskId: task?.id || '',
    enabled: !!task?.id,
  });

  const [comments, setComments] = useState<CommentsResponse[]>([]);
  const [isPending, setIsPending] = useState(false);

  // Flatten all comments from all pages
  const allComments = useMemo(() => {
    return commentsData?.pages?.flatMap(({ data }) => data) || [];
  }, [commentsData]);

  // Sync local comments with server comments
  useEffect(() => {
    setComments(allComments);
  }, [allComments]);

  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const handleCommentSubmit = async (data: CommentFormData): Promise<void> => {
    const { id: taskId } = task || {};
    const { id: userId, name: userName, email: userEmail, role: userRole } = user || {};
    
    if (!taskId || !userId) return;

    // Create optimistic comment
    const optimisticComment: CommentsResponse = {
      id: `temp-comment-${Date.now()}`,
      content: data.content,
      taskId,
      user: {
        id: userId,
        name: userName || 'Current User',
        email: userEmail || 'user@example.com',
        role: userRole || 'member',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add optimistically to local state
    setComments(prev => [...prev, optimisticComment]);
    setIsPending(true);

    try {
      await createComment({
        formData: { ...data, taskId },
        taskId,
        user: {
          id: userId,
          name: userName || 'Current User',
          email: userEmail || 'user@example.com',
          role: userRole || 'member',
        },
      });

      // Refetch comments to get the real comment
      refetch();
    } catch (error) {
      console.error('Failed to create comment:', error);
      // Remove optimistic comment on error
      setComments(prev => prev.filter(({ id }) => id !== optimisticComment.id));
    } finally {
      setIsPending(false);
    }
  };

  if (!task) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <p className='text-gray-500'>Select a task to view comments</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen ${className}`}>
      {/* Comments Header */}
      {/* <div className='p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0'>
        <h3 className='text-lg font-semibold text-gray-900'>Comments</h3>
        <p className='text-sm text-gray-500 mt-1'>{comments.length} comments</p>
      </div> */}

      {/* Comments List */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 min-h-0'>
        {isLoading ? (
          <CommentsSkeleton />
        ) : comments.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-gray-500 text-sm'>No comments yet</p>
            <p className='text-gray-400 text-xs mt-1'>Be the first to comment!</p>
          </div>
        ) : (
          <>
            {comments.map(({ id, ...commentProps }) => (
              <CommentItem key={id} comment={{ id, ...commentProps }} />
            ))}
            {isFetchingNextPage && <CommentsSkeleton />}
            <div ref={loadMoreRef} />
          </>
        )}
      </div>

      {/* Comment Form */}
      <div className='px-4 bg-white '>
        <CommentForm
          onSubmit={handleCommentSubmit}
          isLoading={isPending}
          placeholder={`Add a comment to ${task.title}...`}
        />
      </div>
    </div>
  );
};

export default CommentsSidebar;
