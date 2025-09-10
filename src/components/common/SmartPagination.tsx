import React, { memo } from 'react';

import { cn } from '#/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '../ui/pagination';

/**
 * Props for SmartPagination component
 */
interface SmartPaginationProps {
  count?: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

/**
 * Smart pagination component with ellipsis and navigation controls.
 * Provides paginated navigation with smart page number display and navigation buttons.
 * Similar to PanoptoPagination but using the UI component structure.
 */
const SmartPagination = memo<SmartPaginationProps>(
  ({ count = 0, pageSize = 10, currentPage = 1, onPageChange, className }) => {
    const totalPages = Math.ceil(count / pageSize);

    const handleGoToPage = (page: number) => () => {
      if (page !== currentPage && page >= 1 && page <= totalPages && onPageChange) {
        onPageChange(page);
      }
    };

    const handlePreviousClick = () => {
      if (currentPage > 1 && onPageChange) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNextClick = () => {
      if (currentPage < totalPages && onPageChange) {
        onPageChange(currentPage + 1);
      }
    };

    const getPageNumbers = (): (number | string)[] => {
      const pages: (number | string)[] = [];

      if (totalPages <= 6) {
        // Show all pages if 6 or fewer
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Always show first page
        pages.push(1);

        const start = Math.max(currentPage - 1, 2);
        const end = Math.min(currentPage + 1, totalPages - 1);

        if (start > 2) {
          pages.push('start-ellipsis');
        }

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        if (end < totalPages - 1) {
          pages.push('end-ellipsis');
        }

        // Always show last page
        pages.push(totalPages);
      }

      return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
      <Pagination className={className}>
        <PaginationContent className=''>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePreviousClick}
              className={cn('rounded-r-none h-10', currentPage === 1 && 'pointer-events-none opacity-50')}
            />
          </PaginationItem>

          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {typeof page === 'number' ? (
                <PaginationLink
                  className='rounded-none h-10'
                  isActive={page === currentPage}
                  onClick={handleGoToPage(page)}
                >
                  {page}
                </PaginationLink>
              ) : (
                <PaginationEllipsis className='px-2 h-10 flex items-center justify-center text-gray-400' />
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNextClick}
              className={cn('rounded-l-none h-10', currentPage === totalPages && 'pointer-events-none opacity-50')}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
);

export default SmartPagination;
