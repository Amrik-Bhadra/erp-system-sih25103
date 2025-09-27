import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";

// ✅ Define type for ExitRequest
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
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("studentName")}</div>
    ),
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
    cell: ({ row }) => (
      <div>₹{(row.getValue("roomDues") as number).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "fine",
    header: "Fine / Damage",
    cell: ({ row }) => (
      <div>₹{(row.getValue("fine") as number).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "otherDues",
    header: "Other Dues",
    cell: ({ row }) => (
      <div>₹{(row.getValue("otherDues") as number).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "totalDues",
    header: "Total Dues",
    cell: ({ row }) => (
      <div>₹{(row.getValue("totalDues") as number).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as ExitRequest["status"];
      const statusColors: Record<ExitRequest["status"], string> = {
        Pending: "bg-yellow-100 text-yellow-800",
        Approved: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
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
