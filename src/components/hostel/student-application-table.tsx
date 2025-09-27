import React from "react";
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
import { ArrowUpDown, Download } from "lucide-react";

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
import type { StudentApplication } from "@/utils/dataProvider";
import { studentApplication as data } from "@/utils/dataProvider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ----- Student Applications Table Component -----
export function StudentApplicationsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [assignedMap, setAssignedMap] = React.useState<Record<number, boolean>>({});

  const years = ["1st", "2nd", "3rd", "4th"];
  const roomTypes = ["Single", "Double"];
  const quotas = ["General", "OBC", "SC", "ST"];
  const statuses = ["Pending", "Approved", "Rejected", "Waitlist"];

  const [yearFilter, setYearFilter] = React.useState<string | undefined>();
  const [roomTypeFilter, setRoomTypeFilter] = React.useState<string | undefined>();
  const [quotaFilter, setQuotaFilter] = React.useState<string | undefined>();
  const [statusFilter, setStatusFilter] = React.useState<string | undefined>(undefined);

  // ----- Columns Definition -----
  const columns: ColumnDef<StudentApplication>[] = [
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
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "enrollment",
      header: "Enrollment ID",
      cell: ({ row }) => <div>{row.getValue("enrollment")}</div>,
    },
    {
      accessorKey: "roomType",
      header: "Room Type",
      cell: ({ row }) => <div>{row.getValue("roomType")}</div>,
    },
    {
      accessorKey: "quota",
      header: "Quota",
      cell: ({ row }) => <div>{row.getValue("quota")}</div>,
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => <div>{row.getValue("year")}</div>,
    },
    {
      accessorKey: "suggestedBed",
      header: "Suggested Bed",
      cell: ({ row }) => {
        const suggested = row.getValue("suggestedBed") as string | undefined;
        const assigned = assignedMap[row.original.id] || false;

        const handleAssign = () => {
          setAssignedMap((prev) => ({ ...prev, [row.original.id]: true }));
          row.original.status = "Approved";
        };

        return (
          <div className="flex items-center gap-2">
            <Badge
              variant={assigned ? "default" : "secondary"}
              className={assigned ? "bg-green-200 text-green-800" : ""}
              title={assigned ? "Bed assigned" : `Nearest available bed: ${suggested}`}
            >
              {suggested}
            </Badge>

            {!assigned && suggested && (
              <Button
                size="sm"
                variant="secondary"
                onClick={handleAssign}
                className="px-2 py-0.5 bg-[#faedcd]/20 cursor-pointer"
              >
                Assign
              </Button>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as
          | "Pending"
          | "Approved"
          | "Rejected"
          | "Waitlist";

        const statusColors: Record<typeof status, string> = {
          Pending: "bg-yellow-100 text-yellow-800",
          Approved: "bg-green-100 text-green-800",
          Rejected: "bg-red-100 text-red-800",
          Waitlist: "bg-blue-100 text-blue-800",
        };

        return (
          <Badge variant="outline" className={statusColors[status]}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const app = row.original;
        return (
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={() => alert(`Approved ${app.name}`)}>
              Approve
            </Button>
            <Button size="sm" variant="outline" onClick={() => alert(`Rejected ${app.name}`)}>
              Reject
            </Button>
            <Button size="sm" variant="outline" onClick={() => alert(`Waitlisted ${app.name}`)}>
              Waitlist
            </Button>
          </div>
        );
      },
    },
  ];

  // ----- React Table Instance -----
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

  // ----- Render Component -----
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search student by name or enrollment..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />

          {/* Year Filter */}
          <Select
            value={yearFilter}
            onValueChange={(value) => {
              setYearFilter(value || undefined);
              table.getColumn("year")?.setFilterValue(value || undefined);
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Room Type Filter */}
          <Select
            value={roomTypeFilter}
            onValueChange={(value) => {
              setRoomTypeFilter(value || undefined);
              table.getColumn("roomType")?.setFilterValue(value || undefined);
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Room Type" />
            </SelectTrigger>
            <SelectContent>
              {roomTypes.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Quota Filter */}
          <Select
            value={quotaFilter}
            onValueChange={(value) => {
              setQuotaFilter(value || undefined);
              table.getColumn("quota")?.setFilterValue(value || undefined);
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Quotas" />
            </SelectTrigger>
            <SelectContent>
              {quotas.map((q) => (
                <SelectItem key={q} value={q}>
                  {q}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value || undefined);
              table.getColumn("status")?.setFilterValue(value || undefined);
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
        </div>

        {/* Column Visibility & Export */}
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
                      onCheckedChange={() => column.toggleVisibility(!column.getIsVisible())}
                    />
                    {column.id}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="default"
            className="ml-auto flex items-center gap-1 text-white cursor-pointer"
            onClick={() => {
              const rows = table.getFilteredRowModel().rows;
              const csv = [
                columns.map((c) => (c.header instanceof Function ? c.id : c.header)).join(","),
                ...rows.map((row) =>
                  row.getVisibleCells().map((cell) => row.getValue(cell.column.id)).join(",")
                ),
              ].join("\n");

              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "student_applications.csv";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table className="border border-gray-300/20">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border border-gray-300/20">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-gray-100/10 font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} selected
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
