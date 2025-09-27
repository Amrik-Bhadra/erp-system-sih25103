"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  catalogueData,
  subjects,
  currentIssuesData,
  historyData,
  finesData,
  digitalLibraryData,
  types,
} from "@/utils/dataProvider";

const StudentLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredCatalogue = catalogueData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "All" || item.subject === selectedSubject;
    const matchesType = selectedType === "All" || item.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div className="space-y-4">
      <Tabs defaultValue="issueBook" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="issueBook">Issue Book</TabsTrigger>
          <TabsTrigger value="issues">Current Issues</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="fines">Due Dates & Fines</TabsTrigger>
          <TabsTrigger value="digital">Digital Library</TabsTrigger>
        </TabsList>

        {/* Issue Book Tab */}
        <TabsContent value="issueBook">
          {/* Search + Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <input
              type="text"
              placeholder="Search by title or author..."
              className="border-2 border-gray-100/20 rounded-md px-3 py-2 flex-1 min-w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-hidden rounded-md border border-gray-100/20">
            <Table className="mb-0">
              <TableHeader>
                <TableRow className="bg-gray-100/10">
                  <TableHead className="text-center">S.No</TableHead>
                  <TableHead className="text-center">Title</TableHead>
                  <TableHead className="text-center">Author</TableHead>
                  <TableHead className="text-center">Type</TableHead>
                  <TableHead className="text-center">Subject</TableHead>
                  <TableHead className="text-center">Availability</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCatalogue.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{i + 1}</TableCell>
                    <TableCell className="text-center">{item.title}</TableCell>
                    <TableCell className="text-center">{item.author}</TableCell>
                    <TableCell className="text-center">{item.type}</TableCell>
                    <TableCell className="text-center">
                      {item.subject}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`px-3 py-1 rounded text-white ${
                          item.availability === "Available"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item.availability}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.availability === "Available" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-white"
                        >
                          Reserve
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-white"
                        >
                          View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Current Issues Tab */}
        <TabsContent value="issues">
          <div className="overflow-hidden rounded-md border border-gray-100/20">
            <Table className="mb-0">
              <TableHeader>
                <TableRow className="bg-gray-100/10">
                  <TableHead className="text-center">S.No</TableHead>
                  <TableHead className="text-center">Title</TableHead>
                  <TableHead className="text-center">Author</TableHead>
                  <TableHead className="text-center">Borrow Date</TableHead>
                  <TableHead className="text-center">Due Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentIssuesData.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{i + 1}</TableCell>
                    <TableCell className="text-center">{item.title}</TableCell>
                    <TableCell className="text-center">{item.author}</TableCell>
                    <TableCell className="text-center">
                      {item.borrowDate}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.dueDate}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`px-3 py-1 rounded text-white ${
                          item.status === "On Time"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white"
                      >
                        Renew
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white"
                      >
                        Return
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <div className="overflow-hidden rounded-md border border-gray-100/20">
            <Table className="mb-0">
              <TableHeader>
                <TableRow className="bg-gray-100/10">
                  <TableHead className="text-center">S.No</TableHead>
                  <TableHead className="text-center">Title</TableHead>
                  <TableHead className="text-center">Author</TableHead>
                  <TableHead className="text-center">Borrow Date</TableHead>
                  <TableHead className="text-center">Return Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{i + 1}</TableCell>
                    <TableCell className="text-center">{item.title}</TableCell>
                    <TableCell className="text-center">{item.author}</TableCell>
                    <TableCell className="text-center">
                      {item.borrowDate}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.returnDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Fines Tab */}
        <TabsContent value="fines">
          <div className="overflow-hidden rounded-md border border-gray-100/20">
            <Table className="mb-0">
              <TableHeader>
                <TableRow className="bg-gray-100/10">
                  <TableHead className="text-center">S.No</TableHead>
                  <TableHead className="text-center">Title</TableHead>
                  <TableHead className="text-center">Due Date</TableHead>
                  <TableHead className="text-center">Fine Amount</TableHead>
                  <TableHead className="text-center">Payment Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finesData.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{i + 1}</TableCell>
                    <TableCell className="text-center">{item.title}</TableCell>
                    <TableCell className="text-center">
                      {item.dueDate}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.fineAmount}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`px-3 py-1 rounded text-white ${
                          item.paymentStatus === "Paid"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item.paymentStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Digital Library Tab */}
        <TabsContent value="digital">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {digitalLibraryData.map((item) => (
              <div
                key={item.id}
                className="border rounded-md p-4 flex flex-col gap-2 hover:shadow-md transition bg-[#222]"
              >
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-muted-foreground">
                  {item.author}
                </div>
                <div className="text-sm text-muted-foreground">
                  Type: {item.type}
                </div>
                <div className="mt-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-white"
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-white"
                  >
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentLibrary;
