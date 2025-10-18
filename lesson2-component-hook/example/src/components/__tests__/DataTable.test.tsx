import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DataTable } from '../DataTable'

const mockData = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
]

const mockColumns = [
  { key: 'id' as const, header: 'ID' },
  { key: 'name' as const, header: 'Name' },
  { key: 'email' as const, header: 'Email' },
]

describe('DataTable', () => {
  it('should render table with data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />)

    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()

    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })

  it('should render empty state when no data', () => {
    render(<DataTable data={[]} columns={mockColumns} />)

    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('should filter data when typing in filter input', () => {
    render(<DataTable data={mockData} columns={mockColumns} />)

    const filterInput = screen.getByPlaceholderText('Filter users...')
    fireEvent.change(filterInput, { target: { value: 'Alice' } })

    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.queryByText('Bob')).not.toBeInTheDocument()
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument()
  })

  it('should sort data when clicking column header', () => {
    render(<DataTable data={mockData} columns={mockColumns} />)

    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)

    // Check that sort indicator appears
    expect(screen.getByText('↑')).toBeInTheDocument()
  })

  it('should not show filter input when filterable is false', () => {
    render(<DataTable data={mockData} columns={mockColumns} filterable={false} />)

    expect(screen.queryByPlaceholderText('Filter users...')).not.toBeInTheDocument()
  })

  it('should not sort when sortable is false', () => {
    render(<DataTable data={mockData} columns={mockColumns} sortable={false} />)

    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)

    // Should not show sort indicator
    expect(screen.queryByText('↑')).not.toBeInTheDocument()
  })

  it('should render custom cell content', () => {
    const columnsWithRender = [
      { key: 'id' as const, header: 'ID' },
      { key: 'name' as const, header: 'Name' },
      {
        key: 'email' as const,
        header: 'Email',
        render: (value: unknown) => <span data-testid="custom-email">{String(value).toUpperCase()}</span>
      },
    ]

    render(<DataTable data={mockData} columns={columnsWithRender} />)

    expect(screen.getByTestId('custom-email')).toBeInTheDocument()
    expect(screen.getByText('ALICE@EXAMPLE.COM')).toBeInTheDocument()
  })
})
