import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

type Student = {
  id: string;
  name: string;
  enrollment: string;
  year: string;
  quota: string;
  status: "Unassigned" | "Assigned";
  room?: string;
  bed?: string;
};

const dummyStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    enrollment: "2025A001",
    year: "1st",
    quota: "General",
    status: "Unassigned",
  },
  {
    id: "2",
    name: "Priya Sharma",
    enrollment: "2025A002",
    year: "2nd",
    quota: "OBC",
    status: "Unassigned",
  },
];

const dummyAllocations = {
  "Hostel A": {
    "Room 101": [
      { bed: "Bed 1", student: "Ravi Kumar" },
      { bed: "Bed 2", student: "Empty" },
    ],
    "Room 102": [
      { bed: "Bed 1", student: "Empty" },
      { bed: "Bed 2", student: "Sneha Patel" },
    ],
  },
  "Hostel B": {
    "Room 201": [
      { bed: "Bed 1", student: "Empty" },
      { bed: "Bed 2", student: "Empty" },
    ],
  },
};

const HostelRoomAllocation = () => {
  const [students, setStudents] = React.useState<Student[]>(dummyStudents);
  const [allocations, setAllocations] = React.useState(dummyAllocations);

  const [assignModal, setAssignModal] = React.useState(false);
  const [swapModal, setSwapModal] = React.useState(false);

  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(
    null
  );
  const [selectedHostel, setSelectedHostel] = React.useState("Hostel A");
  const [swapSelection, setSwapSelection] = React.useState<string[]>([]);

  // Assign Room Handler
  const handleAssignRoom = (room: string, bed: string) => {
    if (!selectedStudent) return;

    setAllocations((prev) => {
      const updated = { ...prev };
      const beds = updated[selectedHostel][room];
      const bedIndex = beds.findIndex((b) => b.bed === bed);
      if (bedIndex !== -1) beds[bedIndex].student = selectedStudent.name;
      return updated;
    });

    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? { ...s, status: "Assigned", room, bed }
          : s
      )
    );

    toast.success(`${selectedStudent.name} assigned to ${room} - ${bed}`);
    setAssignModal(false);
    setSelectedStudent(null);
  };

  // Swap Students Handler
  const handleSwap = () => {
    if (swapSelection.length !== 2) return;
    const [student1, student2] = swapSelection;

    setAllocations((prev) => {
      const updated = { ...prev };
      for (const hostel of Object.keys(updated)) {
        for (const room of Object.keys(updated[hostel])) {
          updated[hostel][room] = updated[hostel][room].map((b) => {
            if (b.student === student1) return { ...b, student: student2 };
            if (b.student === student2) return { ...b, student: student1 };
            return b;
          });
        }
      }
      return updated;
    });

    toast.success(`${student1} swapped with ${student2}`);
    setSwapModal(false);
    setSwapSelection([]);
  };

  return (
    <div className="space-y-4">
      {/* Occupancy Dashboard */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Hostel A</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">120 / 150 occupied</p>
            <Progress value={80} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hostel B</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">95 / 100 occupied</p>
            <Progress value={95} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hostel C</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">50 / 80 occupied</p>
            <Progress value={62} />
          </CardContent>
        </Card>
      </div>

      {/* Pending Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Students</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Quota</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students
                .filter((s) => s.status === "Unassigned")
                .map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.enrollment}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>{student.quota}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{student.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedStudent(student);
                          setAssignModal(true);
                        }}
                        className="text-white"
                      >
                        Assign Room
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Current Allocations */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Current Allocations</CardTitle>
          <Select value={selectedHostel} onValueChange={setSelectedHostel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Hostel" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(allocations).map((hostel) => (
                <SelectItem key={hostel} value={hostel}>
                  {hostel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Bed</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(allocations[selectedHostel]).map(([room, beds]) =>
                beds.map((b, idx) => (
                  <TableRow key={`${room}-${idx}`}>
                    <TableCell>{room}</TableCell>
                    <TableCell>{b.bed}</TableCell>
                    <TableCell>
                      {b.student === "Empty" ? (
                        <Badge variant="secondary">Empty</Badge>
                      ) : (
                        b.student
                      )}
                    </TableCell>
                    <TableCell>
                      {b.student !== "Empty" && (
                        <Button
                          size="sm"
                          variant={
                            swapSelection.includes(b.student)
                              ? "destructive"
                              : "outline"
                          }
                          onClick={() => {
                            setSwapSelection((prev) =>
                              prev.includes(b.student)
                                ? prev.filter((s) => s !== b.student)
                                : [...prev, b.student]
                            );
                            setSwapModal(true);
                          }}
                        >
                          {swapSelection.includes(b.student)
                            ? "Selected"
                            : "Swap"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assignment Modal */}
      <Dialog open={assignModal} onOpenChange={setAssignModal}>
        <DialogContent className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg w-[90%] max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Assign Room
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Assign <strong>{selectedStudent?.name}</strong> to a room:
            </p>

            <div className="flex gap-2 rounded-md">
              <Select>
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Select Room" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(allocations[selectedHostel]).map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Select Bed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bed 1">Bed 1</SelectItem>
                  <SelectItem value="Bed 2">Bed 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setAssignModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleAssignRoom("Room 101", "Bed 1")}
              className="text-white bg-blue-600 hover:bg-blue-700"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Swap Modal */}
      <Dialog open={swapModal} onOpenChange={setSwapModal}>
        <DialogContent className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg w-[90%] max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Swap Students
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              Select exactly 2 students to swap their rooms/beds.
            </p>

            {swapSelection.length === 2 ? (
              <p className="font-medium text-gray-900 dark:text-gray-100 text-lg">
                {swapSelection[0]} ↔ {swapSelection[1]}
              </p>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select students from the allocations table.
              </p>
            )}
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSwapModal(false)}>
              Cancel
            </Button>
            <Button
              disabled={swapSelection.length !== 2}
              onClick={handleSwap}
              className={`text-white ${
                swapSelection.length === 2
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm Swap
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HostelRoomAllocation;
