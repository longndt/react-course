import type { ReactNode } from 'react';

/**
 * Column configuration for DataTable component
 */
export interface Column<T> {
  /** The key in the data object that this column represents */
  key: keyof T | 'actions';
  /** The header text to display for this column */
  header: string;
  /** Whether this column can be sorted */
  sortable?: boolean;
  /** Optional function to customize the rendering of cell values */
  render?: (value: unknown, row?: T) => ReactNode;
}

/**
 * Props for the DataTable component
 */
export interface DataTableProps<T extends Record<string, any>> {
  /** Array of data items to display in the table */
  data: T[];
  /** Array of column configurations */
  columns: Column<T>[];
  /** Whether the table supports sorting (default: true) */
  sortable?: boolean;
  /** Whether the table supports filtering (default: true) */
  filterable?: boolean;
}

/**
 * Sort configuration type
 */
export interface SortConfig<T> {
  /** The key to sort by */
  key: keyof T;
  /** The sort direction */
  direction: "asc" | "desc";
}

/**
 * Hook return type for useDataTableSort
 */
export interface UseDataTableSortResult<T> {
  /** The current sort configuration */
  sortConfig: SortConfig<T> | null;
  /** Function to request sorting by a key */
  requestSort: (key: keyof T) => void;
  /** The sorted data */
  sortedData: T[];
}

/**
 * Hook return type for useDataTableFilter
 */
export interface UseDataTableFilterResult<T> {
  /** The current filter text */
  filterText: string;
  /** Function to set the filter text */
  setFilterText: (text: string) => void;
  /** The filtered data */
  filteredData: T[];
}
