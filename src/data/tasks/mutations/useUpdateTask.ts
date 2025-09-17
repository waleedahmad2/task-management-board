import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '#/constants';
import { updateTask } from './updateTask';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: (updatedTask, variables) => {
      // Update the specific task in cache immediately
      queryClient.setQueryData([QUERY_KEYS.TASKS.DETAIL, variables.taskId], updatedTask);

      // Invalidate the specific task detail query
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TASKS.DETAIL, variables.taskId],
      });

      // Invalidate all task list queries (they use pattern TASKS_LIST_*)
      queryClient.invalidateQueries({
        predicate: query => {
          return typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('TASKS_LIST_');
        },
      });

      // Invalidate all task infinite queries (they use pattern TASKS_INFINITE_*)
      queryClient.invalidateQueries({
        predicate: query => {
          return typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith(QUERY_KEYS.TASKS.INFINITE);
        },
      });
    },
  });
};
