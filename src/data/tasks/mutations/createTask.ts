import { apiEndpoints } from '#/constants';
import { Task, TaskFormData } from '#/types/task.types';
import { performRequest } from '../../../services/apiClient';
import { transformBackendTask } from '../transformers';

export interface CreateTaskParams {
  formData: TaskFormData;
  projectId: string;
}

export const createTask = async ({ formData, projectId }: CreateTaskParams): Promise<Task> => {
  const response = await performRequest<Record<string, unknown>, Record<string, unknown>>({
    method: 'POST',
    url: apiEndpoints.TASKS.CREATE,
    payload: {
      ...formData,
      projectId,
    } as Record<string, unknown>,
  });

  return transformBackendTask(response);
};
