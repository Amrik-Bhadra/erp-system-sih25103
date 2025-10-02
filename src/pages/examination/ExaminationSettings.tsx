"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Plus, Trash2, Calculator, Award, Clock, Settings } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface GradingScale {
  grade: string;
  minMarks: number;
  maxMarks: number;
  gradePoints: number;
  description: string;
}

interface ExamType {
  id: string;
  name: string;
  code: string;
  weightage: number;
  duration: number;
  isActive: boolean;
}

export function ExaminationSettings() {
  const [gradingScales, setGradingScales] = useState<GradingScale[]>([
    { grade: 'A+', minMarks: 90, maxMarks: 100, gradePoints: 10.0, description: 'Outstanding' },
    { grade: 'A', minMarks: 80, maxMarks: 89, gradePoints: 9.0, description: 'Excellent' },
    { grade: 'B+', minMarks: 70, maxMarks: 79, gradePoints: 8.0, description: 'Very Good' },
    { grade: 'B', minMarks: 60, maxMarks: 69, gradePoints: 7.0, description: 'Good' },
    { grade: 'C', minMarks: 50, maxMarks: 59, gradePoints: 6.0, description: 'Average' },
    { grade: 'D', minMarks: 40, maxMarks: 49, gradePoints: 5.0, description: 'Pass' },
    { grade: 'F', minMarks: 0, maxMarks: 39, gradePoints: 0.0, description: 'Fail' }
  ]);

  const [examTypes, setExamTypes] = useState<ExamType[]>([
    { id: '1', name: 'Semester Final', code: 'SEM', weightage: 60, duration: 180, isActive: true },
    { id: '2', name: 'Mid-Term', code: 'MID', weightage: 20, duration: 90, isActive: true },
    { id: '3', name: 'Practical', code: 'PRAC', weightage: 20, duration: 120, isActive: true },
    { id: '4', name: 'Supplementary', code: 'SUPP', weightage: 100, duration: 180, isActive: true }
  ]);

  const [systemSettings, setSystemSettings] = useState({
    autoPublishResults: false,
    allowRevaluation: true,
    enableOnlineSubmission: true,
    strictDeadlineEnforcement: true,
    resultPublicationDelay: 24,
    maxRevaluationAttempts: 1,
    minAttendanceRequired: 75,
    graceMarksAllowed: 5
  });

  const [newGrade, setNewGrade] = useState({
    grade: '',
    minMarks: 0,
    maxMarks: 0,
    gradePoints: 0,
    description: ''
  });

  const [newExamType, setNewExamType] = useState({
    name: '',
    code: '',
    weightage: 0,
    duration: 0
  });

  const handleAddGrade = () => {
    if (newGrade.grade && newGrade.description) {
      setGradingScales([...gradingScales, { ...newGrade }]);
      setNewGrade({ grade: '', minMarks: 0, maxMarks: 0, gradePoints: 0, description: '' });
    }
  };

  const handleRemoveGrade = (index: number) => {
    setGradingScales(gradingScales.filter((_, i) => i !== index));
  };

  const handleAddExamType = () => {
    if (newExamType.name && newExamType.code) {
      setExamTypes([...examTypes, { 
        ...newExamType, 
        id: (examTypes.length + 1).toString(),
        isActive: true 
      }]);
      setNewExamType({ name: '', code: '', weightage: 0, duration: 0 });
    }
  };

  const handleToggleExamType = (id: string) => {
    setExamTypes(examTypes.map(type =>
      type.id === id ? { ...type, isActive: !type.isActive } : type
    ));
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Examination Settings</h1>
          <p className="text-muted-foreground">Configure grading system and examination parameters</p>
        </div>
        <Button onClick={handleSaveSettings} className="text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="grading" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="grading">Grading System</TabsTrigger>
          <TabsTrigger value="exam-types">Exam Types</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
          <TabsTrigger value="rules">Exam Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="grading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Grading Scale Configuration</CardTitle>
              <CardDescription>Define marks range, grades, and grade points</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Grade</TableHead>
                    <TableHead>Marks Range</TableHead>
                    <TableHead>Grade Points</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gradingScales.map((scale, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{scale.grade}</TableCell>
                      <TableCell>{scale.minMarks} - {scale.maxMarks}</TableCell>
                      <TableCell>{scale.gradePoints}</TableCell>
                      <TableCell>{scale.description}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveGrade(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Add New Grade */}
              <div className="mt-6 p-4 border rounded-lg">
                <h4 className="font-semibold mb-4">Add New Grade</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <Input
                    placeholder="Grade"
                    value={newGrade.grade}
                    onChange={(e) => setNewGrade({...newGrade, grade: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Min Marks"
                    value={newGrade.minMarks}
                    onChange={(e) => setNewGrade({...newGrade, minMarks: parseInt(e.target.value) || 0})}
                  />
                  <Input
                    type="number"
                    placeholder="Max Marks"
                    value={newGrade.maxMarks}
                    onChange={(e) => setNewGrade({...newGrade, maxMarks: parseInt(e.target.value) || 0})}
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Grade Points"
                    value={newGrade.gradePoints}
                    onChange={(e) => setNewGrade({...newGrade, gradePoints: parseFloat(e.target.value) || 0})}
                  />
                  <Input
                    placeholder="Description"
                    value={newGrade.description}
                    onChange={(e) => setNewGrade({...newGrade, description: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddGrade} className="mt-4 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Grade
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* GPA Calculation Rules */}
          <Card>
            <CardHeader>
              <CardTitle>GPA Calculation Rules</CardTitle>
              <CardDescription>Configure how GPA and CGPA are calculated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Credit-based Calculation</p>
                      <p className="text-sm text-muted-foreground">Use credit hours for GPA calculation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Round GPA to 2 decimals</p>
                      <p className="text-sm text-muted-foreground">Round final GPA values</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Passing GPA</label>
                    <Input type="number" step="0.1" defaultValue="5.0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Maximum GPA</label>
                    <Input type="number" step="0.1" defaultValue="10.0" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exam-types" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Types & Weightage</CardTitle>
              <CardDescription>Configure different examination types and their weightage</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Weightage (%)</TableHead>
                    <TableHead>Duration (mins)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell className="font-medium">{type.name}</TableCell>
                      <TableCell>{type.code}</TableCell>
                      <TableCell>{type.weightage}%</TableCell>
                      <TableCell>{type.duration}</TableCell>
                      <TableCell>
                        <Badge variant={type.isActive ? "default" : "secondary"} className="text-white">
                          {type.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Switch
                            checked={type.isActive}
                            onCheckedChange={() => handleToggleExamType(type.id)}
                          />
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Add New Exam Type */}
              <div className="mt-6 p-4 border rounded-lg">
                <h4 className="font-semibold mb-4">Add New Exam Type</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Exam Type Name"
                    value={newExamType.name}
                    onChange={(e) => setNewExamType({...newExamType, name: e.target.value})}
                  />
                  <Input
                    placeholder="Code"
                    value={newExamType.code}
                    onChange={(e) => setNewExamType({...newExamType, code: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Weightage %"
                    value={newExamType.weightage}
                    onChange={(e) => setNewExamType({...newExamType, weightage: parseInt(e.target.value) || 0})}
                  />
                  <Input
                    type="number"
                    placeholder="Duration (mins)"
                    value={newExamType.duration}
                    onChange={(e) => setNewExamType({...newExamType, duration: parseInt(e.target.value) || 0})}
                  />
                </div>
                <Button onClick={handleAddExamType} className="mt-4 text-white" >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Exam Type
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic examination system configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-publish Results</p>
                    <p className="text-sm text-muted-foreground">Automatically publish results after processing</p>
                  </div>
                  <Switch
                    checked={systemSettings.autoPublishResults}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, autoPublishResults: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Revaluation</p>
                    <p className="text-sm text-muted-foreground">Enable revaluation applications</p>
                  </div>
                  <Switch
                    checked={systemSettings.allowRevaluation}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, allowRevaluation: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Online Submission</p>
                    <p className="text-sm text-muted-foreground">Enable online answer script submission</p>
                  </div>
                  <Switch
                    checked={systemSettings.enableOnlineSubmission}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, enableOnlineSubmission: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Strict Deadlines</p>
                    <p className="text-sm text-muted-foreground">Enforce strict deadline policies</p>
                  </div>
                  <Switch
                    checked={systemSettings.strictDeadlineEnforcement}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, strictDeadlineEnforcement: checked})
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Numerical Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Numerical Parameters</CardTitle>
                <CardDescription>Configure numerical limits and thresholds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Result Publication Delay (hours)</label>
                  <Input
                    type="number"
                    value={systemSettings.resultPublicationDelay}
                    onChange={(e) => 
                      setSystemSettings({...systemSettings, resultPublicationDelay: parseInt(e.target.value) || 0})
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Revaluation Attempts</label>
                  <Input
                    type="number"
                    value={systemSettings.maxRevaluationAttempts}
                    onChange={(e) => 
                      setSystemSettings({...systemSettings, maxRevaluationAttempts: parseInt(e.target.value) || 0})
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Attendance Required (%)</label>
                  <Input
                    type="number"
                    value={systemSettings.minAttendanceRequired}
                    onChange={(e) => 
                      setSystemSettings({...systemSettings, minAttendanceRequired: parseInt(e.target.value) || 0})
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grace Marks Allowed</label>
                  <Input
                    type="number"
                    value={systemSettings.graceMarksAllowed}
                    onChange={(e) => 
                      setSystemSettings({...systemSettings, graceMarksAllowed: parseInt(e.target.value) || 0})
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Examination Rules & Policies</CardTitle>
              <CardDescription>Define examination rules and code of conduct</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">General Examination Rules</h4>
                  <Textarea
                    placeholder="Enter general examination rules..."
                    rows={6}
                    defaultValue="1. Students must carry their admit card to the examination hall.
2. Electronic devices are strictly prohibited.
3. Students must arrive 30 minutes before the exam start time.
4. Malpractice will lead to strict disciplinary action."
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Code of Conduct</h4>
                  <Textarea
                    placeholder="Enter code of conduct for examinations..."
                    rows={6}
                    defaultValue="1. Maintain silence in the examination hall.
2. Follow invigilator instructions at all times.
3. Do not communicate with other students during the exam.
4. Raise your hand if you need assistance."
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Malpractice Policies</h4>
                  <Textarea
                    placeholder="Enter malpractice policies and consequences..."
                    rows={6}
                    defaultValue="1. Copying from others: Cancellation of paper and suspension for one semester.
2. Using electronic devices: Immediate expulsion from the examination hall.
3. Impersonation: Rustication from the institution.
4. Possession of unauthorized material: Zero marks in the subject."
                  />
                </div>

               <Button className="text-white">
  <Save className="w-4 h-4 mr-2" />
  Save Rules
</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}