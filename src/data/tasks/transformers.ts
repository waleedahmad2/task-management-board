import { mockAssignees } from '#/mocks/tasks/data';
import { Task, TaskPriority, TaskStatus } from '#/types/task.types';

/**
 * Backend task response structure
 */
interface BackendTask {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  order: number;
  userId?: string;
  assignee?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  dueDate?: string;
  projectId?: string;
}

/**
 * Transform backend task data to frontend Task type
 * Maps userId to assignee object and ensures proper typing
 */
export const transformBackendTask = (backendTask: BackendTask): Task => {
  // Handle both cases: backend sends assignee object OR userId
  let assignee = backendTask.assignee;

  if (!assignee && backendTask.userId) {
    // If backend only sends userId, find the assignee from mockAssignees
    const foundAssignee = mockAssignees.find(a => a.id === backendTask.userId);
    assignee = foundAssignee
      ? {
          id: foundAssignee.id,
          name: foundAssignee.name,
          email: foundAssignee.email,
        }
      : undefined;
  }

  return {
    id: backendTask.id,
    title: backendTask.title,
    description: backendTask.description,
    priority: backendTask.priority as TaskPriority,
    status: backendTask.status as TaskStatus,
    dueDate: backendTask.dueDate || '',
    projectId: backendTask.projectId || '',
    createdAt: backendTask.createdAt,
    updatedAt: backendTask.updatedAt,
    order: backendTask.order,
    assignee: assignee
      ? {
          id: assignee.id,
          name: assignee.name,
          email: assignee.email,
          avatar: assignee.avatar,
        }
      : undefined,
  };
};

/**
 * Transform array of backend tasks to frontend Task array
 */
export const transformBackendTasks = (backendTasks: BackendTask[]): Task[] => {
  return backendTasks.map(transformBackendTask);
};
