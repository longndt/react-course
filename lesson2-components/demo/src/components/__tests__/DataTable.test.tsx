import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "./DataTable";
import type { DataTableProps } from "../types/DataTable.types";

describe("DataTable", () => {
  const mockData = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
  ];

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
  ];

  const setup = (props: Partial<DataTableProps<(typeof mockData)[0]>> = {}) => {
    const defaultProps: DataTableProps<(typeof mockData)[0]> = {
      data: mockData,
      columns,
      ...props,
    };
    return render(<DataTable {...defaultProps} />);
  };

  it("renders all columns and rows", () => {
    setup();

    // Check headers
    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });

    // Check data
    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.email)).toBeInTheDocument();
    });
  });

  it("handles sorting when clicking column headers", () => {
    setup();

    const nameHeader = screen.getByText("Name");

    // First click - sort ascending
    fireEvent.click(nameHeader);
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Jane Doe");
    expect(rows[2]).toHaveTextContent("John Doe");

    // Second click - sort descending
    fireEvent.click(nameHeader);
    expect(rows[1]).toHaveTextContent("John Doe");
    expect(rows[2]).toHaveTextContent("Jane Doe");
  });

  it("filters data based on input", () => {
    setup();

    const filterInput = screen.getByLabelText("Filter table");
    fireEvent.change(filterInput, { target: { value: "John" } });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
  });

  it("renders custom cell content using render prop", () => {
    const customColumns = [
      ...columns,
      {
        key: "id",
        header: "Actions",
        render: (value: number) => <button>Edit {value}</button>,
      },
    ];

    setup({ columns: customColumns });

    expect(screen.getByText("Edit 1")).toBeInTheDocument();
    expect(screen.getByText("Edit 2")).toBeInTheDocument();
  });

  it("shows no data message when filtered data is empty", () => {
    setup();

    const filterInput = screen.getByLabelText("Filter table");
    fireEvent.change(filterInput, { target: { value: "xyz" } });

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("disables sorting for specific columns", () => {
    const columnsWithDisabledSort = [
      { key: "name", header: "Name", sortable: false },
      { key: "email", header: "Email" },
    ];

    setup({ columns: columnsWithDisabledSort });

    const nameHeader = screen.getByText("Name");
    const emailHeader = screen.getByText("Email");

    fireEvent.click(nameHeader);
    expect(nameHeader).not.toHaveAttribute("aria-sort");

    fireEvent.click(emailHeader);
    expect(emailHeader).toHaveAttribute("aria-sort", "ascending");
  });
});
