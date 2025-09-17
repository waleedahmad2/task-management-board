import React, { JSX, useCallback } from 'react';

import TableSkeleton from '#/components/skeletons/TableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table';
import { TableSection, GenericTableProps } from '#/types';
import { cn } from '#/utils';

/**
 * Enhanced reusable table component with better UX
 * Clear visual hierarchy, intuitive interactions, and consistent styling
 */
const GenericTable = <T extends object>({
  columns,
  sections,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
  rowClassName = '',
}: GenericTableProps<T>): JSX.Element => {
  const handleRowClick = useCallback(
    (item: T, index: number) => (): void => {
      onRowClick?.(item, index);
    },
    [onRowClick]
  );

  const getRowClassName = (item: T, index: number): string => {
    const baseClasses = 'group transition-all duration-200 ease-in-out';
    const hoverClasses = onRowClick ? 'hover:bg-gray-50 hover:shadow-sm cursor-pointer' : 'hover:bg-gray-50/50';
    const clickableClasses = onRowClick ? 'active:scale-[0.98] active:bg-gray-100' : '';

    if (typeof rowClassName === 'function') {
      return cn(baseClasses, hoverClasses, clickableClasses, rowClassName?.(item, index));
    }

    return cn(baseClasses, hoverClasses, clickableClasses, rowClassName);
  };

  const renderSectionHeader = (section: TableSection<T>): JSX.Element => {
    const { icon, title, count } = section || {};
    const columnsLength = columns?.length || 0;

    return (
      <TableRow className='bg-gray-50 hover:bg-gray-50 border-b border-gray-200'>
        <TableCell colSpan={columnsLength} className='font-semibold text-gray-700 py-4 px-4'>
          <div className='flex items-center space-x-3'>
            {icon && <div className='flex items-center justify-center w-5 h-5 text-gray-600'>{icon}</div>}
            <span className='text-sm font-medium'>{title || ''}</span>
            {count !== undefined && (
              <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700'>
                {count}
              </span>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const renderRow = (item: T, index: number): JSX.Element => {
    const columnsList = columns || [];

    return (
      <TableRow key={index} className={getRowClassName(item, index)} onClick={handleRowClick(item, index)}>
        {columnsList.map((column, colIndex) => {
          const { render, key, className: columnClassName = '' } = column || {};
          const cellValue = (item as Record<string, unknown>)?.[key] || '';

          return (
            <TableCell
              key={colIndex}
              className={cn(
                'px-4 py-3 align-middle text-sm transition-colors duration-150',
                'group-hover:text-gray-900',
                columnClassName
              )}
            >
              {render ? (
                render?.(item, index)
              ) : (
                <span className={cn(cellValue ? 'text-gray-900' : 'text-gray-400 italic')}>
                  {String(cellValue || '—')}
                </span>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  if (loading) {
    return <TableSkeleton rows={10} columns={10} />;
  }

  if (sections) {
    const sectionsList = sections || [];
    const hasData = sectionsList.some(section => {
      const { data = [] } = section || {};
      return data?.length > 0;
    });

    if (!hasData) {
      return (
        <div className={cn('overflow-hidden rounded-lg border border-gray-200', className)}>
          <div className='p-12 text-center'>
            <div className='w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
              <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No data available</h3>
            <p className='text-gray-500'>{emptyMessage}</p>
          </div>
        </div>
      );
    }

    const columnsList = columns || [];

    return (
      <div className={cn('overflow-hidden rounded-lg border border-gray-200 shadow-sm', className)}>
        <Table>
          <TableHeader>
            <TableRow className='bg-gray-50 border-b border-gray-200'>
              {columnsList.map((column, index) => {
                const { header = '', className: columnClassName = '', sortable = false, width } = column || {};

                return (
                  <TableHead
                    key={index}
                    className={cn(
                      'h-12 px-4 text-left align-middle font-semibold text-gray-700 text-sm',
                      'border-r border-gray-200 last:border-r-0',
                      sortable && 'cursor-pointer hover:bg-gray-100 transition-colors duration-150',
                      columnClassName
                    )}
                    style={{ width }}
                  >
                    <div className='flex items-center space-x-2'>
                      <span>{header}</span>
                      {sortable && (
                        <div className='flex flex-col space-y-0.5'>
                          <svg
                            className='w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors duration-150'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                          </svg>
                        </div>
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sectionsList.map((section, sectionIndex) => {
              const { data = [] } = section || {};

              return (
                <React.Fragment key={sectionIndex}>
                  {renderSectionHeader(section)}
                  {data.map((item, itemIndex) => renderRow(item, itemIndex))}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Render simple table if no sections and no data
  return (
    <div className={cn('overflow-hidden rounded-lg border border-gray-200 shadow-sm', className)}>
      <div className='p-12 text-center'>
        <div className='w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
          <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
          </svg>
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>No data available</h3>
        <p className='text-gray-500'>{emptyMessage}</p>
      </div>
    </div>
  );
};

export default GenericTable;
