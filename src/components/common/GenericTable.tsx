import React, { JSX } from 'react';

import TableSkeleton from '#/components/skeletons/TableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table';
import { TableSection, GenericTableProps } from '#/types';
import { cn } from '#/utils';

/**
 * Generic table component for displaying data in a structured format
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
  const getRowClassName = (item: T, index: number): string => {
    const baseClasses = 'hover:bg-gray-50 transition-colors duration-150';
    const clickableClasses = onRowClick ? 'cursor-pointer' : '';

    if (typeof rowClassName === 'function') {
      return cn(baseClasses, clickableClasses, rowClassName(item, index));
    }

    return cn(baseClasses, clickableClasses, rowClassName);
  };

  const renderSectionHeader = (section: TableSection<T>): JSX.Element => (
    <TableRow className='bg-gray-50 hover:bg-gray-50'>
      <TableCell colSpan={columns.length} className='font-semibold text-gray-700 py-3'>
        <div className='flex items-center space-x-2'>
          {section.icon && <div>{section.icon}</div>}
          <span>{section.title}</span>
          {section.count !== undefined && <span className='text-sm text-gray-500 font-normal'>({section.count})</span>}
        </div>
      </TableCell>
    </TableRow>
  );

  const renderRow = (item: T, index: number): JSX.Element => (
    <TableRow key={index} className={getRowClassName(item, index)} onClick={() => onRowClick?.(item, index)}>
      {columns.map((column, colIndex) => (
        <TableCell key={colIndex} className={cn('p-2 align-middle', column.className)}>
          {column.render ? column.render(item, index) : String(item[column.key] || '')}
        </TableCell>
      ))}
    </TableRow>
  );

  if (loading) {
    return <TableSkeleton rows={10} columns={10} />;
  }

  if (sections) {
    // Render grouped sections
    const hasData = sections.some(section => section.data.length > 0);

    if (!hasData) {
      return (
        <div className={cn('overflow-hidden', className)}>
          <div className='p-8 text-center text-gray-500'>
            <p>{emptyMessage}</p>
          </div>
        </div>
      );
    }

    return (
      <div className={cn('overflow-hidden', className)}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={cn('h-10 px-2 text-left align-middle font-medium text-muted-foreground', column.className)}
                  style={{ width: column.width }}
                >
                  <div className='flex items-center space-x-1'>
                    <span>{column.header}</span>
                    {column.sortable && (
                      <div className='flex flex-col'>
                        <svg className='w-3 h-3 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
                          <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                        </svg>
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sections.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                {renderSectionHeader(section)}
                {section.data.map((item, itemIndex) => renderRow(item, itemIndex))}
              </React.Fragment>
            ))}
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
