import { Project } from '../projects';

export interface UseProjectsConfig {
  pageSize?: number;
  searchDebounceMs?: number;
}

export interface UseProjectsReturn {
  // Data
  projects: Project[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;

  // Loading states
  isLoading: boolean;
  isSearching: boolean;

  // Actions
  goToPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setPageSize: (size: number) => void;
  refreshProjects: () => void;

  // Search
  searchTerm: string;
  debouncedSearchTerm: string;
}
