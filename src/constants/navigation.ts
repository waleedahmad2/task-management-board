import { 
  FolderKanban, 
  Kanban, 
  CheckSquare 
} from 'lucide-react';

import { ROUTES } from './routes';

const { PROJECTS, BOARDS, TASKS } = ROUTES;

/**
 * Navigation items for the sidebar
 */
export const NAVIGATION_ITEMS = [
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderKanban,
    path: PROJECTS,
    description: 'Manage your projects',
  },
  {
    id: 'boards',
    label: 'Boards',
    icon: Kanban,
    path: BOARDS,
    description: 'View all boards',
  },
  {
    id: 'tasks',
    label: 'My Tasks',
    icon: CheckSquare,
    path: TASKS,
    description: 'Assigned to me',
  },
] as const;
