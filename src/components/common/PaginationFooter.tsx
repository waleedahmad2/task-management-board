import React, { memo } from 'react';

import CustomSelect from './CustomSelect';
import SmartPagination from './SmartPagination';

interface PaginationFooterProps {
  pageSizes?: string[];
  pageSize?: string;
  setPageSize?: (value: string) => void;
  currentPage?: number;
  handlePageChange?: (page: number) => void;
  totalCount?: number;
  isActionsDisabled?: boolean;
  isLoading?: boolean;
}

const PaginationFooter = memo<PaginationFooterProps>(
  ({
    pageSizes = [],
    pageSize,
    setPageSize,
    currentPage = 1,
    handlePageChange,
    totalCount = 0,
    isActionsDisabled,
    isLoading,
  }) => {
    const isHidePagination = totalCount === 0;

    return (
      <div className='px-3 py-4 flex justify-between border-t border-gray-200'>
        <CustomSelect
          value={pageSize}
          dropdownItemsList={pageSizes}
          onChange={setPageSize}
          dropdownItemName='items'
          placeholder='size'
          isActionsDisabled={isActionsDisabled}
          triggerClassName='min-w-30'
        />

        {!isHidePagination && !isLoading && (
          <div>
            <SmartPagination
              count={totalCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              pageSize={parseInt(pageSize || '10')}
            />
          </div>
        )}
      </div>
    );
  }
);

export default PaginationFooter;
