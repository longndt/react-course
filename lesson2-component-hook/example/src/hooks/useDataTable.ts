import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import type {
  UseDataTableSortResult,
  UseDataTableFilterResult,
  SortConfig,
} from "../types/DataTable.types";

/**
 * ✅ CHECKPOINT: Custom hook to handle sorting functionality in DataTable
 * Key concepts: useState, useMemo, functional state updates
 */
export function useDataTableSort<T extends Record<string, any>>(
  data: T[],
  sortable: boolean = true
): UseDataTableSortResult<T> {
  // ✅ CHECKPOINT: State management with useState
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);

  // ✅ CHECKPOINT: Event handler with functional state updates
  const requestSort = (key: keyof T) => {
    if (!sortable) return;

    setSortConfig((current: SortConfig<T> | null) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  // ✅ CHECKPOINT: useMemo for expensive calculations
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
 * ✅ CHECKPOINT: Custom hook to handle filtering functionality in DataTable
 * Key concepts: useState, useMemo, string manipulation
 */
export function useDataTableFilter<T extends Record<string, any>>(
  data: T[]
): UseDataTableFilterResult<T> {
  // ✅ CHECKPOINT: State for filter text
  const [filterText, setFilterText] = useState<string>("");

  // ✅ CHECKPOINT: useMemo for filtering logic
  const filteredData = useMemo(() => {
    if (!filterText) return data;

    return data.filter((item: T) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [data, filterText]);

  return {
    filterText,
    setFilterText: setFilterText as Dispatch<SetStateAction<string>>,
    filteredData,
  };
}
