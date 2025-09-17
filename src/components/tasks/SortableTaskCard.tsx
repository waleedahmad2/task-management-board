import { JSX } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Task } from '#/types';
import TaskCard from './TaskCard';

interface SortableTaskCardProps {
  task: Task;
  index: number;
  onClick?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

const SortableTaskCard = ({ task, index, onClick, onEdit, onDelete }: SortableTaskCardProps): JSX.Element => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      task,
      index,
      status: task.status,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isDragging ? 'opacity-50 z-50' : ''}`}
    >
      <TaskCard
        task={task}
        onClick={onClick}
        onEdit={onEdit}
        onDelete={onDelete}
        className={isDragging ? 'shadow-lg' : ''}
      />
    </div>
  );
};

export default SortableTaskCard;
