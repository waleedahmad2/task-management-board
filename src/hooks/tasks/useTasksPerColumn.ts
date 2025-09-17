import { useCallback, useMemo, useState, useEffect, useRef } from 'react';

import { showToast } from '#/components/common';
import { TASK_MODAL_MODES, MESSAGES, TASK_STATUS_ORDER, TASK_STATUSES } from '#/constants';
import { TASKS_CONFIG } from '#/constants/tasks';
import { createTask, updateTask, deleteTask } from '#/data/tasks/mutations';
import { useGetTasksInfinite } from '#/data/tasks/queries/getTasksInfinite';
import { useInfiniteScroll } from '#/hooks';
import { taskFormSchema } from '#/schemas';
import { Task, TaskStatus, TaskDragResult, TaskPriority, TaskFormData } from '#/types/task.types';
import { UseTasksPerColumnProps, UseTasksPerColumnReturn } from '#/types/tasks/useTasksPerColumn.types';

export const useTasksPerColumn = ({ projectId }: UseTasksPerColumnProps): UseTasksPerColumnReturn => {
  const pageSize = TASKS_CONFIG.INFINITE_SCROLL.PAGE_SIZE;
  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDragInProgress, setIsDragInProgress] = useState(false);
  const isOptimisticUpdateRef = useRef(false);

  // Simple queries for each status - following useProjectStatusColumns pattern
  const backlogQuery = useGetTasksInfinite({ params: { projectId, status: 'backlog', pageSize } });
  const inProgressQuery = useGetTasksInfinite({ params: { projectId, status: 'in-progress', pageSize } });
  const reviewQuery = useGetTasksInfinite({ params: { projectId, status: 'review', pageSize } });
  const doneQuery = useGetTasksInfinite({ params: { projectId, status: 'done', pageSize } });

  const statusQueries = {
    backlog: backlogQuery,
    'in-progress': inProgressQuery,
    review: reviewQuery,
    done: doneQuery,
  };

  // Simple data extraction - EXACTLY like useProjectStatusColumns
  const serverTasksByStatus = Object.fromEntries(
    TASK_STATUS_ORDER.map(status => [
      status,
      statusQueries[status].data?.pages ? statusQueries[status].data.pages.flatMap(page => page.data || []) : [],
    ])
  ) as Record<TaskStatus, Task[]>;

  const [tasksByStatus, setTasksByStatus] = useState<Record<TaskStatus, Task[]>>(
    TASK_STATUSES.reduce((acc, status) => ({ ...acc, [status]: [] }), {} as Record<TaskStatus, Task[]>)
  );

  // Simple sync - only update when we have actual data
  useEffect(() => {
    if (isOptimisticUpdateRef.current) return;

    // Only update if we have data from at least one query
    const hasData = Object.values(statusQueries).some(query => query.data?.pages?.length);
    if (hasData) {
      setTasksByStatus(serverTasksByStatus);
    }
  }, [statusQueries.backlog.data, statusQueries['in-progress'].data, statusQueries.done.data]);

  const allTasks = useMemo(() => Object.values(tasksByStatus).flat(), [tasksByStatus]);

  // Simple loading and error states - following useProjectStatusColumns pattern
  const isLoading = Object.values(statusQueries).some(query => query.isLoading);
  const error = Object.values(statusQueries).find(query => query.error)?.error as Error | null;

  // Simple pagination states - following useProjectStatusColumns pattern
  const isFetchingNextPage: Record<TaskStatus, boolean> = TASK_STATUSES.reduce(
    (acc, status) => ({
      ...acc,
      [status]: statusQueries[status].isFetchingNextPage || false,
    }),
    {} as Record<TaskStatus, boolean>
  );

  const hasNextPage: Record<TaskStatus, boolean> = TASK_STATUSES.reduce(
    (acc, status) => ({
      ...acc,
      [status]: statusQueries[status].hasNextPage || false,
    }),
    {} as Record<TaskStatus, boolean>
  );

  const handleAddTask = useCallback((): void => {
    // This is handled by the parent component
  }, []);

  const handleTaskSubmit = useCallback(
    async (data: unknown, modalMode: 'create' | 'edit', editingTask: Task | null): Promise<void> => {
      try {
        const validatedData = taskFormSchema.parse(data) as TaskFormData;

        if (modalMode === TASK_MODAL_MODES.CREATE) {
          const tempTask: Task = {
            id: `temp-${Date.now()}`,
            title: validatedData.title,
            description: validatedData.description,
            priority: validatedData.priority,
            status: validatedData.status,
            dueDate: validatedData.dueDate,
            assignee: validatedData.assigneeId
              ? {
                  id: validatedData.assigneeId,
                  name: 'Current User',
                  email: 'user@example.com',
                }
              : undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            projectId,
            order: 0,
          };

          isOptimisticUpdateRef.current = true;
          setTasksByStatus(prev => ({
            ...prev,
            [validatedData.status]: [tempTask, ...prev[validatedData.status]],
          }));

          await createTask({ formData: validatedData, projectId });
          setTimeout(() => {
            statusQueries[validatedData.status].refetch();
            isOptimisticUpdateRef.current = false;
          }, 100);
        } else if (modalMode === TASK_MODAL_MODES.EDIT && editingTask) {
          const updates = {
            ...validatedData,
            priority: validatedData.priority as TaskPriority,
            status: validatedData.status as TaskStatus,
            updatedAt: new Date().toISOString(),
          };

          isOptimisticUpdateRef.current = true;
          setTasksByStatus(prev => ({
            ...prev,
            [editingTask.status]: prev[editingTask.status].map(task =>
              task.id === editingTask.id ? { ...task, ...updates } : task
            ),
          }));

          await updateTask({
            taskId: editingTask.id,
            updates: validatedData as Partial<TaskFormData> & { order?: number },
          });

          setTimeout(() => {
            statusQueries[editingTask.status].refetch();
            if (editingTask.status !== validatedData.status) {
              statusQueries[validatedData.status].refetch();
            }
            isOptimisticUpdateRef.current = false;
          }, 100);
        }
      } catch (error) {
        console.error(`Failed to ${modalMode} task:`, error);
        throw error;
      }
    },
    [projectId, statusQueries]
  );

  const handleTaskEdit = useCallback((): void => {
    // This is handled by the parent component
  }, []);

  const handleTaskDelete = useCallback(
    async (task: Task): Promise<void> => {
      isOptimisticUpdateRef.current = true;
      setTasksByStatus(prev => ({
        ...prev,
        [task.status]: prev[task.status].filter(t => t.id !== task.id),
      }));

      try {
        await deleteTask({ taskId: task.id });
        setTimeout(() => {
          statusQueries[task.status].refetch();
          isOptimisticUpdateRef.current = false;
        }, 100);
        showToast('success', MESSAGES.TASK.DELETE_SUCCESS);
      } catch (error) {
        console.error('Failed to delete task:', error);
        statusQueries[task.status].refetch();
        isOptimisticUpdateRef.current = false;
        showToast('error', MESSAGES.TASK.DELETE_ERROR);
      }
    },
    [statusQueries]
  );

  const handleTaskMove = useCallback(
    async (result: TaskDragResult): Promise<void> => {
      const { taskId, sourceColumn, targetColumn, targetIndex } = result;

      if (isDragInProgress) return;

      const taskToMove = tasksByStatus[sourceColumn].find(task => task.id === taskId);
      if (!taskToMove) return;

      setIsDragInProgress(true);
      isOptimisticUpdateRef.current = true;

      setTasksByStatus(prev => {
        const newState = { ...prev };
        newState[sourceColumn] = newState[sourceColumn].filter(task => task.id !== taskId);

        const updatedTask = {
          ...taskToMove,
          status: targetColumn,
          order: targetIndex,
          updatedAt: new Date().toISOString(),
        };

        newState[targetColumn] = [
          ...newState[targetColumn].slice(0, targetIndex),
          updatedTask,
          ...newState[targetColumn].slice(targetIndex),
        ];

        return newState;
      });

      try {
        const updates: { order: number; status?: TaskStatus } = { order: targetIndex };
        if (sourceColumn !== targetColumn) {
          updates.status = targetColumn;
        }

        await updateTask({ taskId, updates });

        setTimeout(() => {
          statusQueries[sourceColumn].refetch();
          if (sourceColumn !== targetColumn) {
            statusQueries[targetColumn].refetch();
          }
          isOptimisticUpdateRef.current = false;
        }, 100);

        setIsDragInProgress(false);
      } catch (error) {
        console.error('Failed to move task:', error);
        statusQueries[sourceColumn].refetch();
        if (sourceColumn !== targetColumn) {
          statusQueries[targetColumn].refetch();
        }
        isOptimisticUpdateRef.current = false;
        setIsDragInProgress(false);
      }
    },
    [tasksByStatus, statusQueries, isDragInProgress]
  );

  const handleSelectTask = useCallback((task: Task): void => {
    setSelectedTask(task);
    setIsCommentsDrawerOpen(true);
  }, []);

  const handleCloseCommentsDrawer = useCallback((): void => {
    setIsCommentsDrawerOpen(false);
    setSelectedTask(null);
  }, []);

  const backlogScrollHandler = useInfiniteScroll({
    fetchNextPage: statusQueries.backlog.fetchNextPage,
    hasNextPage: hasNextPage.backlog,
    isFetchingNextPage: isFetchingNextPage.backlog,
  });

  const inProgressScrollHandler = useInfiniteScroll({
    fetchNextPage: statusQueries['in-progress'].fetchNextPage,
    hasNextPage: hasNextPage['in-progress'],
    isFetchingNextPage: isFetchingNextPage['in-progress'],
  });

  const reviewScrollHandler = useInfiniteScroll({
    fetchNextPage: statusQueries.review.fetchNextPage,
    hasNextPage: hasNextPage.review,
    isFetchingNextPage: isFetchingNextPage.review,
  });

  const doneScrollHandler = useInfiniteScroll({
    fetchNextPage: statusQueries.done.fetchNextPage,
    hasNextPage: hasNextPage.done,
    isFetchingNextPage: isFetchingNextPage.done,
  });

  const columnScrollHandlers = {
    backlog: backlogScrollHandler,
    'in-progress': inProgressScrollHandler,
    review: reviewScrollHandler,
    done: doneScrollHandler,
  };

  return {
    tasksByStatus,
    allTasks,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    isCommentsDrawerOpen,
    selectedTask,
    handleAddTask,
    handleTaskSubmit,
    handleTaskEdit,
    handleTaskDelete,
    handleTaskMove,
    handleSelectTask,
    handleCloseCommentsDrawer,
    columnScrollHandlers,
  };
};

export default useTasksPerColumn;
