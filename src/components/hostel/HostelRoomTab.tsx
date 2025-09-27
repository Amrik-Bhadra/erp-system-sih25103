import * as React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Save, Trash } from "lucide-react";

// ✅ Define types
type Room = {
  no: string;
  type: string;
  capacity: number;
  facilities: string;
};

type Hostel = {
  name: string;
  capacity: number;
  floors: number;
  warden: string;
  rooms: Room[];
};

// 🔹 Mock hostel data
const hostelData: Record<string, Hostel> = {
  aryabhatta: {
    name: "Aryabhatta Hostel",
    capacity: 300,
    floors: 5,
    warden: "Mr. Sharma",
    rooms: [
      { no: "101", type: "Double", capacity: 2, facilities: "Wi-Fi, Fan" },
      { no: "102", type: "Single", capacity: 1, facilities: "AC, Wi-Fi" },
      { no: "103", type: "Double", capacity: 2, facilities: "Wi-Fi, Fan" },
    ],
  },
  gargi: {
    name: "Gargi Hostel",
    capacity: 200,
    floors: 3,
    warden: "Ms. Verma",
    rooms: [
      { no: "201", type: "Triple", capacity: 3, facilities: "Fan, Balcony" },
      { no: "202", type: "Single", capacity: 1, facilities: "AC, Wi-Fi" },
      { no: "203", type: "Double", capacity: 2, facilities: "Wi-Fi, Fan" },
    ],
  },
  vishveshwaraiya: {
    name: "Vishveshwaraiya Hostel",
    capacity: 250,
    floors: 4,
    warden: "Mr. Reddy",
    rooms: [
      { no: "301", type: "Double", capacity: 2, facilities: "AC, Wi-Fi, Heater" },
      { no: "302", type: "Double", capacity: 2, facilities: "Wi-Fi, Fan" },
      { no: "303", type: "Single", capacity: 1, facilities: "AC, Wi-Fi" },
    ],
  },
  kalpanaChawla: {
    name: "Kalpana Chawla Hostel",
    capacity: 180,
    floors: 3,
    warden: "Ms. Iyer",
    rooms: [
      { no: "401", type: "Single", capacity: 1, facilities: "AC, Wi-Fi" },
      { no: "402", type: "Double", capacity: 2, facilities: "Fan, Wi-Fi" },
      { no: "403", type: "Triple", capacity: 3, facilities: "Fan, Balcony" },
    ],
  },
  cvRaman: {
    name: "C.V. Raman Hostel",
    capacity: 220,
    floors: 4,
    warden: "Mr. Gupta",
    rooms: [
      { no: "501", type: "Double", capacity: 2, facilities: "Wi-Fi, Fan" },
      { no: "502", type: "Single", capacity: 1, facilities: "AC, Wi-Fi" },
      { no: "503", type: "Double", capacity: 2, facilities: "AC, Wi-Fi" },
    ],
  },
  bhabha: {
    name: "Bhabha Hostel",
    capacity: 150,
    floors: 2,
    warden: "Ms. Singh",
    rooms: [
      { no: "601", type: "Double", capacity: 2, facilities: "Fan, Wi-Fi" },
      { no: "602", type: "Single", capacity: 1, facilities: "AC, Wi-Fi" },
    ],
  },
  raman: {
    name: "Raman Hostel",
    capacity: 200,
    floors: 3,
    warden: "Mr. Joshi",
    rooms: [
      { no: "701", type: "Double", capacity: 2, facilities: "Wi-Fi, Fan" },
      { no: "702", type: "Single", capacity: 1, facilities: "AC, Wi-Fi, Heater" },
      { no: "703", type: "Triple", capacity: 3, facilities: "Fan, Balcony" },
    ],
  },
};

// ✅ Hostel keys type
type HostelKey = keyof typeof hostelData;

export function HostelRoomsTab() {
  const [selectedHostel, setSelectedHostel] = React.useState<HostelKey>("aryabhatta");
  const hostel: Hostel = hostelData[selectedHostel];

  return (
    <TabsContent value="hostel" className="space-y-3">
      {/* Hostel Info */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Hostel Information</CardTitle>
          {/* Hostel Dropdown */}
          <Select
            value={selectedHostel}
            onValueChange={(val) => setSelectedHostel(val as HostelKey)}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select Hostel" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(hostelData).map((key) => (
                <SelectItem key={key} value={key}>
                  {hostelData[key as HostelKey].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Hostel Name</label>
              <Input placeholder="Hostel Name" value={hostel.name} readOnly />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Total Capacity</label>
              <Input
                placeholder="Total Capacity"
                type="number"
                value={hostel.capacity}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Floors</label>
              <Input placeholder="Floors" type="number" value={hostel.floors} readOnly />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Warden Name</label>
              <Input placeholder="Warden Name" value={hostel.warden} readOnly />
            </div>
          </div>
          <Button className="mt-2 text-white">
            <Save className="w-4 h-4 mr-1" /> Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Rooms Table */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Rooms</CardTitle>
          <Button variant="secondary" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Room
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto border rounded-md">
            <table className="w-full text-sm">
              <thead className="bg-gray-100/10">
                <tr>
                  <th className="p-2 text-left">Room No</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Capacity</th>
                  <th className="p-2 text-left">Facilities</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hostel.rooms.map((room: Room, idx: number) => (
                  <tr key={idx} className="border border-gray-100/15">
                    <td className="p-2">{room.no}</td>
                    <td className="p-2">{room.type}</td>
                    <td className="p-2">{room.capacity}</td>
                    <td className="p-2">{room.facilities}</td>
                    <td className="p-2 flex gap-2 justify-center">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
