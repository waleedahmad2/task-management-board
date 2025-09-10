import { JSX } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import PaginationButton from './PaginationButton';

/**
 * Props for PaginationNavigation component
 */
interface PaginationNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination navigation buttons component
 */
const PaginationNavigation = ({ currentPage, totalPages, onPageChange }: PaginationNavigationProps): JSX.Element => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <>
      {/* Previous button */}
      <PaginationButton onClick={() => onPageChange(currentPage - 1)} disabled={isFirstPage}>
        <ChevronLeft className='w-4 h-4' />
      </PaginationButton>

      {/* Next button */}
      <PaginationButton onClick={() => onPageChange(currentPage + 1)} disabled={isLastPage}>
        <ChevronRight className='w-4 h-4' />
      </PaginationButton>
    </>
  );
};

export default PaginationNavigation;
