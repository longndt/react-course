import { useMemo, useState } from "react";

/**
 * Custom hook to handle sorting functionality in DataTable
 * @param {Array} data - The data array to sort
 * @param {boolean} sortable - Whether sorting is enabled
 * @returns {{sortConfig: Object|null, requestSort: Function, sortedData: Array}}
 */
export function useDataTableSort(
  data,
  sortable = true
) {
  const [sortConfig, setSortConfig] = useState(null);

  const requestSort = (key) => {
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

  const sortedData = useMemo(() => {
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

  return { sortConfig, requestSort, sortedData };
}

/**
 * Custom hook to handle filtering functionality in DataTable
 * @param {Array} data - The data array to filter
 * @returns {{filterText: string, setFilterText: Function, filteredData: Array}}
 */
export function useDataTableFilter(
  data
) {
  const [filterText, setFilterText] = useState("");

  const filteredData = useMemo(() => {
    if (!filterText) return data;

    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [data, filterText]);

  return {
    filterText,
    setFilterText,
    filteredData,
  };
}

