import { JSX, useMemo } from 'react';

import GenericTable from '#/components/common/GenericTable';
import { PROJECT_STATUSES, STATUS_LABELS, getStatusDotColor, PROJECT_TABLE_COLUMNS, HOVER_COLORS } from '#/constants';
import { ProjectsTableProps, Project, ProjectStatus } from '#/types';
import { cn } from '#/utils';
import ProjectTableColumn, { ColumnType } from './ProjectTableColumn';

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
        const { status } = project;
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(project);
        return acc;
      },
      {} as Record<ProjectStatus, Project[]>
    );

    // Ensure all statuses are present
    PROJECT_STATUSES.forEach(status => {
      if (!grouped[status]) {
        grouped[status] = [];
      }
    });

    return grouped;
  }, [projects]);

  // Define table columns with render functions
  const columns = PROJECT_TABLE_COLUMNS.map(({ key, ...rest }) => ({
    ...rest,
    key,
    render: (project: Project) => <ProjectTableColumn project={project} columnType={key as ColumnType} />,
  }));

  // Create sections for grouped display
  const sections = PROJECT_STATUSES.map(status => ({
    title: STATUS_LABELS[status],
    data: projectsByStatus[status],
    icon: <div className={cn('w-3 h-3 rounded-full', getStatusDotColor(status))} />,
    count: projectsByStatus[status].length,
  }));

  return (
    <GenericTable<Project>
      columns={columns}
      sections={sections}
      onRowClick={onProjectClick}
      loading={loading}
      emptyMessage='No projects found. Create your first project to get started.'
      className={className}
      rowClassName={HOVER_COLORS.indigo50}
    />
  );
};

export default ProjectsTable;
