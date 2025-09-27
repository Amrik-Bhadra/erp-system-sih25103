"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StudentPersonalInfo = () => {
  const [editSection, setEditSection] = useState<string | null>(null);

  const toggleEdit = (section: string) => {
    setEditSection(editSection === section ? null : section);
  };

  return (
    <div className="p-4 space-y-6">
      <Tabs defaultValue="student">
        {/* Tabs Header */}
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="student">Student Information</TabsTrigger>
          <TabsTrigger value="address">Address Information</TabsTrigger>
          <TabsTrigger value="qualification">Qualification Information</TabsTrigger>
        </TabsList>

        {/* Student Info Tab */}
        <TabsContent value="student" className="flex flex-col gap-4">
          {/* Personal Info Card */}
          <Card>
            <CardHeader className="flex justify-between items-center border-b">
              <CardTitle>Personal Information</CardTitle>
              <Button size="sm" onClick={() => toggleEdit("personal")}>
                {editSection === "personal" ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {editSection === "personal" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <Input placeholder="Student Unique ID" defaultValue="123456" />
                  </div>
                  <div>
                    <Input placeholder="Full Name" defaultValue="Amrik Bhadra" />
                  </div>
                  <div>
                    <Input placeholder="Mobile" defaultValue="+91 9876543210" />
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Admission Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Admitted</SelectItem>
                        <SelectItem value="inactive">Not Admitted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input placeholder="Batch" defaultValue="2022-23" />
                  </div>
                  <div>
                    <Input placeholder="Email" defaultValue="amrik@college.edu" />
                  </div>
                  <div>
                    <Input placeholder="DOB" defaultValue="01/01/2000" />
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input placeholder="Nationality" defaultValue="Indian" />
                  </div>
                  <div className="col-span-1 md:col-span-1 flex justify-center items-center">
                    <img
                      src="/student-profile.png"
                      alt="Student Profile"
                      className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">
                      Student Unique Id:
                    </span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">123456</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">
                      Full Name:
                    </span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">Amrik Bhadra</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">
                      Admission Status:
                    </span>{" "}
                    <Badge variant="default" className="bg-green-600 text-white">
                      Admitted
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Batch:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">2022-23</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Mobile:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">+91 9876543210</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Email:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">amrik@college.edu</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">DOB:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">01/01/2000</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Gender:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">Male</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Nationality:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">Indian</span>
                  </div>
                </div>
              )}
            </CardContent>
            {editSection === "personal" && (
              <CardFooter>
                <Button size="sm" className="bg-blue-600 text-white">
                  Save
                </Button>
              </CardFooter>
            )}
          </Card>

          {/* Father Info Card */}
          <Card>
            <CardHeader className="flex justify-between items-center border-b">
              <CardTitle>Father Details</CardTitle>
              <Button size="sm" onClick={() => toggleEdit("father")}>
                {editSection === "father" ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {editSection === "father" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" defaultValue="Mr. XYZ" />
                  <Input placeholder="Mobile" defaultValue="+91 9000000000" />
                  <Input placeholder="Occupation" defaultValue="Engineer" />
                  <Input placeholder="Qualification" defaultValue="Graduate" />
                  <Input placeholder="Income" defaultValue="₹8,00,000" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Name:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">Mr. XYZ</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Mobile:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">+91 9000000000</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Occupation:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">Engineer</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Qualification:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">Graduate</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Income:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">₹8,00,000</span>
                  </div>
                </div>
              )}
            </CardContent>
            {editSection === "father" && (
              <CardFooter>
                <Button size="sm" className="bg-blue-600 text-white">
                  Save
                </Button>
              </CardFooter>
            )}
          </Card>

          {/* Mother Info Card */}
          <Card>
            <CardHeader className="flex justify-between items-center border-b">
              <CardTitle>Mother Details</CardTitle>
              <Button size="sm" onClick={() => toggleEdit("mother")}>
                {editSection === "mother" ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {editSection === "mother" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" defaultValue="Mrs. ABC" />
                  <Input placeholder="Mobile" defaultValue="+91 9111111111" />
                  <Input placeholder="Occupation" defaultValue="Teacher" />
                  <Input placeholder="Qualification" defaultValue="Postgraduate" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Name:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">Mrs. ABC</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Mobile:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">+91 9111111111</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Occupation:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">Teacher</span>
                  </div>
                  <div>
                    <span className="font-medium text-white dark:text-gray-200">Qualification:</span>{" "}
                    <span className="text-gray-400 dark:text-gray-400">Postgraduate</span>
                  </div>
                </div>
              )}
            </CardContent>
            {editSection === "mother" && (
              <CardFooter>
                <Button size="sm" className="bg-blue-600 text-white">
                  Save
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        {/* Address Tab */}
        <TabsContent value="address">
          <Card>
            <CardHeader className="flex justify-between items-center border-b">
              <CardTitle>Address Details</CardTitle>
              <Button size="sm" onClick={() => toggleEdit("address")}>
                {editSection === "address" ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {editSection === "address" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Permanent City" defaultValue="Mumbai" />
                  <Input placeholder="Permanent State" defaultValue="Maharashtra" />
                  <Input placeholder="Permanent Pincode" defaultValue="400001" />
                  <Input placeholder="Permanent Police Station" defaultValue="Colaba" />
                  <Input placeholder="Local City" defaultValue="Pune" />
                  <Input placeholder="Local State" defaultValue="Maharashtra" />
                  <Input placeholder="Local Pincode" defaultValue="411001" />
                  <Input placeholder="Local Police Station" defaultValue="Shivaji Nagar" />
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-white dark:text-gray-200">
                      Permanent Address
                    </h4>
                    <Separator className="mb-2" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-gray-400 dark:text-gray-400">
                        City: Mumbai
                      </div>
                      <div className="text-gray-400 dark:text-gray-400">
                        State: Maharashtra
                      </div>
                      <div className="text-gray-400 dark:text-gray-400">
                        Pincode: 400001
                      </div>
                      <div className="text-gray-400 dark:text-gray-400">
                        Police Station: Colaba
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-white dark:text-gray-200">
                      Local Address
                    </h4>
                    <Separator className="mb-2" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-gray-400 dark:text-gray-400">City: Pune</div>
                      <div className="text-gray-400 dark:text-gray-400">State: Maharashtra</div>
                      <div className="text-gray-400 dark:text-gray-400">Pincode: 411001</div>
                      <div className="text-gray-400 dark:text-gray-400">
                        Police Station: Shivaji Nagar
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            {editSection === "address" && (
              <CardFooter>
                <Button size="sm" className="bg-blue-600 text-white">
                  Save
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        {/* Qualification Tab */}
        <TabsContent value="qualification">
          <Card>
            <CardHeader className="flex justify-between items-center border-b">
              <CardTitle>Qualification Details</CardTitle>
              <Button size="sm" onClick={() => toggleEdit("qualification")}>
                {editSection === "qualification" ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {editSection === "qualification" ? (
                <div className="space-y-4">
                  <Input placeholder="Secondary School" defaultValue="ABC School" />
                  <Input placeholder="Board" defaultValue="CBSE" />
                  <Input placeholder="Year" defaultValue="2016" />
                  <Input placeholder="Percentage" defaultValue="88%" />
                  <Input placeholder="Higher Secondary College" defaultValue="XYZ Junior College" />
                  <Input placeholder="Board" defaultValue="State Board" />
                  <Input placeholder="Year" defaultValue="2018" />
                  <Input placeholder="Percentage" defaultValue="82%" />
                </div>
              ) : (
                <>
                  <h4 className="font-semibold text-sm mb-1 text-white dark:text-gray-200">
                    Secondary / 10th
                  </h4>
                  <Separator className="mb-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400 dark:text-gray-400">
                    <div>School: ABC School</div>
                    <div>Board: CBSE</div>
                    <div>Year: 2016</div>
                    <div>Percentage: 88%</div>
                  </div>

                  <h4 className="font-semibold text-sm mt-4 mb-1 text-white dark:text-gray-200">
                    Higher Secondary / Diploma
                  </h4>
                  <Separator className="mb-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400 dark:text-gray-400">
                    <div>College: XYZ Junior College</div>
                    <div>Board: State Board</div>
                    <div>Year: 2018</div>
                    <div>Percentage: 82%</div>
                  </div>
                </>
              )}
            </CardContent>
            {editSection === "qualification" && (
              <CardFooter>
                <Button size="sm" className="bg-blue-600 text-white">
                  Save
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentPersonalInfo;
