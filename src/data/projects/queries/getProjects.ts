import { UseQueryResult } from '@tanstack/react-query';

import { apiEndpoints, QUERY_KEYS } from '#/constants';
import { useGetQuery } from '#/services/networkRequestService';
import type { Project } from '#/types';

/**
 * Response type for projects list
 */
export interface ProjectsResponse {
  data: Project[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * Parameters for getProjects query
 */
export interface UseGetProjectsProps {
  params?: {
    page?: number;
    pageSize?: number;
    search?: string;
  };
  options?: Record<string, unknown>;
}

/**
 * Custom hook to fetch projects using React Query.
 * Follows the same pattern as getPosts for data layer separation.
 */
export const useGetProjects = ({ params = {}, options = {} }: UseGetProjectsProps = {}): UseQueryResult<
  ProjectsResponse,
  Error
> => {
  return useGetQuery({
    key: QUERY_KEYS.PROJECTS.LIST,
    url: apiEndpoints.PROJECTS.LIST,
    params,
    options: {
      keepPreviousData: true,
      ...options,
    },
  });
};
