export const apiEndpoints = {
  PROJECTS: {
    LIST: '/projects',
  },
  TASKS: {
    LIST: '/tasks',
    DETAIL: '/tasks',
    CREATE: '/tasks',
    UPDATE: (taskId: string) => `/tasks/${taskId}`,
    DELETE: (taskId: string) => `/tasks/${taskId}`,
  },
  COMMENTS: {
    LIST: '/comments',
    CREATE: '/comments',
    UPDATE: (commentId: string) => `/comments/${commentId}`,
    DELETE: (commentId: string) => `/comments/${commentId}`,
  },
};
