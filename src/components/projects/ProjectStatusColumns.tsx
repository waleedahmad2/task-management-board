import { JSX, useMemo } from 'react';

import KanbanGroupedBoard, { KanbanSection } from '#/components/kanban/KanbanGroupedBoard';
import { STATUS_CONFIG, STATUS_DOT_COLORS } from '#/constants';
import { ProjectStatusColumnsProps, Project, ProjectStatus } from '#/types';
import ProjectCard from './ProjectCard';

const ProjectStatusColumns = ({
  projects = [],
  onProjectClick,
  className = '',
}: ProjectStatusColumnsProps): JSX.Element => {
  
  const projectsByStatus = useMemo(() => {
    const grouped = projects.reduce(
      (acc, project) => {
        const { status } = project || {};
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(project);
        return acc;
      },
      {} as Record<ProjectStatus, Project[]>
    );

    const allStatuses: ProjectStatus[] = ['active', 'draft', 'archived'];
    allStatuses.forEach(status => {
      if (!grouped[status]) {
        grouped[status] = [];
      }
    });

    return grouped;
  }, [projects]);

  const statusOrder: ProjectStatus[] = ['active', 'draft', 'archived'];

  const sections: KanbanSection<Project>[] = statusOrder.map(status => {
    const { label } = STATUS_CONFIG[status] || {};
    const dotColor = STATUS_DOT_COLORS[status] || '';
    return {
      key: status,
      title: label,
      items: projectsByStatus[status] || [],
      dotColorClass: dotColor,
    };
  });

  return (
    <KanbanGroupedBoard
      sections={sections}
      className={className}
      renderItem={project => {
        const { id } = project || {};
        return <ProjectCard key={id} project={project} onClick={onProjectClick} />;
      }}
      emptyRender={key => {
        const { label } = STATUS_CONFIG[key as keyof typeof STATUS_CONFIG] || {};
        return (
          <div className='bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center'>
            <p className='text-sm text-gray-500'>No {label?.toLowerCase()}</p>
          </div>
        );
      }}
    />
  );
};

export default ProjectStatusColumns;
