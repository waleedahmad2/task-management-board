/**
 * React Query keys for consistent caching and invalidation
 * Focused on project listing functionality only
 */

export const QUERY_KEYS = {
  POSTS: 'POSTS',
  PROJECTS: {
    LIST: 'PROJECTS_LIST',
    INFINITE: 'PROJECTS_INFINITE',
  },
  TASKS: {
    LIST: 'TASKS_LIST',
    DETAIL: 'TASK_DETAIL',
    INFINITE: 'TASKS_INFINITE',
  },
  COMMENTS: {
    INFINITE: 'COMMENTS_INFINITE',
  },
} as const;
