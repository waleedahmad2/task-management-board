import React, { JSX, useCallback } from 'react';

import TableSkeleton from '#/components/skeletons/TableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table';
import { TableSection, GenericTableProps } from '#/types';
import { cn } from '#/utils';

/**
 * Reusable table component that displays data in rows and columns.
 * Supports sections, loading states, click handlers, and custom styling.
 */
const GenericTable = <T extends Record<string, unknown>>({
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
    const baseClasses = 'hover:bg-gray-50 transition-colors duration-150';
    const clickableClasses = onRowClick ? 'cursor-pointer' : '';

    if (typeof rowClassName === 'function') {
      return cn(baseClasses, clickableClasses, rowClassName?.(item, index));
    }

    return cn(baseClasses, clickableClasses, rowClassName);
  };

  const renderSectionHeader = (section: TableSection<T>): JSX.Element => {
    const { icon, title, count } = section || {};
    const columnsLength = columns?.length || 0;

    return (
      <TableRow className='bg-gray-50 hover:bg-gray-50'>
        <TableCell colSpan={columnsLength} className='font-semibold text-gray-700 py-3'>
          <div className='flex items-center space-x-2'>
            {icon && <div>{icon}</div>}
            <span>{title || ''}</span>
            {count !== undefined && <span className='text-sm text-gray-500 font-normal'>({count})</span>}
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
          const cellValue = item?.[key] || '';

          return (
            <TableCell key={colIndex} className={cn('p-2 align-middle', columnClassName)}>
              {render ? render?.(item, index) : String(cellValue || '')}
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
        <div className={cn('overflow-hidden', className)}>
          <div className='p-8 text-center text-gray-500'>
            <p>{emptyMessage}</p>
          </div>
        </div>
      );
    }

    const columnsList = columns || [];

    return (
      <div className={cn('overflow-hidden', className)}>
        <Table>
          <TableHeader>
            <TableRow>
              {columnsList.map((column, index) => {
                const { header = '', className: columnClassName = '', sortable = false, width } = column || {};

                return (
                  <TableHead
                    key={index}
                    className={cn(
                      'h-10 px-2 text-left align-middle font-medium text-muted-foreground',
                      columnClassName
                    )}
                    style={{ width }}
                  >
                    <div className='flex items-center space-x-1'>
                      <span>{header}</span>
                      {sortable && (
                        <div className='flex flex-col'>
                          <svg className='w-3 h-3 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
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
    <div className={cn('overflow-hidden', className)}>
      <div className='p-8 text-center text-gray-500'>
        <p>{emptyMessage}</p>
      </div>
    </div>
  );
};

export default GenericTable;
