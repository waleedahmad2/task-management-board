import { Task, TaskFormData } from '#/types/task.types';
import { performRequest } from '../../../services/apiClient';
import { transformBackendTask } from '../transformers';

export interface UpdateTaskParams {
  taskId: string;
  updates: Partial<TaskFormData> & { order?: number };
}

export const updateTask = async ({ taskId, updates }: UpdateTaskParams): Promise<Task> => {
  const response = await performRequest<Record<string, unknown>, Record<string, unknown>>({
    method: 'PUT',
    url: `/tasks/${taskId}`,
    payload: updates as Record<string, unknown>,
  });

  return transformBackendTask(response);
};
