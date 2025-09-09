import { JSX, useMemo } from 'react';

import KanbanGroupedBoard, { KanbanSection } from '#/components/kanban/KanbanGroupedBoard';
import { cn } from '#/utils';
import ProjectCard from './ProjectCard';

/**
 * Project status type
 */
type ProjectStatus = 'active' | 'archived' | 'draft';

/**
 * Project member interface
 */
interface ProjectMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'viewer';
}

/**
 * Project interface
 */
interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  members: ProjectMember[];
}

/**
 * Props for ProjectStatusColumns component
 */
interface ProjectStatusColumnsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onProjectEdit?: (project: Project) => void;
  onProjectDelete?: (project: Project) => void;
  onProjectView?: (project: Project) => void;
  className?: string;
}

/**
 * Status configuration
 */
const STATUS_CONFIG = {
  active: {
    label: 'Active Projects',
    description: 'Currently active projects',
    color: 'green',
  },
  draft: {
    label: 'Draft Projects',
    description: 'Projects in draft status',
    color: 'yellow',
  },
  archived: {
    label: 'Archived Projects',
    description: 'Archived projects',
    color: 'gray',
  },
} as const;

/**
 * Project status columns component that groups projects by status
 */
const ProjectStatusColumns = ({
  projects,
  onProjectClick,
  onProjectEdit,
  onProjectDelete,
  onProjectView,
  className = '',
}: ProjectStatusColumnsProps): JSX.Element => {
  // Group projects by status
  const projectsByStatus = useMemo(() => {
    const grouped = projects.reduce(
      (acc, project) => {
        if (!acc[project.status]) {
          acc[project.status] = [];
        }
        acc[project.status].push(project);
        return acc;
      },
      {} as Record<ProjectStatus, Project[]>
    );

    // Ensure all statuses are present
    const allStatuses: ProjectStatus[] = ['active', 'draft', 'archived'];
    allStatuses.forEach(status => {
      if (!grouped[status]) {
        grouped[status] = [];
      }
    });

    return grouped;
  }, [projects]);

  const statusOrder: ProjectStatus[] = ['active', 'draft', 'archived'];

  const sections: KanbanSection<Project>[] = statusOrder.map(status => ({
    key: status,
    title: STATUS_CONFIG[status].label,
    items: projectsByStatus[status],
    dotColorClass: cn(
      status === 'active' && 'bg-green-500',
      status === 'draft' && 'bg-yellow-500',
      status === 'archived' && 'bg-gray-500'
    ),
  }));

  return (
    <KanbanGroupedBoard
      sections={sections}
      className={className}
      renderItem={project => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={onProjectClick}
          onEdit={onProjectEdit}
          onDelete={onProjectDelete}
          onView={onProjectView}
        />
      )}
      emptyRender={key => (
        <div className='bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center'>
          <p className='text-sm text-gray-500'>
            No {STATUS_CONFIG[key as keyof typeof STATUS_CONFIG].label.toLowerCase()}
          </p>
        </div>
      )}
    />
  );
};

export default ProjectStatusColumns;
