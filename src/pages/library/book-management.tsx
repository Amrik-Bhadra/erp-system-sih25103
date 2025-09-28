"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Book, Plus, Search, Upload, Edit, Archive } from "lucide-react";
import { mockBooks } from "@/data/mockData";

export function BookManagement() {
  const [books] = useState(mockBooks);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'borrowed': return 'secondary';
      case 'reserved': return 'outline';
      case 'maintenance': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Book Management</h1>
          <p className="text-muted-foreground">Manage library books and resources</p>
        </div>
        <div className="flex space-x-2">
          <Button className="text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Book
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Books Inventory</CardTitle>
          <CardDescription>
            Search and manage all books in the library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search books by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(book.status)} className="text-white">
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {book.availableCopies} / {book.totalCopies}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="w-3 h-3 mr-1" />
                        Archive
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Digital Resources Card */}
      <Card>
        <CardHeader>
          <CardTitle>Digital Resources</CardTitle>
          <CardDescription>Manage e-books, journals, and research papers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Digital Resources Management</h3>
            <p className="text-muted-foreground mb-4">
              Upload and manage digital content including e-books, research papers, and journals.
            </p>
            <Button className="text-white">
              <Upload className="w-4 h-4 mr-2" />
              Upload Digital Resource
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}