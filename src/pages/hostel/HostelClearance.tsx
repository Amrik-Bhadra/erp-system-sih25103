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

import { exitTableData as data } from "@/utils/dataProvider"; 

// ----- Columns -----
export const columns: ColumnDef<ExitRequest>[] = [
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
        onCheckedChange={(val) => row.toggleSelected(!!val)}
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
    cell: ({ row }) => <div className="font-medium">{row.getValue("studentName")}</div>,
  },
  {
    accessorKey: "enrollment",
    header: "Enrollment ID",
    cell: ({ row }) => <div>{row.getValue("enrollment")}</div>,
  },
  {
    accessorKey: "hostel",
    header: "Hostel",
    cell: ({ row }) => <div>{row.getValue("hostel")}</div>,
  },
  {
    accessorKey: "room",
    header: "Room",
    cell: ({ row }) => <div>{row.getValue("room")}</div>,
  },
  {
    accessorKey: "bed",
    header: "Bed",
    cell: ({ row }) => <div>{row.getValue("bed")}</div>,
  },
  {
    accessorKey: "exitDate",
    header: "Exit Date",
    cell: ({ row }) => <div>{row.getValue("exitDate")}</div>,
  },
  {
    accessorKey: "roomDues",
    header: "Room Dues",
    cell: ({ row }) => <div>₹{(row.getValue("roomDues") as number).toLocaleString()}</div>,
  },
  {
    accessorKey: "fine",
    header: "Fine / Damage",
    cell: ({ row }) => <div>₹{(row.getValue("fine") as number).toLocaleString()}</div>,
  },
  {
    accessorKey: "otherDues",
    header: "Other Dues",
    cell: ({ row }) => <div>₹{(row.getValue("otherDues") as number).toLocaleString()}</div>,
  },
  {
    accessorKey: "totalDues",
    header: "Total Dues",
    cell: ({ row }) => <div>₹{(row.getValue("totalDues") as number).toLocaleString()}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusColors: Record<string, string> = {
        Pending: "bg-yellow-100 text-yellow-800",
        Approved: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
      };
      return (
        <Badge variant="outline" className={`${statusColors[status]}`}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => alert(`Approved ${request.studentName}`)}
          >
            Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => alert(`Rejected ${request.studentName}`)}
          >
            Reject
          </Button>
        </div>
      );
    },
  },
];

// ----- Hostel Clearance Table Component -----
const HostelClearance = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchText, setSearchText] = React.useState("");

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
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 gap-2">
        <Input
          placeholder="Search by student or hostel..."
          value={searchText}
          onChange={(e) => {
            const val = e.target.value;
            setSearchText(val);
            table.getColumn("studentName")?.setFilterValue(val);
            table.getColumn("hostel")?.setFilterValue(val);
          }}
          className="max-w-sm"
        />

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((c) => c.getCanHide())
                .map((c) => (
                  <DropdownMenuItem key={c.id}>
                    <Checkbox
                      checked={c.getIsVisible()}
                      onCheckedChange={() => c.toggleVisibility(!c.getIsVisible())}
                    />
                    {c.id}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="default"
            className="text-white"
            onClick={() => {
              const rows = table.getFilteredRowModel().rows;
              const csv = [
                columns
                  .map((c) => (c.header instanceof Function ? c.id : c.header))
                  .join(","),
                ...rows.map((row) =>
                  row.getVisibleCells().map((cell) => row.getValue(cell.column.id)).join(",")
                ),
              ].join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "hostel_clearance.csv";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border rounded-md">
        <div className="min-w-[1200px]">
          <Table className="table-auto border border-gray-300/20">
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-gray-100/10 font-semibold whitespace-nowrap"
                    >
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
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-4">
                    No exit requests found.
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
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} selected
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HostelClearance;
