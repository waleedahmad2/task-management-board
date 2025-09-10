import { JSX } from 'react';

import PaginationButton from './PaginationButton';

/**
 * Props for PaginationPageNumbers component
 */
interface PaginationPageNumbersProps {
  currentPage: number;
  totalPages: number;
  visiblePages: number[];
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
}

/**
 * Pagination page numbers component
 */
const PaginationPageNumbers = ({
  currentPage,
  totalPages,
  visiblePages,
  onPageChange,
  showPageNumbers = true,
}: PaginationPageNumbersProps): JSX.Element => {
  if (!showPageNumbers) {
    return <></>;
  }

  return (
    <>
      {/* First page */}
      {visiblePages[0] > 1 && (
        <>
          <PaginationButton onClick={() => onPageChange(1)}>1</PaginationButton>
          {visiblePages[0] > 2 && <span className='px-3 py-2 text-sm text-gray-500'>...</span>}
        </>
      )}

      {/* Visible pages */}
      {visiblePages.map(page => (
        <PaginationButton key={page} onClick={() => onPageChange(page)} active={page === currentPage}>
          {page}
        </PaginationButton>
      ))}

      {/* Last page */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className='px-3 py-2 text-sm text-gray-500'>...</span>
          )}
          <PaginationButton onClick={() => onPageChange(totalPages)}>{totalPages}</PaginationButton>
        </>
      )}
    </>
  );
};

export default PaginationPageNumbers;
