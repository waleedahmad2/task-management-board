import { useCallback } from 'react';

interface UseInfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

/**
 * Handles infinite scroll functionality for paginated content.
 * @param fetchNextPage - Function to load next page of data
 * @param hasNextPage - Whether more pages are available
 * @param isFetchingNextPage - Whether currently loading next page
 * @returns Scroll event handler function
 */
export const useInfiniteScroll = ({ fetchNextPage, hasNextPage, isFetchingNextPage }: UseInfiniteScrollProps) => {
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const container = e.target as HTMLDivElement;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isNearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  return handleScroll;
};
