import { JSX, useMemo } from 'react';

import { Calendar, User } from 'lucide-react';

import GenericTable from '#/components/common/GenericTable';
import { STATUS_COLORS } from '#/constants';
import { ProjectsTableProps, Project, ProjectStatus } from '#/types';
import { cn, formatDate } from '#/utils';
import MemberAvatar from './MemberAvatar';

/**
 * Get status color classes
 */
const getStatusColor = (status: ProjectStatus): string => {
  return STATUS_COLORS[status] || STATUS_COLORS.archived;
};

/**
 * Projects table component using GenericTable with status grouping
 */
const ProjectsTable = ({
  projects,
  onProjectClick,
  loading = false,
  className = '',
}: ProjectsTableProps): JSX.Element => {
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
  const statusLabels = {
    active: 'Active Projects',
    draft: 'Draft Projects',
    archived: 'Archived Projects',
  };

  // Define table columns
  const columns = [
    {
      key: 'name',
      header: 'Project Name',
      width: '25%',
      render: (project: Project) => (
        <div>
          <div className='text-sm font-medium text-gray-900'>{project.name}</div>
          <div className='text-sm text-gray-500 line-clamp-1'>{project.description}</div>
        </div>
      ),
    },
    {
      key: 'owner',
      header: 'Owner',
      width: '20%',
      render: (project: Project) => (
        <div className='flex items-center'>
          <div className='w-8 h-8 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mr-3'>
            {project.owner.avatar ? (
              <img
                src={project.owner.avatar}
                alt={project.owner.name}
                className='w-full h-full rounded-full object-cover'
              />
            ) : (
              <User className='w-4 h-4 text-indigo-600' />
            )}
          </div>
          <div>
            <div className='text-sm font-medium text-gray-900'>{project.owner.name}</div>
            <div className='text-xs text-gray-500'>{project.owner.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'members',
      header: 'Team Members',
      width: '15%',
      render: (project: Project) => (
        <div className='flex items-center'>
          <div className='flex -space-x-2 mr-3'>
            {project.members.slice(0, 3).map((member, index) => (
              <MemberAvatar key={member.id} member={member} index={index} showTooltip={true} size='sm' />
            ))}
          </div>
          {project.members.length > 3 && (
            <span className='text-xs text-gray-500'>+{project.members.length - 3} more</span>
          )}
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      width: '15%',
      render: (project: Project) => (
        <div className='flex items-center text-sm text-gray-500'>
          <Calendar className='w-4 h-4 mr-2' />
          {formatDate(project.createdAt)}
        </div>
      ),
    },
    {
      key: 'updatedAt',
      header: 'Last Updated',
      width: '15%',
      render: (project: Project) => <div className='text-sm text-gray-500'>{formatDate(project.updatedAt)}</div>,
    },
    {
      key: 'status',
      header: 'Status',
      width: '10%',
      render: (project: Project) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full border capitalize ${getStatusColor(project.status)}`}
        >
          {project.status}
        </span>
      ),
    },
  ];

  // Create sections for grouped display
  const sections = statusOrder.map(status => ({
    title: statusLabels[status],
    data: projectsByStatus[status],
    icon: (
      <div
        className={cn(
          'w-3 h-3 rounded-full',
          status === 'active' && 'bg-green-500',
          status === 'draft' && 'bg-yellow-500',
          status === 'archived' && 'bg-gray-500'
        )}
      />
    ),
    count: projectsByStatus[status].length,
  }));

  return (
    <GenericTable
      columns={columns}
      sections={sections}
      onRowClick={onProjectClick}
      loading={loading}
      emptyMessage='No projects found. Create your first project to get started.'
      className={className}
      rowClassName='hover:bg-indigo-50'
    />
  );
};

export default ProjectsTable;
