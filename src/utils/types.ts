export interface Room {
  roomNo: string;
  type: "Single" | "Double"; // restricts to known values
  occupancy: number;
  capacity: number;
  floor: number;
}

export interface Fee {
  semester: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Pending"; // restricts to known values
}

export interface Hostel {
  id: number;
  name: string;
  gender: "Boys" | "Girls"; // strict typing
  floorCount: number;
  rooms: Room[];
  images: string[];
  facilities: string[];
  fees: Fee[];
}