export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'backlog' | 'in-progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assignee?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  order: number;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assigneeId: string;
  status: TaskStatus;
}

export interface TasksResponse {
  data: Task[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface TaskDragResult {
  taskId: string;
  sourceColumn: TaskStatus;
  targetColumn: TaskStatus;
  sourceIndex: number;
  targetIndex: number;
}
