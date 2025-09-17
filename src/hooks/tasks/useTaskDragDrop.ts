import { useState, useCallback, useRef } from 'react';

import { DragEndEvent, DragStartEvent, DragOverEvent } from '@dnd-kit/core';

import { Task, TaskStatus, TaskDragResult } from '#/types/task.types';

interface UseTaskDragDropProps {
  tasksByStatus: Record<TaskStatus, Task[]>;
  sections: Array<{ key: string; items: Task[] }>;
  onTaskMove?: (result: TaskDragResult) => void;
}

interface UseTaskDragDropReturn {
  activeTask: Task | null;
  overTask: Task | null;
  overColumn: TaskStatus | null;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragOver: (event: DragOverEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

export const useTaskDragDrop = ({
  tasksByStatus,
  sections,
  onTaskMove,
}: UseTaskDragDropProps): UseTaskDragDropReturn => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [overTask, setOverTask] = useState<Task | null>(null);
  const [overColumn, setOverColumn] = useState<TaskStatus | null>(null);
  const dragOverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent): void => {
    const { active } = event;
    const task = active.data.current?.task;
    if (task) {
      setActiveTask(task);
    }
  }, []);

  const handleDragOver = useCallback(
    (event: DragOverEvent): void => {
      const { over } = event;

      // Clear any existing timeout
      if (dragOverTimeoutRef.current) {
        clearTimeout(dragOverTimeoutRef.current);
      }

      if (!over) {
        setOverTask(null);
        setOverColumn(null);
        return;
      }

      // Debounce the drag over updates to reduce flickering
      dragOverTimeoutRef.current = setTimeout(() => {
        const allTasks = Object.values(tasksByStatus).flat();
        const overTaskItem = allTasks.find(task => task.id === over.id);

        if (overTaskItem) {
          // Only update if the task is different
          if (!overTask || overTask.id !== overTaskItem.id) {
            setOverTask(overTaskItem);
            setOverColumn(overTaskItem.status);
          }
        } else {
          // Only update if the column is different
          const targetColumn = over.id as TaskStatus;
          if (overColumn !== targetColumn) {
            setOverTask(null);
            setOverColumn(targetColumn);
          }
        }
      }, 16); // ~60fps
    },
    [tasksByStatus, overTask, overColumn]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent): void => {
      const { active, over } = event;
      setActiveTask(null);
      setOverTask(null);
      setOverColumn(null);

      if (!over || !active.data.current) {
        return;
      }

      const activeTask = active.data.current.task as Task;
      const activeStatus = active.data.current.status as TaskStatus;
      const activeIndex = active.data.current.index as number;

      let targetStatus: TaskStatus;
      let targetIndex: number;

      // Check if we're dropping on a task
      const allTasks = Object.values(tasksByStatus).flat();
      const overTask = allTasks.find(task => task.id === over.id);

      if (overTask) {
        // Dropping on another task
        const { status } = overTask;
        targetStatus = status;
        const sectionTasks = sections.find(s => s.key === (targetStatus as string))?.items || [];
        const sortedTasks = sectionTasks.sort((a, b) => a.order - b.order);
        const overIndex = sortedTasks.findIndex(task => task.id === over.id);

        if (targetStatus === activeStatus) {
          // Moving within the same column
          if (activeIndex < overIndex) {
            // Moving down - place after the target task
            targetIndex = overIndex;
          } else if (activeIndex > overIndex) {
            // Moving up - place before the target task
            targetIndex = overIndex;
          } else {
            // Same position - no change
            targetIndex = activeIndex;
          }
        } else {
          // Moving to a different column - place at the position of the target task
          targetIndex = overIndex;
        }
      } else {
        // Dropping on a column (empty or with tasks)
        targetStatus = over.id as TaskStatus;
        const targetSection = sections.find(s => s.key === (targetStatus as string));
        const targetTasks = targetSection?.items || [];

        if (targetStatus === activeStatus) {
          // Moving within the same column - place at the end
          targetIndex = targetTasks.length - 1; // -1 because we're removing the active task
        } else {
          // Moving to a different column - place at the end
          targetIndex = targetTasks.length;
        }
      }

      // Only trigger move if there's an actual change
      if (targetStatus !== activeStatus || targetIndex !== activeIndex) {
        const dragResult: TaskDragResult = {
          taskId: activeTask.id,
          sourceColumn: activeStatus,
          targetColumn: targetStatus,
          sourceIndex: activeIndex,
          targetIndex,
        };

        onTaskMove?.(dragResult);
      }
    },
    [sections, onTaskMove, tasksByStatus]
  );

  return {
    activeTask,
    overTask,
    overColumn,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
