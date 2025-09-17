import { performRequest } from '../../../services/apiClient';

export interface DeleteTaskParams {
  taskId: string;
}

export const deleteTask = async ({ taskId }: DeleteTaskParams): Promise<void> => {
  return performRequest<void>({
    method: 'DELETE',
    url: `/tasks/${taskId}`,
  });
};
