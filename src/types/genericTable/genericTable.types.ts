import { ReactNode } from 'react';

/**
 * Column definition interface
 */
export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: string;
  className?: string;
}

/**
 * Section definition interface for grouped tables
 */
export interface TableSection<T> {
  title: string;
  data: T[];
  icon?: ReactNode;
  color?: string;
  count?: number;
}

/**
 * Props for GenericTable component
 */
export interface GenericTableProps<T> {
  data?: T[];
  columns: Column<T>[];
  sections?: TableSection<T>[];
  onRowClick?: (item: T, index: number) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  rowClassName?: string | ((item: T, index: number) => string);
  showBorders?: boolean;
}
