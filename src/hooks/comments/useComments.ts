import { useCallback, useMemo, useState, useEffect } from 'react';

import { COMMENTS_CONFIG } from '#/constants';
import { useAuth } from '#/context/AuthContext';
import { useGetCommentsInfinite } from '#/data/comments/queries/getCommentsInfinite';
import { useInfiniteScroll } from '#/hooks';
import { Comment } from '#/types/comment.types';

export interface UseCommentsResult {
  comments: Comment[];
  isLoading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  handleCommentSubmit: (data: { content: string }) => Promise<void>;
}

export const useComments = (options?: { params?: { taskId: string; pageSize?: number } }): UseCommentsResult => {
  const { user } = useAuth();

  const { taskId, pageSize } = useMemo(
    () => ({
      taskId: options?.params?.taskId || '',
      pageSize: options?.params?.pageSize || COMMENTS_CONFIG.INFINITE_SCROLL.PAGE_SIZE,
    }),
    [options?.params?.taskId, options?.params?.pageSize]
  );

  // Fetch server comments (infinite scroll)
  const {
    data: commentsData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCommentsInfinite({
    params: { taskId, pageSize },
  });

  // Flatten server comments
  const serverComments = useMemo(
    () => (commentsData?.pages ? commentsData.pages.flatMap(page => page.data || []) : []),
    [commentsData]
  );

  // Simple useState for optimistic updates
  const [comments, setComments] = useState<Comment[]>([]);

  // Update comments when server comments change (only on initial load)
  useEffect(() => {
    if (comments.length === 0) {
      setComments(serverComments);
    }
  }, [serverComments, comments.length]);

  // Submit handler
  const handleCommentSubmit = useCallback(
    async ({ content }: { content: string }): Promise<void> => {
      const { id, name, email } = user || { id: '', name: '', email: '' };

      if (!taskId || !id) {
        alert('Please login to comment');
        return;
      }

      const sender = { id, name: name || '', email: email || '' };

      const optimisticComment: Comment = {
        id: `temp-${Date.now()}`,
        content,
        taskId,
        sender,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Simple optimistic update - add comment to state
      setComments(prevComments => [...prevComments, optimisticComment]);
    },
    [taskId, user]
  );

  // Infinite scroll handler
  const handleScroll = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: hasNextPage || false,
    isFetchingNextPage: isFetchingNextPage || false,
  });

  return {
    comments, // Simple state - no complex optimistic wrapper
    isLoading,
    error: error as Error | null,
    hasNextPage,
    isFetchingNextPage,
    handleScroll,
    handleCommentSubmit,
  };
};
