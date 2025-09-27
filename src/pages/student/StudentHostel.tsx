"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  hostelsData,
  hostelFeesData,
  complaintsData,
} from "@/utils/dataProvider";

import Image1 from "../../assets/images/hostel1-1.jpeg";
import Image2 from "../../assets/images/hostel1-2.jpg";
import Image3 from "../../assets/images/hostel1-3.jpg";

import type { Hostel, Room } from "@/utils/types";

const StudentHostel = () => {
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [selectedRoom,] = useState<Room | null>(null);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  return (
    <div className="space-y-4">
      <Tabs defaultValue="apply" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="apply">Apply for Hostel</TabsTrigger>
          <TabsTrigger value="allocation">Room Allocation</TabsTrigger>
          <TabsTrigger value="fees">Fees & Payment</TabsTrigger>
          <TabsTrigger value="raiseComplaint">Raise Complaint</TabsTrigger>
          <TabsTrigger value="trackComplaint">Track Complaint</TabsTrigger>
          <TabsTrigger value="exit">Exit / Clearance</TabsTrigger>
        </TabsList>

        {/* Apply for Hostel */}
        <TabsContent value="apply">
          <div className="flex justify-between">
            <h3 className="font-semibold mb-4">Available Hostels</h3>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* Gender Filter */}
              <Select
                value={selectedGender}
                onValueChange={(value) => setSelectedGender(value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Gender</SelectItem>
                  <SelectItem value="Boys">Boys</SelectItem>
                  <SelectItem value="Girls">Girls</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select
                value={selectedPrice}
                onValueChange={(value) => setSelectedPrice(value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Price</SelectItem>
                  <SelectItem value="Low">Below ₹5000</SelectItem>
                  <SelectItem value="Medium">₹5000 - ₹10000</SelectItem>
                  <SelectItem value="High">Above ₹10000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filtered Hostels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostelsData
              .filter((hostel) => {
                // Gender filter
                if (selectedGender && selectedGender !== "All") {
                  if (hostel.gender !== selectedGender) return false;
                }

                // Price filter (based on hostel.fees[0].amount for demo)
                if (selectedPrice && selectedPrice !== "All") {
                  const amount = hostel.fees[0]?.amount || 0;
                  if (
                    (selectedPrice === "Low" && amount >= 5000) ||
                    (selectedPrice === "Medium" &&
                      (amount < 5000 || amount > 10000)) ||
                    (selectedPrice === "High" && amount <= 10000)
                  ) {
                    return false;
                  }
                }

                return true;
              })
              .map((hostel) => (
                <div
                  key={hostel.id}
                  className="border border-gray-100/20 rounded-md overflow-hidden shadow hover:shadow-lg transition"
                >
                  <img
                    src={Image1}
                    alt={hostel.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-lg">{hostel.name}</h4>
                      <Badge
                        className={`${
                          hostel.gender === "Boys"
                            ? "bg-[#2a9d8f]"
                            : "bg-[#ef476f]"
                        } px-3 py-1 text-white`}
                      >
                        {hostel.gender}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {hostel.facilities.map((f, i) => (
                        <Badge
                          key={i}
                          className="px-2 py-1 bg-[#464646]/80 text-white"
                        >
                          {f}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="default"
                      className="mt-2 w-full text-white cursor-pointer"
                      onClick={() => setSelectedHostel(hostel)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
          </div>

          {/* Modal code remains unchanged */}
          {selectedHostel && (
            <Dialog
              open={!!selectedHostel}
              onOpenChange={() => setSelectedHostel(null)}
            >
              <DialogContent className="max-w-5xl border border-gray-200/20 bg-[#222]">
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    {selectedHostel.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <h5 className="font-semibold">Rooms</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedHostel.rooms.map((room, i) => (
                      <div key={i} className="border border-gray-50/30 p-2 rounded text-center hover:bg-[#2b7fff]">
                        <div>Room: {room.roomNo}</div>
                        <div>Type: {room.type}</div>
                        <div>
                          Occupancy: {room.occupancy}/{room.capacity}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h5 className="font-semibold">Images</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <img
                      key={0}
                      src={Image1}
                      alt={`Hostel Image ${1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <img
                      key={1}
                      src={Image2}
                      alt={`Hostel Image ${2}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <img
                      key={2}
                      src={Image3}
                      alt={`Hostel Image ${3}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>

                  <h5 className="font-semibold">Facilities</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedHostel.facilities.map((f, i) => (
                      <Badge key={i} className="px-3 py-1 bg-[#464646] text-white">
                        {f}
                      </Badge>
                    ))}
                  </div>

                  <h5 className="font-semibold">Fees</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedHostel.fees.map((fee, i) => (
                      <div
                        key={i}
                        className="border border-[#eee]/30 p-2 rounded flex justify-between"
                      >
                        <div>{fee.semester}</div>
                        <div>
                          {fee.amount} - {fee.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        {/* Room Allocation */}
        <TabsContent value="allocation">
          <div className="overflow-hidden rounded-md border border-gray-100/20 p-4">
            <h3 className="font-semibold mb-3">Your Allocated Room</h3>
            {selectedRoom ? (
              <div className="text-center">
                <p>Room No: {selectedRoom.roomNo}</p>
                <p>Type: {selectedRoom.type}</p>
                <p>Floor: {selectedRoom.floor}</p>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No room allocated yet.
              </p>
            )}
          </div>
        </TabsContent>

        {/* Fees & Payment */}
        <TabsContent value="fees">
          <div className="overflow-hidden rounded-md border border-gray-100/20">
            <Table className="mb-0">
              <TableHeader>
                <TableRow className="bg-gray-100/10">
                  <TableHead className="text-center">S.No</TableHead>
                  <TableHead className="text-center">Semester</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                  <TableHead className="text-center">Payment Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hostelFeesData.map((fee, i) => (
                  <TableRow key={fee.id}>
                    <TableCell className="text-center">{i + 1}</TableCell>
                    <TableCell className="text-center">
                      {fee.semester}
                    </TableCell>
                    <TableCell className="text-center">{fee.amount}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`px-3 py-1 rounded text-white ${
                          fee.status === "Paid" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {fee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {fee.status === "Unpaid" && (
                        <Button
                          size="sm"
                          variant="default"
                          className="text-white"
                        >
                          Pay Now
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Raise Complaint */}
        <TabsContent value="raiseComplaint">
          <div className="border border-gray-100/20 rounded-md p-4">
            <h3 className="font-semibold mb-3">Raise Complaint</h3>
            <form className="flex flex-col gap-3">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Complaint Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mess">Mess Issue</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Describe your complaint..."
                className="w-full"
              />

              <Button size="sm" variant="default" className="text-white w-fit">
                Submit
              </Button>
            </form>
          </div>
        </TabsContent>

        {/* Track Complaint */}
        <TabsContent value="trackComplaint">
          <div className="overflow-hidden rounded-md border border-gray-100/20">
            <Table className="mb-0">
              <TableHeader>
                <TableRow className="bg-gray-100/10">
                  <TableHead className="text-center">S.No</TableHead>
                  <TableHead className="text-center">Type</TableHead>
                  <TableHead className="text-center">Description</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaintsData.map((c, i) => (
                  <TableRow key={c.id}>
                    <TableCell className="text-center">{i + 1}</TableCell>
                    <TableCell className="text-center">{c.type}</TableCell>
                    <TableCell className="text-center">
                      {c.description}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`px-3 py-1 rounded text-white ${
                          c.status === "Resolved"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {c.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Exit / Clearance */}
        <TabsContent value="exit">
          <div className="border border-gray-100/20 rounded-md p-4 flex flex-col items-center gap-3">
            <h3 className="font-semibold">Exit / Clearance Request</h3>
            <p className="text-center text-muted-foreground">
              Click below to request hostel clearance
            </p>
            <Button size="sm" variant="default" className="text-white">
              Request Clearance
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentHostel;
