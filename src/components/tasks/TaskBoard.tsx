import { JSX, useMemo, useState, useCallback } from 'react';

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
} from '@dnd-kit/core';

import KanbanGroupedBoard, { KanbanSection } from '#/components/kanban/KanbanGroupedBoard';
import { TASK_STATUS_ORDER, TASK_STATUS_LABELS, TASK_STATUS_DOT_COLORS } from '#/constants/task';
import { Task, TaskStatus, TaskDragResult } from '#/types/task.types';
import SortableTaskCard from './SortableTaskCard';
import TaskCard from './TaskCard';

interface TaskBoardProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onAddTask?: (status: TaskStatus) => void;
  onTaskMove?: (result: TaskDragResult) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (task: Task) => void;
  className?: string;
}

const createKanbanSections = (tasks: Task[]): KanbanSection<Task>[] => {
  const grouped = tasks.reduce(
    (acc, task) => {
      const { status } = task;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task);
      return acc;
    },
    {} as Record<TaskStatus, Task[]>
  );

  return TASK_STATUS_ORDER.map(status => {
    const label = TASK_STATUS_LABELS[status];
    const dotColor = TASK_STATUS_DOT_COLORS[status] || '';

    return {
      key: status,
      title: label,
      items: grouped[status] || [],
      dotColorClass: dotColor,
    };
  });
};

const TaskBoard = ({
  tasks,
  onTaskClick,
  onAddTask,
  onTaskMove,
  onTaskEdit,
  onTaskDelete,
  className = '',
}: TaskBoardProps): JSX.Element => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const sections = useMemo(() => createKanbanSections(tasks), [tasks]);

  const handleDragStart = useCallback((event: DragStartEvent): void => {
    const { active } = event;
    const task = active.data.current?.task;
    if (task) {
      setActiveTask(task);
    }
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent): void => {
      const { active, over } = event;
      setActiveTask(null);

      if (!over || !active.data.current) {
        return;
      }

      const activeTask = active.data.current.task as Task;
      const activeStatus = active.data.current.status as TaskStatus;
      const activeIndex = active.data.current.index as number;

      let targetStatus: TaskStatus;
      let targetIndex: number;

      const overTask = tasks.find(task => task.id === over.id);

      if (overTask) {
        const { status } = overTask;
        targetStatus = status;
        const sectionTasks = sections.find(s => s.key === targetStatus)?.items || [];
        const sortedTasks = sectionTasks.sort((a, b) => a.order - b.order);
        targetIndex = sortedTasks.findIndex(task => task.id === over.id);
      } else {
        targetStatus = over.id as TaskStatus;
        targetIndex = sections.find(s => s.key === targetStatus)?.items?.length || 0;
      }

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
    [sections, onTaskMove, tasks]
  );

  const renderTask = useCallback(
    (task: Task, index: number) => {
      return (
        <SortableTaskCard
          key={task.id}
          task={task}
          index={index}
          onClick={onTaskClick}
          onEdit={onTaskEdit}
          onDelete={onTaskDelete}
        />
      );
    },
    [onTaskClick, onTaskEdit, onTaskDelete]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <KanbanGroupedBoard
        sections={sections}
        renderItem={renderTask}
        onAddItem={onAddTask ? (sectionKey: string) => onAddTask(sectionKey as TaskStatus) : undefined}
        className={className}
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
