// import { ROUTES } from './routes';

export const BREADCRUMB_ITEMS = {
  PROJECT_BOARD: (projectId: string, onNavigateToBoards: () => void) =>
    [
      {
        label: 'Boards',
        onClick: onNavigateToBoards,
      },
      {
        label: `Project ${projectId} Board`,
        isCurrentPage: true,
      },
    ] as const,

  TASK_DETAIL: (taskTitle: string, onNavigateToProjects: () => void, onNavigateToBoard: () => void) => [
    {
      label: 'Projects',
      onClick: onNavigateToProjects,
    },
    {
      label: 'Project Board',
      onClick: onNavigateToBoard,
    },
    {
      label: taskTitle || 'Task Detail',
      isCurrentPage: true,
    },
  ],
} as const;
