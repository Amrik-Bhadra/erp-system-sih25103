import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, Download, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { hostelComplaints as data } from "@/utils/dataProvider"; // your complaints data

// ----- Columns Definition -----
export const columns: ColumnDef<HostelComplaint>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "studentName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student Name <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("studentName")}</div>
    ),
  },
  {
    accessorKey: "room",
    header: "Room / Hostel",
    cell: ({ row }) => <div>{row.getValue("room")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "description",
    header: "Complaint Description",
    cell: ({ row }) => {
      const desc = row.getValue("description") as string;
      return (
        <div title={desc} className="truncate max-w-xs">
          {desc}
        </div>
      );
    },
  },
  {
    accessorKey: "dateRaised",
    header: "Date Raised",
    cell: ({ row }) => <div>{row.getValue("dateRaised")}</div>,
  },
  {
    accessorKey: "assignedStaff",
    header: "Assigned Staff",
    cell: ({ row }) => (
      <div>{row.getValue("assignedStaff") || "Unassigned"}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusColors: Record<string, string> = {
        Pending: "bg-yellow-100 text-yellow-800",
        "In-Progress": "bg-blue-100 text-blue-800",
        Resolved: "bg-green-100 text-green-800",
      };
      return (
        <Badge
          variant="outline"
          className={`${statusColors[status as string]}`}
        >
          {status as string}
        </Badge>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Notes / Updates",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => alert(`Notes for ${row.getValue("studentName")}`)}
      >
        <FileText className="w-4 h-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const complaint = row.original;
      return (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => alert(`Assign staff for ${complaint.studentName}`)}
          >
            Assign
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => alert(`Update status for ${complaint.studentName}`)}
          >
            Update Status
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => alert(`Add notes for ${complaint.studentName}`)}
          >
            Add Notes
          </Button>
        </div>
      );
    },
  },
];

// ----- Hostel Complaints Table Component -----
export function HostelComplaintsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const categories = ["Plumbing", "Electricity", "Cleaning", "Other"];
  const statuses = ["Pending", "In-Progress", "Resolved"];
  const staffList = ["Unassigned", "John Doe", "Jane Smith", "Mike Lee"]; // Example staff

  const [categoryFilter, setCategoryFilter] = React.useState<
    string | undefined
  >();
  const [statusFilter, setStatusFilter] = React.useState<string | undefined>();
  const [staffFilter, setStaffFilter] = React.useState<string | undefined>();
  const [searchText, setSearchText] = React.useState<string>("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* Header: Search and Filters */}
      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search by student, room, or description..."
            value={searchText}
            onChange={(e) => {
              const val = e.target.value;
              setSearchText(val);
              table.getColumn("studentName")?.setFilterValue(val);
              table.getColumn("room")?.setFilterValue(val);
              table.getColumn("description")?.setFilterValue(val);
            }}
            className="max-w-sm"
          />

          {/* Category Filter */}
          <Select
            value={categoryFilter}
            onValueChange={(val) => {
              setCategoryFilter(val || undefined);
              table.getColumn("category")?.setFilterValue(val || undefined);
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val || undefined);
              table.getColumn("status")?.setFilterValue(val || undefined);
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Staff Filter */}
          <Select
            value={staffFilter}
            onValueChange={(val) => {
              setStaffFilter(val || undefined);
              table
                .getColumn("assignedStaff")
                ?.setFilterValue(val || undefined);
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Staff" />
            </SelectTrigger>
            <SelectContent>
              {staffList.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuItem key={column.id} className="capitalize">
                    <Checkbox
                      checked={column.getIsVisible()}
                      onCheckedChange={() =>
                        column.toggleVisibility(!column.getIsVisible())
                      }
                    />
                    {column.id}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export CSV */}
          <Button
            variant="default"
            className="ml-auto flex items-center gap-1 text-white cursor-pointer"
            onClick={() => {
              const rows = table.getFilteredRowModel().rows;
              const csv = [
                columns
                  .map((c) => (c.header instanceof Function ? c.id : c.header))
                  .join(","),
                ...rows.map((row) =>
                  row
                    .getVisibleCells()
                    .map((cell) => row.getValue(cell.column.id))
                    .join(",")
                ),
              ].join("\n");

              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "hostel_complaints.csv";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="w-full overflow-x-auto rounded-md border">
        {/* Inner div ensures table width does not shrink */}
        <div className="min-w-[1000px]">
          {" "}
          {/* adjust 1000px or use dynamic value depending on number of columns */}
          <Table className="border border-gray-300/20 table-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-gray-100/10 font-semibold whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border border-gray-300/20"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No complaints found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} selected
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
