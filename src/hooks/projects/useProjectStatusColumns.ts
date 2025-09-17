import { PROJECT_STATUSES } from '#/constants';
import { useProjects } from '#/hooks';

// e.g. PROJECT_STATUSES = ["active", "archived", "draft"]
export const useProjectStatusColumns = (searchQuery = '') => {
  // First query just for counts
  const initialQuery = useProjects({ params: { search: searchQuery, pageSize: 5 } });

  // Dynamically build queries for each status
  const activeQuery = useProjects({ params: { status: 'active', search: searchQuery } });
  const archivedQuery = useProjects({ params: { status: 'archived', search: searchQuery } });
  const draftQuery = useProjects({ params: { status: 'draft', search: searchQuery } });

  const statusQueries = {
    active: activeQuery,
    archived: archivedQuery,
    draft: draftQuery,
  };

  const projectsByStatus = Object.fromEntries(PROJECT_STATUSES.map(status => [status, statusQueries[status].projects]));

  const statusCounts = PROJECT_STATUSES.reduce(
    (acc, status) => ({
      ...acc,
      [status]: statusQueries[status].totalItems,
    }),
    {}
  );

  return {
    projectsByStatus,
    statusCounts,
    statusQueries,
    isLoading: initialQuery.isLoading,
    hasError: initialQuery.error,
  };
};
