import { Task, TaskStatus, TaskDragResult } from '../task.types';

export interface UseTasksPerColumnProps {
  projectId: string;
}

export interface UseTasksPerColumnReturn {
  tasksByStatus: Record<TaskStatus, Task[]>;
  allTasks: Task[];
  isLoading: boolean;
  error: Error | null;
  isFetchingNextPage: Record<TaskStatus, boolean>;
  hasNextPage: Record<TaskStatus, boolean>;
  isCommentsDrawerOpen: boolean;
  selectedTask: Task | null;
  handleTaskSubmit: (data: unknown, modalMode: 'create' | 'edit', editingTask: Task | null) => Promise<void>;
  handleTaskDelete: (task: Task) => Promise<void>;
  handleTaskMove: (result: TaskDragResult) => Promise<void>;
  handleSelectTask: (task: Task) => void;
  handleCloseCommentsDrawer: () => void;
  columnScrollHandlers: Record<TaskStatus, (e: React.UIEvent<HTMLDivElement>) => void>;
}
