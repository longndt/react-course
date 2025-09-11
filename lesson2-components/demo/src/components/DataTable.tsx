import React from "react";
import "./DataTable.css";

interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  filterable?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  sortable = true,
  filterable = true,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const [filterText, setFilterText] = React.useState("");

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Filtering logic
  const filteredData = React.useMemo(() => {
    if (!filterText) return sortedData;

    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [sortedData, filterText]);

  const requestSort = (key: keyof T) => {
    if (!sortable) return;

    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  return (
    <div className="data-table-container">
      {filterable && (
        <div className="data-table-filter">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter items..."
            className="filter-input"
          />
        </div>
      )}

      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                onClick={() => requestSort(column.key)}
                className={sortable ? "sortable" : ""}
              >
                {column.header}
                {sortConfig?.key === column.key && (
                  <span className="sort-indicator">
                    {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={String(column.key)}>
                  {column.render
                    ? column.render(item[column.key])
                    : String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
