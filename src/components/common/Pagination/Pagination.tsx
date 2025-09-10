import { JSX } from 'react';

import { cn } from '#/utils';
import PaginationInfo from './PaginationInfo';
import PaginationNavigation from './PaginationNavigation';
import PaginationPageNumbers from './PaginationPageNumbers';

/**
 * Props for Pagination component
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

/**
 * Main Pagination component that orchestrates all pagination sub-components
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxVisiblePages = 5,
  className = '',
}: PaginationProps): JSX.Element => {
  const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return <div />;
  }

  return (
    <div className={cn('flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200', className)}>
      <PaginationInfo currentPage={currentPage} totalPages={totalPages} />

      <div className='flex items-center space-x-1'>
        <PaginationNavigation currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />

        <PaginationPageNumbers
          currentPage={currentPage}
          totalPages={totalPages}
          visiblePages={visiblePages}
          onPageChange={onPageChange}
          showPageNumbers={showPageNumbers}
        />
      </div>
    </div>
  );
};

export default Pagination;
