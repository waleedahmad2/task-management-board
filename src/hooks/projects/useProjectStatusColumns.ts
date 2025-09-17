import { useEffect } from 'react';

import { PROJECT_STATUSES } from '#/constants';
import { useProjects } from '#/hooks';
import { ProjectStatus, Project } from '#/types';

// e.g. PROJECT_STATUSES = ["active", "archived", "draft"]
export const useProjectStatusColumns = (searchQuery = '') => {
  // First query just for counts
  const initialQuery = useProjects({ params: { search: searchQuery, pageSize: 5 } });

  // Dynamically build queries for each status
  const activeQuery = useProjects({ params: { status: 'active', search: searchQuery } });
  const archivedQuery = useProjects({ params: { status: 'archived', search: searchQuery } });
  const draftQuery = useProjects({ params: { status: 'draft', search: searchQuery } });

  // Update search queries when searchQuery changes
  useEffect(() => {
    initialQuery.handleSearchChange(searchQuery);
    activeQuery.handleSearchChange(searchQuery);
    archivedQuery.handleSearchChange(searchQuery);
    draftQuery.handleSearchChange(searchQuery);
  }, [searchQuery]);

  const statusQueries = {
    active: activeQuery,
    archived: archivedQuery,
    draft: draftQuery,
  } as const;

  const projectsByStatus = Object.fromEntries(
    PROJECT_STATUSES.map(status => [status, statusQueries[status].projects])
  ) as Record<ProjectStatus, Project[]>;

  const statusCounts = PROJECT_STATUSES.reduce(
    (acc, status) => ({
      ...acc,
      [status]: statusQueries[status].totalItems,
    }),
    {} as Record<ProjectStatus, number>
  );

  return {
    projectsByStatus,
    statusCounts,
    statusQueries,
    isLoading: initialQuery.isLoading,
    hasError: initialQuery.error,
  };
};
