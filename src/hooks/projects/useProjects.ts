import { useCallback, useMemo, useState } from 'react';

import { PROJECTS_CONFIG } from '#/constants';
import { ProjectsInfiniteResponse } from '#/data/projects/queries/getProjects';
import { useGetProjectsInfinite } from '#/data/projects/queries/getProjectsInfinite';
import { useInfiniteScroll } from '#/hooks';
import { Project } from '#/types';

export interface UseProjectsResult {
  projects: Project[];
  totalItems: number;
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
  search: string;
  handleSearchChange: (searchValue: string) => void;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export const useProjects = (options?: {
  params?: { pageSize?: number; search?: string; status?: string };
}): UseProjectsResult => {
  const [search, setSearch] = useState(options?.params?.search || '');

  const { pageSize, status } = useMemo(
    () => ({
      pageSize: options?.params?.pageSize || PROJECTS_CONFIG.INFINITE_SCROLL.PAGE_SIZE,
      status: options?.params?.status,
    }),
    [options?.params?.pageSize, options?.params?.status]
  );

  const {
    data: projectsData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetProjectsInfinite({
    params: { search, pageSize, status },
  });

  const projects = useMemo(
    () =>
      projectsData?.pages ? (projectsData as ProjectsInfiniteResponse).pages.flatMap(page => page.data || []) : [],
    [projectsData]
  );

  const totalItems = useMemo(
    () => projectsData?.pages?.[0]?.pagination?.totalCount || projects.length,
    [projectsData, projects.length]
  );

  const handleSearchChange = useCallback((searchValue: string) => {
    setSearch(searchValue);
  }, []);

  const handleScroll = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: hasNextPage || false,
    isFetchingNextPage: isFetchingNextPage || false,
  });

  return {
    projects,
    totalItems,
    isLoading,
    error: error as Error | null,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    search,
    handleSearchChange,
    handleScroll,
  };
};

// Backward compatibility
export const useProjectsListing = useProjects;
