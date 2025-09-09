import { useState, useMemo } from 'react';

/**
 * Pagination configuration
 */
interface PaginationConfig {
  initialPage?: number;
  pageSize?: number;
}

/**
 * Pagination state and utilities
 */
interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Pagination hook for managing pagination state and logic
 */
export const usePagination = <T>(data: T[], config: PaginationConfig = {}) => {
  const { initialPage = 1, pageSize = 10 } = config;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);

  const paginationState = useMemo((): PaginationState => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
      currentPage,
      pageSize: itemsPerPage,
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }, [data.length, currentPage, itemsPerPage]);

  const paginatedData = useMemo(() => {
    return data.slice(paginationState.startIndex, paginationState.endIndex);
  }, [data, paginationState.startIndex, paginationState.endIndex]);

  const goToPage = (page: number): void => {
    const validPage = Math.max(1, Math.min(page, paginationState.totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = (): void => {
    if (paginationState.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = (): void => {
    if (paginationState.hasPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setPageSize = (size: number): void => {
    setItemsPerPage(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const resetPagination = (): void => {
    setCurrentPage(1);
  };

  return {
    ...paginationState,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    resetPagination,
  };
};
