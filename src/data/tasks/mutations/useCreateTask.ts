import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '#/constants';
import { createTask } from './createTask';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: newTask => {
      // Update the specific task in cache immediately
      queryClient.setQueryData([QUERY_KEYS.TASKS.DETAIL, newTask.id], newTask);

      // Invalidate all task infinite queries (they use pattern TASKS_INFINITE_*)
      queryClient.invalidateQueries({
        predicate: query => {
          return typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith(QUERY_KEYS.TASKS.INFINITE);
        },
      });

      // Invalidate all task list queries (they use pattern TASKS_LIST_*)
      queryClient.invalidateQueries({
        predicate: query => {
          return typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('TASKS_LIST_');
        },
      });
    },
  });
};
