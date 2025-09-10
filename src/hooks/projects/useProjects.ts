import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

import { dummyProjects } from '#/data/projects/dummyData';
import { Project, UseProjectsConfig, UseProjectsReturn } from '#/types';

/**
 * Custom hook for managing projects data with pagination and search
 * Simulates API behavior with dummy data
 */
const useProjects = (config: UseProjectsConfig = {}): UseProjectsReturn => {
  const { pageSize: initialPageSize = 10, searchDebounceMs = 300 } = config;

  // State
  const [allProjects] = useState<Project[]>(dummyProjects);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSizeState] = useState<number>(initialPageSize);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search term
  useEffect(() => {
    setIsSearching(true);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, searchDebounceMs);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, searchDebounceMs]);

  // Filter projects based on search term
  const filteredProjects = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return allProjects;
    }

    const term = debouncedSearchTerm.toLowerCase();
    return allProjects.filter(
      project =>
        project.name.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.owner.name.toLowerCase().includes(term) ||
        project.members.some(
          member => member.name.toLowerCase().includes(term) || member.email.toLowerCase().includes(term)
        )
    );
  }, [allProjects, debouncedSearchTerm]);

  // Calculate pagination
  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Get paginated projects
  const projects = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage, pageSize]);

  // Actions
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
          setCurrentPage(page);
          setIsLoading(false);
        }, 150);
      }
    },
    [totalPages]
  );

  const setPageSize = useCallback((size: number) => {
    setIsLoading(true);
    setPageSizeState(size);
    setCurrentPage(1); // Reset to first page when page size changes

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  }, []);

  const refreshProjects = useCallback(() => {
    setIsLoading(true);

    // Simulate API refresh
    setTimeout(() => {
      setCurrentPage(1);
      setIsLoading(false);
    }, 200);
  }, []);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  return {
    // Data
    projects,
    totalItems,
    currentPage,
    totalPages,
    pageSize,

    // Loading states
    isLoading,
    isSearching,

    // Actions
    goToPage,
    setSearchTerm,
    setPageSize,
    refreshProjects,

    // Search
    searchTerm,
    debouncedSearchTerm,
  };
};

export default useProjects;
