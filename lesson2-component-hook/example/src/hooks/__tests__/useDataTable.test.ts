import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useDataTableSort, useDataTableFilter } from '../useDataTable'

describe('useDataTableSort', () => {
  const mockData = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 20 },
  ]

  it('should return initial state without sorting', () => {
    const { result } = renderHook(() => useDataTableSort(mockData))

    expect(result.current.sortConfig).toBeNull()
    expect(result.current.sortedData).toEqual(mockData)
  })

  it('should sort data in ascending order', () => {
    const { result } = renderHook(() => useDataTableSort(mockData))

    act(() => {
      result.current.requestSort('name')
    })

    expect(result.current.sortConfig).toEqual({ key: 'name', direction: 'asc' })
    expect(result.current.sortedData[0].name).toBe('Alice')
    expect(result.current.sortedData[1].name).toBe('Bob')
    expect(result.current.sortedData[2].name).toBe('Charlie')
  })

  it('should sort data in descending order on second click', () => {
    const { result } = renderHook(() => useDataTableSort(mockData))

    act(() => {
      result.current.requestSort('name')
    })

    act(() => {
      result.current.requestSort('name')
    })

    expect(result.current.sortConfig).toEqual({ key: 'name', direction: 'desc' })
    expect(result.current.sortedData[0].name).toBe('Charlie')
    expect(result.current.sortedData[1].name).toBe('Bob')
    expect(result.current.sortedData[2].name).toBe('Alice')
  })

  it('should clear sort on third click', () => {
    const { result } = renderHook(() => useDataTableSort(mockData))

    act(() => {
      result.current.requestSort('name')
    })

    act(() => {
      result.current.requestSort('name')
    })

    act(() => {
      result.current.requestSort('name')
    })

    expect(result.current.sortConfig).toBeNull()
    expect(result.current.sortedData).toEqual(mockData)
  })

  it('should not sort when sortable is false', () => {
    const { result } = renderHook(() => useDataTableSort(mockData, false))

    act(() => {
      result.current.requestSort('name')
    })

    expect(result.current.sortConfig).toBeNull()
    expect(result.current.sortedData).toEqual(mockData)
  })
})

describe('useDataTableFilter', () => {
  const mockData = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@test.com' },
    { id: 3, name: 'Charlie', email: 'charlie@demo.com' },
  ]

  it('should return all data when filter is empty', () => {
    const { result } = renderHook(() => useDataTableFilter(mockData))

    expect(result.current.filterText).toBe('')
    expect(result.current.filteredData).toEqual(mockData)
  })

  it('should filter data by name', () => {
    const { result } = renderHook(() => useDataTableFilter(mockData))

    act(() => {
      result.current.setFilterText('Alice')
    })

    expect(result.current.filterText).toBe('Alice')
    expect(result.current.filteredData).toHaveLength(1)
    expect(result.current.filteredData[0].name).toBe('Alice')
  })

  it('should filter data by email', () => {
    const { result } = renderHook(() => useDataTableFilter(mockData))

    act(() => {
      result.current.setFilterText('test.com')
    })

    expect(result.current.filteredData).toHaveLength(1)
    expect(result.current.filteredData[0].email).toBe('bob@test.com')
  })

  it('should be case insensitive', () => {
    const { result } = renderHook(() => useDataTableFilter(mockData))

    act(() => {
      result.current.setFilterText('CHARLIE')
    })

    expect(result.current.filteredData).toHaveLength(1)
    expect(result.current.filteredData[0].name).toBe('Charlie')
  })

  it('should return empty array when no matches', () => {
    const { result } = renderHook(() => useDataTableFilter(mockData))

    act(() => {
      result.current.setFilterText('nonexistent')
    })

    expect(result.current.filteredData).toHaveLength(0)
  })
})
