import { UseInfiniteQueryResult } from '@tanstack/react-query';

import { apiEndpoints, QUERY_KEYS } from '#/constants';
import { useInfiniteScrollQuery } from '#/services/networkRequestService';
import type { ProjectsInfiniteResponse } from './getProjects';

export interface UseGetProjectsInfiniteProps {
  params?: {
    pageSize?: number;
    search?: string;
    status?: string;
  };
  options?: any;
}

export const useGetProjectsInfinite = ({
  params = {},
  options = {},
}: UseGetProjectsInfiniteProps = {}): UseInfiniteQueryResult<ProjectsInfiniteResponse, unknown> => {
  const query = useInfiniteScrollQuery<
    ProjectsInfiniteResponse,
    { pageSize?: number; search?: string; status?: string }
  >({
    key: `${QUERY_KEYS.PROJECTS.INFINITE}_${params.status || 'all'}`,
    url: apiEndpoints.PROJECTS.LIST,
    params,
    limit: params.pageSize || 10,
    options,
  });

  return query;
};
