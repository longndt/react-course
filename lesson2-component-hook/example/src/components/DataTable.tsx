import { type ChangeEvent } from "react";
import { useDataTableSort, useDataTableFilter } from "../hooks/useDataTable";
import type { DataTableProps } from "../types/DataTable.types";
import "./DataTable.css";

/**
 * A reusable data table component with sorting and filtering capabilities.
 * Supports:
 * - Sortable columns
 * - Global text filtering
 * - Custom cell rendering
 * - TypeScript integration
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={[
 *     { key: 'name', header: 'Name' },
 *     { key: 'email', header: 'Email' },
 *     {
 *       key: 'status',
 *       header: 'Status',
 *       render: (value) => <StatusBadge status={value} />
 *     }
 *   ]}
 * />
 * ```
 */
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  sortable = true,
  filterable = true,
}: DataTableProps<T>) {
  // Use custom hooks for sorting and filtering
  const { sortConfig, requestSort, sortedData } = useDataTableSort(
    data,
    sortable
  );
  const { filterText, setFilterText, filteredData } =
    useDataTableFilter(sortedData);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  return (
    <div className="data-table-container">
      {filterable && (
        <div className="data-table-filter">
          <input
            type="text"
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Filter users..."
            className="filter-input"
            aria-label="Filter table"
          />
        </div>
      )}

      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                onClick={() =>
                  column.sortable !== false && requestSort(column.key)
                }
                className={
                  sortable && column.sortable !== false ? "sortable" : ""
                }
                role={
                  sortable && column.sortable !== false ? "button" : undefined
                }
                aria-sort={
                  sortConfig?.key === column.key
                    ? sortConfig.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
              >
                {column.header}
                {sortConfig?.key === column.key && (
                  <span className="sort-indicator" aria-hidden="true">
                    {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="no-data">
                No data available
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {column.render
                      ? column.render(item[column.key as keyof typeof item], item)
                      : String(item[column.key as keyof typeof item] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
