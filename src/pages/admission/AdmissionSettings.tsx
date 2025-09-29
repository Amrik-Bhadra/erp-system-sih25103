"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Search, Save, Plus, Trash2, Edit, Users, Calendar, Settings as SettingsIcon, Download, Upload } from "lucide-react";

export function AdmissionSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [admissionCriteria, setAdmissionCriteria] = useState({
    startDate: "2024-01-01",
    endDate: "2024-07-31",
    minMarks: 60,
    applicationFee: 1000,
    maxApplications: 3,
    autoApprove: false
  });

  const [userRoles, setUserRoles] = useState([
    { id: 1, name: "Admission Officer", permissions: ["applications", "merit", "approval"], users: 3 },
    { id: 2, name: "Admission Clerk", permissions: ["applications", "verification"], users: 5 },
    { id: 3, name: "Counseling Manager", permissions: ["merit", "counseling"], users: 2 },
    { id: 4, name: "View Only", permissions: ["reports"], users: 4 },
  ]);

  const [documentRequirements, setDocumentRequirements] = useState([
    { id: 1, name: "10th Marksheet", required: true, format: "PDF/Image" },
    { id: 2, name: "12th Marksheet", required: true, format: "PDF/Image" },
    { id: 3, name: "Transfer Certificate", required: true, format: "PDF" },
    { id: 4, name: "ID Proof", required: true, format: "PDF/Image" },
    { id: 5, name: "Passport Photo", required: true, format: "Image" },
    { id: 6, name: "Income Certificate", required: false, format: "PDF" },
  ]);

  const [reservationRules, setReservationRules] = useState([
    { category: "General", percentage: 45, seats: 54 },
    { category: "OBC", percentage: 30, seats: 36 },
    { category: "SC", percentage: 15, seats: 18 },
    { category: "ST", percentage: 8, seats: 10 },
    { category: "Other", percentage: 2, seats: 2 },
  ]);

  const [newRole, setNewRole] = useState({
    name: "",
    basePermissions: ""
  });

  const handleSaveSettings = () => {
    alert("Admission settings saved successfully!");
  };

  const handleAddDocument = () => {
    alert("Adding new document requirement...");
  };

  const handleToggleDocument = (docId: number) => {
    setDocumentRequirements(docs =>
      docs.map(doc =>
        doc.id === docId ? { ...doc, required: !doc.required } : doc
      )
    );
  };

  const handleCreateRole = () => {
    if (newRole.name) {
      alert(`New role created: ${newRole.name}`);
      setNewRole({ name: "", basePermissions: "" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admission Settings</h1>
          <p className="text-muted-foreground">Configure admission rules and system settings</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="reservation">Reservation</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admission Timeline</CardTitle>
              <CardDescription>Configure admission cycle dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={admissionCriteria.startDate}
                    onChange={(e) => setAdmissionCriteria({...admissionCriteria, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={admissionCriteria.endDate}
                    onChange={(e) => setAdmissionCriteria({...admissionCriteria, endDate: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admission Criteria</CardTitle>
              <CardDescription>Set minimum requirements and rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Marks (%)</label>
                  <Input
                    type="number"
                    value={admissionCriteria.minMarks}
                    onChange={(e) => setAdmissionCriteria({...admissionCriteria, minMarks: parseInt(e.target.value) || 0})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum percentage required for application
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Application Fee (₹)</label>
                  <Input
                    type="number"
                    value={admissionCriteria.applicationFee}
                    onChange={(e) => setAdmissionCriteria({...admissionCriteria, applicationFee: parseInt(e.target.value) || 0})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Non-refundable application fee
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Applications</label>
                  <Input
                    type="number"
                    value={admissionCriteria.maxApplications}
                    onChange={(e) => setAdmissionCriteria({...admissionCriteria, maxApplications: parseInt(e.target.value) || 0})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum courses a student can apply for
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Auto-approval</label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={admissionCriteria.autoApprove}
                      onCheckedChange={(checked) => setAdmissionCriteria({...admissionCriteria, autoApprove: checked})}
                    />
                    <span className="text-sm">Automatically approve eligible applications</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Integration */}
          <Card>
            <CardHeader>
              <CardTitle>System Integration</CardTitle>
              <CardDescription>Configure integration with other modules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Student Portal Sync</div>
                  <div className="text-sm text-muted-foreground">
                    Auto-create student profiles after approval
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Hostel Module Sync</div>
                  <div className="text-sm text-muted-foreground">
                    Sync hostel preferences with hostel module
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Finance Module Sync</div>
                  <div className="text-sm text-muted-foreground">
                    Auto-create fee records after approval
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Settings Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Requirements</CardTitle>
              <CardDescription>Manage required documents for admission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Button onClick={handleAddDocument}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Document
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentRequirements.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>
                        <Switch
                          checked={doc.required}
                          onCheckedChange={() => handleToggleDocument(doc.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.format}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Document Upload Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Settings</CardTitle>
              <CardDescription>Configure document upload parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max File Size (MB)</label>
                  <Input type="number" defaultValue="10" />
                  <p className="text-xs text-muted-foreground">Maximum size per document</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Allowed Formats</label>
                  <Input defaultValue="PDF, JPG, PNG" />
                  <p className="text-xs text-muted-foreground">Comma separated formats</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reservation Settings Tab */}
        <TabsContent value="reservation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reservation Rules</CardTitle>
              <CardDescription>Configure seat reservation percentages</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Seats (120 Total)</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservationRules.map((rule, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{rule.category}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={rule.percentage}
                          onChange={(e) => {
                            const newRules = [...reservationRules];
                            newRules[index].percentage = parseInt(e.target.value) || 0;
                            setReservationRules(newRules);
                          }}
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>{rule.seats}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>Total Allocation:</strong> {reservationRules.reduce((sum, rule) => sum + rule.percentage, 0)}%
                  {reservationRules.reduce((sum, rule) => sum + rule.percentage, 0) !== 100 && (
                    <span className="text-red-600 ml-2"> (Should total 100%)</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cutoff Rules */}
          <Card>
            <CardHeader>
              <CardTitle>Category-wise Cutoff</CardTitle>
              <CardDescription>Set minimum cutoff marks by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reservationRules.map((rule, index) => (
                  <div key={index} className="space-y-2">
                    <label className="text-sm font-medium">{rule.category} Cutoff (%)</label>
                    <Input type="number" placeholder="Enter cutoff marks" />
                  </div>
                ))}
              </div>
              <Button className="mt-4">
                <Save className="w-4 h-4 mr-2" />
                Save Cutoff Rules
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Control Tab */}
        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Access Roles</CardTitle>
              <CardDescription>Manage admission staff access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{role.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((permission, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{role.users} users</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit Permissions
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Add New Role */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Role</CardTitle>
              <CardDescription>Create custom access roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role Name</label>
                  <Input 
                    placeholder="Enter role name" 
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Base Permissions</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={newRole.basePermissions}
                    onChange={(e) => setNewRole({...newRole, basePermissions: e.target.value})}
                  >
                    <option value="">Select base permissions</option>
                    <option value="officer">Admission Officer</option>
                    <option value="clerk">Admission Clerk</option>
                    <option value="counseling">Counseling Manager</option>
                    <option value="view">View Only</option>
                  </select>
                </div>
              </div>
              <Button className="mt-4" onClick={handleCreateRole} disabled={!newRole.name}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Role
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}