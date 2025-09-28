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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ----- Data for admitted students -----
export type AdmittedStudent = {
  id: number;
  name: string;
  enrollment: string;
  branch: string;
  year: string;
  category: "GEN" | "OBC" | "SC" | "ST";
  status: "Active" | "Inactive";
  bedNumber?: string;
};

const admittedStudentsData: AdmittedStudent[] = [
  { id: 1, name: "Amrik Bhadra", enrollment: "2025001", branch: "CSE", year: "1st", category: "GEN", status: "Active", bedNumber: "B101" },
  { id: 2, name: "Riya Sharma", enrollment: "2025002", branch: "ECE", year: "1st", category: "OBC", status: "Active", bedNumber: "E102" },
  { id: 3, name: "Rahul Mehta", enrollment: "2025003", branch: "ME", year: "2nd", category: "SC", status: "Active", bedNumber: "M203" },
  { id: 4, name: "Anjali Singh", enrollment: "2025004", branch: "CSE", year: "2nd", category: "GEN", status: "Inactive", bedNumber: "C204" },
  { id: 5, name: "Siddharth Kumar", enrollment: "2025005", branch: "ECE", year: "1st", category: "GEN", status: "Active", bedNumber: "E101" },
  { id: 6, name: "Priya Verma", enrollment: "2025006", branch: "ME", year: "3rd", category: "OBC", status: "Active", bedNumber: "M301" },
  { id: 7, name: "Aman Gupta", enrollment: "2025007", branch: "CSE", year: "3rd", category: "SC", status: "Active", bedNumber: "C302" },
  { id: 8, name: "Neha Patel", enrollment: "2025008", branch: "ECE", year: "2nd", category: "GEN", status: "Active", bedNumber: "E203" },
  { id: 9, name: "Karan Joshi", enrollment: "2025009", branch: "ME", year: "1st", category: "GEN", status: "Active", bedNumber: "M102" },
  { id: 10, name: "Simran Kaur", enrollment: "2025010", branch: "CSE", year: "1st", category: "OBC", status: "Active", bedNumber: "C101" },
  { id: 11, name: "Aditya Reddy", enrollment: "2025011", branch: "ECE", year: "3rd", category: "GEN", status: "Active", bedNumber: "E303" },
  { id: 12, name: "Tanvi Sharma", enrollment: "2025012", branch: "ME", year: "2nd", category: "SC", status: "Inactive", bedNumber: "M204" },
  { id: 13, name: "Vikram Singh", enrollment: "2025013", branch: "CSE", year: "2nd", category: "GEN", status: "Active", bedNumber: "C205" },
  { id: 14, name: "Ananya Desai", enrollment: "2025014", branch: "ECE", year: "1st", category: "GEN", status: "Active", bedNumber: "E103" },
  { id: 15, name: "Rohit Sharma", enrollment: "2025015", branch: "ME", year: "3rd", category: "OBC", status: "Active", bedNumber: "M302" },
  { id: 16, name: "Pooja Rani", enrollment: "2025016", branch: "CSE", year: "3rd", category: "SC", status: "Active", bedNumber: "C303" },
  { id: 17, name: "Harsh Vardhan", enrollment: "2025017", branch: "ECE", year: "2nd", category: "GEN", status: "Active", bedNumber: "E204" },
  { id: 18, name: "Meera Nair", enrollment: "2025018", branch: "ME", year: "1st", category: "GEN", status: "Active", bedNumber: "M103" },
  { id: 19, name: "Aakash Jain", enrollment: "2025019", branch: "CSE", year: "1st", category: "OBC", status: "Active", bedNumber: "C102" },
  { id: 20, name: "Sanya Kapoor", enrollment: "2025020", branch: "ECE", year: "3rd", category: "GEN", status: "Active", bedNumber: "E304" },
  { id: 21, name: "Raghav Verma", enrollment: "2025021", branch: "ME", year: "2nd", category: "SC", status: "Inactive", bedNumber: "M205" },
  { id: 22, name: "Isha Mehta", enrollment: "2025022", branch: "CSE", year: "2nd", category: "GEN", status: "Active", bedNumber: "C206" },
  { id: 23, name: "Devansh Sharma", enrollment: "2025023", branch: "ECE", year: "1st", category: "GEN", status: "Active", bedNumber: "E104" },
  { id: 24, name: "Shreya Singh", enrollment: "2025024", branch: "ME", year: "3rd", category: "OBC", status: "Active", bedNumber: "M303" },
  { id: 25, name: "Ayush Gupta", enrollment: "2025025", branch: "CSE", year: "3rd", category: "SC", status: "Active", bedNumber: "C304" },
  { id: 26, name: "Nikita Verma", enrollment: "2025026", branch: "ECE", year: "2nd", category: "GEN", status: "Active", bedNumber: "E205" },
  { id: 27, name: "Kabir Khan", enrollment: "2025027", branch: "ME", year: "1st", category: "GEN", status: "Active", bedNumber: "M104" },
  { id: 28, name: "Tanya Sharma", enrollment: "2025028", branch: "CSE", year: "1st", category: "OBC", status: "Active", bedNumber: "C103" },
  { id: 29, name: "Arjun Patel", enrollment: "2025029", branch: "ECE", year: "3rd", category: "GEN", status: "Active", bedNumber: "E305" },
  { id: 30, name: "Sakshi Mehta", enrollment: "2025030", branch: "ME", year: "2nd", category: "SC", status: "Inactive", bedNumber: "M206" },
  { id: 31, name: "Yash Kapoor", enrollment: "2025031", branch: "CSE", year: "2nd", category: "GEN", status: "Active", bedNumber: "C207" },
  { id: 32, name: "Ritika Sharma", enrollment: "2025032", branch: "ECE", year: "1st", category: "GEN", status: "Active", bedNumber: "E105" },
  { id: 33, name: "Sahil Verma", enrollment: "2025033", branch: "ME", year: "3rd", category: "OBC", status: "Active", bedNumber: "M304" },
  { id: 34, name: "Pallavi Singh", enrollment: "2025034", branch: "CSE", year: "3rd", category: "SC", status: "Active", bedNumber: "C305" },
  { id: 35, name: "Dhruv Jain", enrollment: "2025035", branch: "ECE", year: "2nd", category: "GEN", status: "Active", bedNumber: "E206" },
  { id: 36, name: "Anika Nair", enrollment: "2025036", branch: "ME", year: "1st", category: "GEN", status: "Active", bedNumber: "M105" },
  { id: 37, name: "Vihan Mehta", enrollment: "2025037", branch: "CSE", year: "1st", category: "OBC", status: "Active", bedNumber: "C104" },
  { id: 38, name: "Ira Sharma", enrollment: "2025038", branch: "ECE", year: "3rd", category: "GEN", status: "Active", bedNumber: "E306" },
  { id: 39, name: "Kunal Singh", enrollment: "2025039", branch: "ME", year: "2nd", category: "SC", status: "Inactive", bedNumber: "M207" },
  { id: 40, name: "Naina Patel", enrollment: "2025040", branch: "CSE", year: "2nd", category: "GEN", status: "Active", bedNumber: "C208" },
  { id: 41, name: "Rohan Gupta", enrollment: "2025041", branch: "ECE", year: "1st", category: "GEN", status: "Active", bedNumber: "E106" },
  { id: 42, name: "Tara Sharma", enrollment: "2025042", branch: "ME", year: "3rd", category: "OBC", status: "Active", bedNumber: "M305" },
  { id: 43, name: "Advik Kumar", enrollment: "2025043", branch: "CSE", year: "3rd", category: "SC", status: "Active", bedNumber: "C306" },
  { id: 44, name: "Maya Nair", enrollment: "2025044", branch: "ECE", year: "2nd", category: "GEN", status: "Active", bedNumber: "E207" },
  { id: 45, name: "Shivansh Mehta", enrollment: "2025045", branch: "ME", year: "1st", category: "GEN", status: "Active", bedNumber: "M106" },
  { id: 46, name: "Esha Sharma", enrollment: "2025046", branch: "CSE", year: "1st", category: "OBC", status: "Active", bedNumber: "C105" },
  { id: 47, name: "Veer Patel", enrollment: "2025047", branch: "ECE", year: "3rd", category: "GEN", status: "Active", bedNumber: "E307" },
  { id: 48, name: "Kiara Verma", enrollment: "2025048", branch: "ME", year: "2nd", category: "SC", status: "Inactive", bedNumber: "M208" },
  { id: 49, name: "Aryan Sharma", enrollment: "2025049", branch: "CSE", year: "2nd", category: "GEN", status: "Active", bedNumber: "C209" },
  { id: 50, name: "Diya Kapoor", enrollment: "2025050", branch: "ECE", year: "1st", category: "GEN", status: "Active", bedNumber: "E108" },
];


// ----- Table Component -----
export const StudentAdmissionListTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const branches = ["CSE", "ECE", "ME", "CE", "EE"];
  const years = ["1st", "2nd", "3rd", "4th"];
  const categories = ["GEN", "OBC", "SC", "ST"];
  const statuses = ["Active", "Inactive"];

  const [branchFilter, setBranchFilter] = React.useState<string | undefined>();
  const [yearFilter, setYearFilter] = React.useState<string | undefined>();
  const [categoryFilter, setCategoryFilter] = React.useState<string | undefined>();
  const [statusFilter, setStatusFilter] = React.useState<string | undefined>();

  // ----- Columns -----
  const columns: ColumnDef<AdmittedStudent>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
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
          Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "enrollment",
      header: "Enrollment ID",
    },
    {
      accessorKey: "branch",
      header: "Branch",
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "bedNumber",
      header: "Bed Number",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as "Active" | "Inactive";
        return (
          <Badge
            variant="outline"
            className={status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-800"}
          >
            {status}
          </Badge>
        );
      },
    },
  ];

  // ----- React Table Instance -----
  const table = useReactTable({
    data: admittedStudentsData,
    columns,
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
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full">
      {/* Filters & Export */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <Input
          placeholder="Search by name or enrollment"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="max-w-md flex-1"
        />

        <Select
          value={branchFilter}
          onValueChange={(value) => {
            setBranchFilter(value || undefined);
            table.getColumn("branch")?.setFilterValue(value || undefined);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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

        <Select
          value={categoryFilter}
          onValueChange={(value) => {
            setCategoryFilter(value || undefined);
            table.getColumn("category")?.setFilterValue(value || undefined);
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

        {/* Export CSV */}
        <Button
          variant="default"
          className="flex items-center gap-1 text-white ml-auto"
          onClick={() => {
            const rows = table.getFilteredRowModel().rows;
            const csv = [
              columns.map((c) => (typeof c.header === "string" ? c.header : c.id)).join(","),
              ...rows.map((row) =>
                row.getVisibleCells().map((cell) => row.getValue(cell.column.id)).join(",")
              ),
            ].join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "admitted_students.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      {/* Column Visibility */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Columns</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table.getAllColumns().filter((col) => col.getCanHide()).map((col) => (
            <DropdownMenuItem key={col.id} className="capitalize">
              <Checkbox
                checked={col.getIsVisible()}
                onCheckedChange={() => col.toggleVisibility(!col.getIsVisible())}
              />
              {col.id}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Table */}
      <div className="overflow-hidden rounded-md border border-gray-300/20 mt-2">
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="border border-gray-300/20">
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
                  No admitted students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
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

// ----- Main Page Component -----
const StudentAdmissionList = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Admitted Students</h2>
      <StudentAdmissionListTable />
    </div>
  );
};

export default StudentAdmissionList;
