import { JSX } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '#/utils';

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
 * Pagination component for navigating through pages
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
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (totalPages <= 1) {
    return <div />;
  }

  return (
    <div className={cn('flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200', className)}>
      <div className='flex items-center text-sm text-gray-700'>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <div className='flex items-center space-x-1'>
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={cn(
            'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
            isFirstPage ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          )}
        >
          <ChevronLeft className='w-4 h-4' />
        </button>

        {/* Page numbers */}
        {showPageNumbers && (
          <>
            {/* First page */}
            {visiblePages[0] > 1 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className='px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150'
                >
                  1
                </button>
                {visiblePages[0] > 2 && <span className='px-3 py-2 text-sm text-gray-500'>...</span>}
              </>
            )}

            {/* Visible pages */}
            {visiblePages.map(page => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                  page === currentPage
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                {page}
              </button>
            ))}

            {/* Last page */}
            {visiblePages[visiblePages.length - 1] < totalPages && (
              <>
                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                  <span className='px-3 py-2 text-sm text-gray-500'>...</span>
                )}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className='px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150'
                >
                  {totalPages}
                </button>
              </>
            )}
          </>
        )}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={cn(
            'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
            isLastPage ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          )}
        >
          <ChevronRight className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
