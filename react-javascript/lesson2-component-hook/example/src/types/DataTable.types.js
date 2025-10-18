/**
 * @file Type definitions for DataTable component (using JSDoc for JavaScript)
 */

/**
 * @typedef {Object} Column
 * @property {string} key - The key in the data object that this column represents
 * @property {string} header - The header text to display for this column
 * @property {boolean} [sortable] - Whether this column can be sorted
 * @property {Function} [render] - Optional function to customize the rendering of cell values
 */

/**
 * @typedef {Object} DataTableProps
 * @property {Array<Object>} data - Array of data items to display in the table
 * @property {Array<Column>} columns - Array of column configurations
 * @property {boolean} [sortable] - Whether the table supports sorting (default: true)
 * @property {boolean} [filterable] - Whether the table supports filtering (default: true)
 */

/**
 * @typedef {Object} SortConfig
 * @property {string} key - The key to sort by
 * @property {'asc' | 'desc'} direction - The sort direction
 */

/**
 * @typedef {Object} UseDataTableSortResult
 * @property {SortConfig | null} sortConfig - The current sort configuration
 * @property {Function} requestSort - Function to request sorting by a key
 * @property {Array<Object>} sortedData - The sorted data
 */

/**
 * @typedef {Object} UseDataTableFilterResult
 * @property {string} filterText - The current filter text
 * @property {Function} setFilterText - Function to set the filter text
 * @property {Array<Object>} filteredData - The filtered data
 */

// Export empty object to make this a valid ES module
export {};
