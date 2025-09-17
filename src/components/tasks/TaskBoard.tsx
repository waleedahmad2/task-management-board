import { JSX, useMemo, useCallback } from 'react';

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter,
  rectIntersection,
} from '@dnd-kit/core';

import KanbanGroupedBoard, { KanbanSection } from '#/components/kanban/KanbanGroupedBoard';
import { TASK_STATUS_ORDER, TASK_STATUS_LABELS, TASK_STATUS_DOT_COLORS } from '#/constants/task';
import { useTaskDragDrop } from '#/hooks/tasks/useTaskDragDrop';
import { Task, TaskStatus, TaskDragResult } from '#/types/task.types';
import SortableTaskCard from './SortableTaskCard';
import TaskCard from './TaskCard';

interface TaskBoardProps {
  tasksByStatus: Record<TaskStatus, Task[]>;
  onTaskClick?: (task: Task) => void;
  onAddTask?: (status: TaskStatus) => void;
  onTaskMove?: (result: TaskDragResult) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (task: Task) => void;
  isFetchingNextPage?: Record<TaskStatus, boolean>;
  hasNextPage?: Record<TaskStatus, boolean>;
  columnScrollHandlers?: Record<TaskStatus, (e: React.UIEvent<HTMLDivElement>) => void>;
  className?: string;
}

const createKanbanSections = (
  tasksByStatus: Record<TaskStatus, Task[]>,
  isFetchingNextPage?: Record<TaskStatus, boolean>,
  hasNextPage?: Record<TaskStatus, boolean>,
  columnScrollHandlers?: Record<TaskStatus, (e: React.UIEvent<HTMLDivElement>) => void>
): KanbanSection<Task>[] => {
  return TASK_STATUS_ORDER.map(status => {
    const label = TASK_STATUS_LABELS[status];
    const dotColor = TASK_STATUS_DOT_COLORS[status] || '';
    const tasks = tasksByStatus[status] || [];

    // Sort tasks by order to ensure consistent positioning
    const sortedTasks = tasks.sort((a, b) => a.order - b.order);

    return {
      key: status,
      title: label,
      items: sortedTasks,
      dotColorClass: dotColor,
      isFetchingNextPage: isFetchingNextPage?.[status] || false,
      hasNextPage: hasNextPage?.[status] || false,
      onScroll: columnScrollHandlers?.[status],
    };
  });
};

// Custom collision detection for better vertical list handling
const customCollisionDetection = (args: unknown) => {
  // First, try to find intersections with sortable items
  const sortableIntersections = rectIntersection(args);

  // If we have intersections with sortable items, return them
  if (sortableIntersections.length > 0) {
    return sortableIntersections;
  }

  // Otherwise, fall back to closest center for droppable areas
  return closestCenter(args);
};

const TaskBoard = ({
  tasksByStatus,
  onTaskClick,
  onAddTask,
  onTaskMove,
  onTaskEdit,
  onTaskDelete,
  isFetchingNextPage,
  hasNextPage,
  columnScrollHandlers,
  className = '',
}: TaskBoardProps): JSX.Element => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const sections = useMemo(
    () => createKanbanSections(tasksByStatus, isFetchingNextPage, hasNextPage, columnScrollHandlers),
    [tasksByStatus, isFetchingNextPage, hasNextPage, columnScrollHandlers]
  );

  const { activeTask, overTask, overColumn, handleDragStart, handleDragOver, handleDragEnd } = useTaskDragDrop({
    tasksByStatus,
    sections,
    onTaskMove,
  });

  const renderTask = useCallback(
    (task: Task, index: number) => {
      // Check if this task should show a placeholder above it
      const shouldShowPlaceholder = overTask && overTask.id === task.id && activeTask && activeTask.id !== task.id;

      // Use a composite key that includes order to force re-render when position changes
      const taskKey = `${task.id}-${task.status}-${task.order}-${index}`;

      return (
        <div key={taskKey}>
          {shouldShowPlaceholder && (
            <div className='opacity-50 border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg p-3 mb-4'>
              <div className='text-sm text-blue-600 font-medium'>Drop here to place before "{task.title}"</div>
            </div>
          )}
          <SortableTaskCard
            task={task}
            index={index}
            onClick={onTaskClick}
            onEdit={onTaskEdit}
            onDelete={onTaskDelete}
          />
        </div>
      );
    },
    [onTaskClick, onTaskEdit, onTaskDelete, overTask, activeTask]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <KanbanGroupedBoard
        sections={sections}
        renderItem={renderTask}
        onAddItem={onAddTask ? (sectionKey: string) => onAddTask(sectionKey as TaskStatus) : undefined}
        className={className}
        activeTask={activeTask}
        overColumn={overColumn}
      />

      <DragOverlay>
        {activeTask ? (
          <div className='rotate-3 transform'>
            <TaskCard
              task={activeTask}
              onClick={onTaskClick}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
              className='shadow-xl'
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
