import { JSX } from 'react';

import KanbanGroupedBoard, { KanbanSection } from '#/components/kanban/KanbanGroupedBoard';
import { STATUS_CONFIG, STATUS_DOT_COLORS, PROJECT_STATUSES } from '#/constants';
import { useProjectStatusColumns } from '#/hooks/projects/useProjectStatusColumns';
import { ProjectStatusColumnsProps, Project } from '#/types';
import ProjectCard from './ProjectCard';
import { KanbanColumnsSkeleton } from '../skeletons';

/**
 * Displays projects organized by status in a kanban board layout.
 * Fetches projects data and groups them into columns based on their status.
 */
const ProjectStatusColumns = ({
  onProjectClick,
  className = '',
  searchQuery = '',
}: Omit<ProjectStatusColumnsProps, 'projects' | 'onScroll'> & { searchQuery?: string }): JSX.Element => {
  const { projectsByStatus, statusCounts, statusQueries, isLoading, hasError } = useProjectStatusColumns(searchQuery);

  if (isLoading) return <KanbanColumnsSkeleton columns={3} cardsPerColumn={3} />;
  if (hasError) return <div className='flex items-center justify-center h-64 text-red-500'>Error loading projects</div>;

  const sections: KanbanSection<Project>[] = PROJECT_STATUSES.map(status => ({
    key: status,
    title: STATUS_CONFIG[status]?.label || '',
    items: projectsByStatus[status] || [],
    count: statusCounts[status] || 0,
    dotColorClass: STATUS_DOT_COLORS[status] || '',
    isLoading: statusQueries[status as keyof typeof statusQueries]?.isLoading || false,
    isFetchingNextPage: statusQueries[status as keyof typeof statusQueries]?.isFetchingNextPage || false,
    hasNextPage: statusQueries[status as keyof typeof statusQueries]?.hasNextPage || false,
    error: statusQueries[status as keyof typeof statusQueries]?.error || null,
    onScroll: statusQueries[status as keyof typeof statusQueries]?.handleScroll,
  }));

  return (
    <KanbanGroupedBoard
      sections={sections}
      className={className}
      onScroll={statusQueries.active.handleScroll}
      renderItem={project => <ProjectCard key={project.id} project={project} onClick={onProjectClick} />}
    />
  );
};

export default ProjectStatusColumns;
