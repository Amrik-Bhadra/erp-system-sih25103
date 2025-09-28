import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  User,
  MapPin,
  BookOpen,
  Upload,
  CheckCircle2,
} from "lucide-react";

// Stepper configuration
const steps = [
  { id: 1, name: "Student Info", icon: User },
  { id: 2, name: "Address", icon: MapPin },
  { id: 3, name: "Education", icon: BookOpen },
  { id: 4, name: "Documents", icon: Upload },
  { id: 5, name: "Confirmation", icon: CheckCircle2 },
];

const NewAdmission = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [step, setStep] = useState(1);

  const totalSteps = steps.length;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <div className="flex items-center justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isCompleted = step > s.id;

          return (
            <div key={s.id} className="flex-1 flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${isCompleted ? "bg-green-600 border-green-600 text-white" : ""}
                ${isActive ? "border-blue-600 text-blue-600" : ""}
                ${
                  !isActive && !isCompleted
                    ? "border-gray-300 text-gray-400"
                    : ""
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="ml-2 text-sm font-medium">{s.name}</div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 bg-gray-300" />
              )}
            </div>
          );
        })}
      </div>

      {/* STEP 1 – Student Info */}
      {step === 1 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Student Unique ID</Label>
                <Input placeholder="Auto-generated ID" readOnly />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Admission Status</Label>
                  <div className="mt-1">
                    <Badge className="bg-yellow-500 text-white">Pending</Badge>
                  </div>
                </div>
                <div>
                  <Label>Current Status</Label>
                  <div className="mt-1">
                    <Badge className="bg-green-600 text-white">Active</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Admission Batch</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022-23">2022-23</SelectItem>
                    <SelectItem value="2023-24">2023-24</SelectItem>
                    <SelectItem value="2024-25">2024-25</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Student Mobile No</Label>
                <Input type="tel" placeholder="Enter mobile number" />
              </div>
              <div className="space-y-2">
                <Label>Alternate Mobile No</Label>
                <Input type="tel" placeholder="Enter alternate mobile number" />
              </div>
              <div className="space-y-2">
                <Label>College Email</Label>
                <Input type="email" placeholder="student@college.edu" />
              </div>
              <div className="space-y-2">
                <Label>Personal Email</Label>
                <Input type="email" placeholder="example@gmail.com" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Birth Place</Label>
                <Input placeholder="Enter birth place" />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Marital Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Nationality</Label>
                <Input placeholder="Enter nationality" />
              </div>

              <div className="space-y-2">
                <Label>Blood Group</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Religion</Label>
                <Input placeholder="Enter religion" />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* STEP 2 – Address */}
      {/* STEP 2 – Address */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Current Address */}
          <Card>
            <CardHeader>
              <CardTitle>Current Address</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Address Line</Label>
                <Input placeholder="Enter current address" />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input placeholder="Enter city" />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input placeholder="Enter state" />
              </div>
              <div className="space-y-2">
                <Label>Pincode</Label>
                <Input placeholder="Enter pincode" />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input placeholder="Enter country" />
              </div>
            </CardContent>
          </Card>

          {/* Permanent Address */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Permanent Address</CardTitle>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="sameAddress" className="h-4 w-4" />
                <Label htmlFor="sameAddress">Same as Current Address</Label>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Address Line</Label>
                <Input placeholder="Enter permanent address" />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input placeholder="Enter city" />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input placeholder="Enter state" />
              </div>
              <div className="space-y-2">
                <Label>Pincode</Label>
                <Input placeholder="Enter pincode" />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input placeholder="Enter country" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* STEP 3 – Education Info */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Class X */}
          <Card>
            <CardHeader>
              <CardTitle>Class X Education</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>School Name</Label>
                <Input placeholder="Enter Class X school name" />
              </div>
              <div className="space-y-2">
                <Label>Board</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="ICSE">ICSE</SelectItem>
                    <SelectItem value="State Board">State Board</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Year of Passing</Label>
                <Input type="number" placeholder="Enter passing year" />
              </div>
              <div className="space-y-2">
                <Label>Percentage / Marks</Label>
                <Input type="number" placeholder="Enter marks or percentage" />
              </div>
            </CardContent>
          </Card>

          {/* Class XII */}
          <Card>
            <CardHeader>
              <CardTitle>Class XII Education</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>School Name</Label>
                <Input placeholder="Enter Class XII school name" />
              </div>
              <div className="space-y-2">
                <Label>Board</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="ICSE">ICSE</SelectItem>
                    <SelectItem value="State Board">State Board</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Year of Passing</Label>
                <Input type="number" placeholder="Enter passing year" />
              </div>
              <div className="space-y-2">
                <Label>Percentage / Marks</Label>
                <Input type="number" placeholder="Enter marks or percentage" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* STEP 4 – Documents */}
      {/* STEP 4 – Document Upload */}
      {step === 4 && (
        <div className="space-y-6">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input type="file" accept="image/*" />
            </CardContent>
          </Card>

          {/* Signature */}
          <Card>
            <CardHeader>
              <CardTitle>Signature</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input type="file" accept="image/*,application/pdf" />
            </CardContent>
          </Card>

          {/* Class X Marksheet */}
          <Card>
            <CardHeader>
              <CardTitle>Class X Marksheet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input type="file" accept="application/pdf,image/*" />
            </CardContent>
          </Card>

          {/* Class XII Marksheet */}
          <Card>
            <CardHeader>
              <CardTitle>Class XII Marksheet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input type="file" accept="application/pdf,image/*" />
            </CardContent>
          </Card>

          {/* Aadhaar Card */}
          <Card>
            <CardHeader>
              <CardTitle>Aadhaar Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input type="file" accept="application/pdf,image/*" />
            </CardContent>
          </Card>

          {/* Other Government Document */}
          <Card>
            <CardHeader>
              <CardTitle>Other Government Document</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Document" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pan">PAN Card</SelectItem>
                    <SelectItem value="voter">Voter ID</SelectItem>
                    <SelectItem value="driving">Driving License</SelectItem>
                    <SelectItem value="ration">Ration Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Upload Document</Label>
                <Input type="file" accept="application/pdf,image/*" />
              </div>
            </CardContent>
          </Card>

          {/* Domicile / Caste / Birth Certificate */}
          <Card>
            <CardHeader>
              <CardTitle>Domicile / Caste / Birth Certificate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input type="file" accept="application/pdf,image/*" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* STEP 5 – Confirmation */}
      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Confirmation</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
            <p className="text-lg font-semibold">
              Form Submitted Successfully!
            </p>
            <p className="text-gray-600">
              Your Student Unique ID has been generated:{" "}
              <span className="font-bold">STU-2025-001</span>
            </p>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline">Save & Continue Later</Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={step === totalSteps}
            className="text-white"
          >
            {step === totalSteps ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewAdmission;
