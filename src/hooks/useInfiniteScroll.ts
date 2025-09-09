import { useEffect, useCallback, useRef } from 'react';

/**
 * Infinite scroll configuration
 */
interface InfiniteScrollConfig {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

/**
 * Infinite scroll hook for loading more data when scrolling
 */
export const useInfiniteScroll = (callback: () => void, config: InfiniteScrollConfig = {}) => {
  const { threshold = 0.1, rootMargin = '100px', enabled = true } = config;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && enabled) {
        callback();
      }
    },
    [callback, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, threshold, rootMargin, enabled]);

  const setElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      elementRef.current = node;

      if (node && enabled) {
        observerRef.current = new IntersectionObserver(handleIntersection, {
          threshold,
          rootMargin,
        });
        observerRef.current.observe(node);
      }
    },
    [handleIntersection, threshold, rootMargin, enabled]
  );

  return { setElementRef };
};
