import { JSX } from 'react';

/**
 * Props for PaginationInfo component
 */
interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
}

/**
 * Pagination info component showing current page information
 */
const PaginationInfo = ({ currentPage, totalPages }: PaginationInfoProps): JSX.Element => (
  <div className='flex items-center text-sm text-gray-700'>
    <span>
      Page {currentPage} of {totalPages}
    </span>
  </div>
);

export default PaginationInfo;
