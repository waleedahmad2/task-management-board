import { useCallback, useMemo, useState } from 'react';

import { useGetProjects } from '#/data/projects/queries/getProjects';

/**
 * Manages projects data with search, pagination, and filtering capabilities.
 * @returns Projects data, loading state, and filter handlers
 */
export const useProjectsListing = () => {
  const [filters, setFilters] = useState({
    search: '',
    page: 1,
    pageSize: 10,
  });

  const { search, page, pageSize } = filters;

  const queryParams = useMemo(() => ({ search, page, pageSize }), [search, page, pageSize]);

  const { data: projectsData, isLoading: isProjectsFetching } = useGetProjects({
    params: queryParams,
  });

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search, page: 1 }));
  }, []);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setFilters(prev => ({ ...prev, pageSize, page: 1 }));
  }, []);

  const projects = projectsData?.data || [];
  const totalItems = projectsData?.pagination.totalCount || 0;
  const totalPages = projectsData?.pagination.totalPages || 0;

  return {
    filters,
    pageSize,
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
    projects,
    isProjectsFetching,
    totalItems,
    totalPages,
  };
};

export default useProjectsListing;
