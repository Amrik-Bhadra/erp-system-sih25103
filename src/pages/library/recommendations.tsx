"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Search, Book, User, CheckCircle, XCircle, Clock, Send } from "lucide-react";
import { mockRecommendations } from "@/data/mockData";

export function Recommendations() {
  const [activeTab, setActiveTab] = useState("requests");
  const [searchTerm, setSearchTerm] = useState("");
  const [newRequest, setNewRequest] = useState({
    title: "",
    author: "",
    isbn: "",
    reason: "",
    requestType: "faculty" as "faculty" | "student"
  });

  const filteredRequests = mockRecommendations.filter(request =>
    request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingRequests = mockRecommendations.filter(req => req.status === 'pending');
  const approvedRequests = mockRecommendations.filter(req => req.status === 'approved');
  const rejectedRequests = mockRecommendations.filter(req => req.status === 'rejected');

  const handleApprove = (requestId: string) => {
    alert(`Request approved! ID: ${requestId}`);
  };

  const handleReject = (requestId: string) => {
    alert(`Request rejected! ID: ${requestId}`);
  };

  const handleSubmitRequest = () => {
    if (newRequest.title && newRequest.author) {
      alert(`Recommendation submitted!\nTitle: ${newRequest.title}\nAuthor: ${newRequest.author}`);
      setNewRequest({ title: "", author: "", isbn: "", reason: "", requestType: "faculty" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Recommendations & Requests</h1>
          <p className="text-muted-foreground">Manage book recommendations and purchase requests</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requests">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="new">New Recommendation</TabsTrigger>
          <TabsTrigger value="workflow">Approval Workflow</TabsTrigger>
        </TabsList>

        {/* All Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Recommendation Requests</CardTitle>
              <CardDescription>Complete list of all book recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests by title, author, or requester..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.title}</TableCell>
                      <TableCell>{request.author}</TableCell>
                      <TableCell>{request.requestedBy}</TableCell>
                      <TableCell>
                        <Badge variant={request.requestType === 'faculty' ? 'default' : 'secondary'} className="text-white">
                          {request.requestType}
                        </Badge>
                      </TableCell>
                      <TableCell>{request.requestDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          request.status === 'approved' ? 'default' :
                          request.status === 'rejected' ? 'destructive' : 'secondary'
                        } className="text-white">
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleApprove(request.id)}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleReject(request.id)}>
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Approval Tab */}
        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval Requests</CardTitle>
              <CardDescription>Requests awaiting librarian approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{request.title}</h4>
                          <p className="text-sm text-muted-foreground">by {request.author}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {request.requestedBy}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {request.requestDate.toLocaleDateString()}
                            </span>
                            <Badge variant={request.requestType === 'faculty' ? 'default' : 'secondary'} className="text-white">
                              {request.requestType}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleApprove(request.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleReject(request.id)}>
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingRequests.length}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{approvedRequests.length}</div>
                <p className="text-xs text-muted-foreground">
                  Forwarded to procurement
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rejectedRequests.length}</div>
                <p className="text-xs text-muted-foreground">
                  Not approved
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* New Recommendation Tab */}
        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Recommendation</CardTitle>
              <CardDescription>Recommend new books for library acquisition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Book Title *</label>
                  <Input
                    placeholder="Enter book title"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Author *</label>
                  <Input
                    placeholder="Enter author name"
                    value={newRequest.author}
                    onChange={(e) => setNewRequest({...newRequest, author: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ISBN (Optional)</label>
                  <Input
                    placeholder="Enter ISBN number"
                    value={newRequest.isbn}
                    onChange={(e) => setNewRequest({...newRequest, isbn: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Request Type</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newRequest.requestType}
                    onChange={(e) => setNewRequest({...newRequest, requestType: e.target.value as "faculty" | "student"})}
                  >
                    <option value="faculty">Faculty Recommendation</option>
                    <option value="student">Student Request</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Reason for Recommendation</label>
                <Textarea
                  placeholder="Explain why this book should be added to the library..."
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                  rows={4}
                />
              </div>

              <Button onClick={handleSubmitRequest} disabled={!newRequest.title || !newRequest.author}>
                <Send className="w-4 h-4 mr-2" />
                Submit Recommendation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approval Workflow Tab */}
        <TabsContent value="workflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Approval Workflow</CardTitle>
              <CardDescription>Book recommendation approval process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Workflow Steps */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Request Submission</h4>
                      <p className="text-sm text-muted-foreground">Faculty/Student submits recommendation</p>
                    </div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Librarian Review</h4>
                      <p className="text-sm text-muted-foreground">Librarian evaluates the request</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Budget Approval</h4>
                      <p className="text-sm text-muted-foreground">Finance department approves budget</p>
                    </div>
                  </div>
                  <Badge variant="outline">Waiting</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Procurement</h4>
                      <p className="text-sm text-muted-foreground">Book is ordered and added to inventory</p>
                    </div>
                  </div>
                  <Badge variant="outline">Waiting</Badge>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Workflow Notes</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Faculty recommendations are prioritized</li>
                  <li>• Budget availability is checked during approval</li>
                  <li>• Requester is notified at each stage</li>
                  <li>• Average processing time: 2-3 weeks</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Forward to Procurement</CardTitle>
                <CardDescription>Send approved requests to procurement department</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Forward Approved Requests
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generate Report</CardTitle>
                <CardDescription>Create recommendation summary report</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Book className="w-4 h-4 mr-2" />
                  Generate Monthly Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}