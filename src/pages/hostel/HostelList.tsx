"use client";

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";

import { ArrowUpDown, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { hostelList as initialHostels } from "@/utils/dataProvider";
import type { Hostel } from "@/utils/dataProvider";

export type ExitRequest = {
  studentName: string;
  enrollment: string;
  hostel: string;
  room: string;
  bed: string;
  exitDate: string;
  roomDues: number;
  fine: number;
  otherDues: number;
  totalDues: number;
  status: "Pending" | "Approved" | "Rejected";
};

const columns: ColumnDef<Hostel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Hostel Name <ArrowUpDown className="h-4 w-4 ml-1" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "floors",
    header: "Floors",
  },
  {
    accessorKey: "warden",
    header: "Warden",
  },
  {
    accessorKey: "facilities",
    header: "Facilities",
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex gap-2 justify-center">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm" variant="destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];

// ------------------ Main Component ------------------
const HostelList = () => {
  const [hostels, setHostels] = React.useState<Hostel[]>(initialHostels);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // State for new hostel form
  const [newHostel, setNewHostel] = React.useState<Partial<Hostel>>({});

  const table = useReactTable({
    data: hostels,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  const handleAddHostel = () => {
    if (newHostel.name && newHostel.capacity && newHostel.floors) {
      const newEntry: Hostel = {
        id: Date.now().toString(),
        name: newHostel.name,
        capacity: Number(newHostel.capacity),
        floors: Number(newHostel.floors),
        warden: newHostel.warden || "Not Assigned",
        facilities: newHostel.facilities || "N/A",
      };
      setHostels((prev) => [...prev, newEntry]);
      setNewHostel({});
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Search hostel by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Add Hostel Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 text-white">
              <Plus className="w-4 h-4" /> Add Hostel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Hostel</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="flex flex-col gap-3">
                <Label>Hostel Name</Label>
                <Input
                  value={newHostel.name || ""}
                  onChange={(e) =>
                    setNewHostel({ ...newHostel, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Capacity</Label>
                <Input
                  type="number"
                  value={newHostel.capacity || ""}
                  onChange={(e) =>
                    setNewHostel({ ...newHostel, capacity: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Floors</Label>
                <Input
                  type="number"
                  value={newHostel.floors || ""}
                  onChange={(e) =>
                    setNewHostel({ ...newHostel, floors: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Facilities</Label>
                <Input
                  placeholder="WiFi, Mess, Laundry"
                  value={newHostel.facilities || ""}
                  onChange={(e) =>
                    setNewHostel({ ...newHostel, facilities: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Warden Name</Label>
                <Input
                  value={newHostel.warden || ""}
                  onChange={(e) =>
                    setNewHostel({ ...newHostel, warden: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Images</Label>
                <Input type="file" multiple />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddHostel} className="text-white">
                Save Hostel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-gray-200/10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  No hostels found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
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
  );
};

export default HostelList;
