/**
 * React Query keys for consistent caching and invalidation
 * Focused on project listing functionality only
 */

export const QUERY_KEYS = {
  POSTS: 'POSTS',
  PROJECTS: {
    LIST: 'PROJECTS_LIST',
  },
} as const;
