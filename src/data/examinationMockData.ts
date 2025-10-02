export interface Exam {
  id: string;
  name: string;
  type: 'semester' | 'mid-term' | 'practical' | 'supplementary';
  course: string;
  date: Date;
  time: string;
  duration: string;
  venue: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  invigilators: string[];
  totalStudents: number;
}

export interface AdmitCard {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  examId: string;
  examName: string;
  venue: string;
  seatNumber: string;
  generatedDate: Date;
  status: 'generated' | 'downloaded' | 'pending';
  feeStatus: 'paid' | 'pending';
}

export interface QuestionPaper {
  id: string;
  examId: string;
  examName: string;
  subject: string;
  uploadedBy: string;
  uploadDate: Date;
  status: 'uploaded' | 'reviewed' | 'approved' | 'rejected';
  fileSize: string;
  accessLevel: 'restricted' | 'approved-only';
}

export interface Evaluation {
  id: string;
  examId: string;
  examName: string;
  subject: string;
  evaluator: string;
  totalStudents: number;
  evaluated: number;
  status: 'pending' | 'in-progress' | 'completed';
  deadline: Date;
}

export interface Result {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  examId: string;
  examName: string;
  marks: number;
  grade: string;
  gpa: number;
  status: 'pass' | 'fail' | 'supplementary';
  published: boolean;
}

export interface ExaminationStats {
  upcomingExams: number;
  pendingEvaluations: number;
  resultsPublished: number;
  admitCardsGenerated: number;
  totalExams: number;
  averageGPA: number;
}

export const mockExams: Exam[] = [
  {
    id: '1',
    name: 'Semester 6 - Final Exams',
    type: 'semester',
    course: 'B.Tech Computer Science',
    date: new Date('2024-03-15'),
    time: '09:00 AM - 12:00 PM',
    duration: '3 hours',
    venue: 'Main Hall A',
    status: 'scheduled',
    invigilators: ['Dr. Sharma', 'Prof. Gupta'],
    totalStudents: 120
  },
  {
    id: '2',
    name: 'Data Structures Mid-Term',
    type: 'mid-term',
    course: 'B.Tech Computer Science',
    date: new Date('2024-02-20'),
    time: '02:00 PM - 04:00 PM',
    duration: '2 hours',
    venue: 'Lab Building 2',
    status: 'completed',
    invigilators: ['Prof. Kumar'],
    totalStudents: 85
  },
  {
    id: '3',
    name: 'Software Engineering Practical',
    type: 'practical',
    course: 'B.Tech Computer Science',
    date: new Date('2024-03-10'),
    time: '10:00 AM - 01:00 PM',
    duration: '3 hours',
    venue: 'Computer Lab 3',
    status: 'scheduled',
    invigilators: ['Dr. Patel', 'Dr. Singh'],
    totalStudents: 60
  }
];

export const mockAdmitCards: AdmitCard[] = [
  {
    id: '1',
    studentId: 'S2024001',
    studentName: 'Aarav Sharma',
    rollNumber: '2024001',
    examId: '1',
    examName: 'Semester 6 - Final Exams',
    venue: 'Main Hall A',
    seatNumber: 'A-15',
    generatedDate: new Date('2024-03-01'),
    status: 'generated',
    feeStatus: 'paid'
  },
  {
    id: '2',
    studentId: 'S2024002',
    studentName: 'Priya Patel',
    rollNumber: '2024002',
    examId: '1',
    examName: 'Semester 6 - Final Exams',
    venue: 'Main Hall A',
    seatNumber: 'A-16',
    generatedDate: new Date('2024-03-01'),
    status: 'downloaded',
    feeStatus: 'paid'
  }
];

export const mockQuestionPapers: QuestionPaper[] = [
  {
    id: '1',
    examId: '1',
    examName: 'Semester 6 - Final Exams',
    subject: 'Advanced Algorithms',
    uploadedBy: 'Dr. Sharma',
    uploadDate: new Date('2024-03-05'),
    status: 'approved',
    fileSize: '2.5 MB',
    accessLevel: 'approved-only'
  },
  {
    id: '2',
    examId: '2',
    examName: 'Data Structures Mid-Term',
    subject: 'Data Structures',
    uploadedBy: 'Prof. Kumar',
    uploadDate: new Date('2024-02-15'),
    status: 'reviewed',
    fileSize: '1.8 MB',
    accessLevel: 'restricted'
  }
];

export const mockEvaluations: Evaluation[] = [
  {
    id: '1',
    examId: '2',
    examName: 'Data Structures Mid-Term',
    subject: 'Data Structures',
    evaluator: 'Dr. Sharma',
    totalStudents: 85,
    evaluated: 65,
    status: 'in-progress',
    deadline: new Date('2024-02-28')
  },
  {
    id: '2',
    examId: '1',
    examName: 'Semester 6 - Final Exams',
    subject: 'Advanced Algorithms',
    evaluator: 'Prof. Gupta',
    totalStudents: 120,
    evaluated: 0,
    status: 'pending',
    deadline: new Date('2024-03-25')
  }
];

export const mockResults: Result[] = [
  {
    id: '1',
    studentId: 'S2024001',
    studentName: 'Aarav Sharma',
    rollNumber: '2024001',
    examId: '2',
    examName: 'Data Structures Mid-Term',
    marks: 85,
    grade: 'A',
    gpa: 9.0,
    status: 'pass',
    published: true
  },
  {
    id: '2',
    studentId: 'S2024002',
    studentName: 'Priya Patel',
    rollNumber: '2024002',
    examId: '2',
    examName: 'Data Structures Mid-Term',
    marks: 42,
    grade: 'D',
    gpa: 6.0,
    status: 'fail',
    published: true
  }
];

export const mockExaminationStats: ExaminationStats = {
  upcomingExams: 3,
  pendingEvaluations: 5,
  resultsPublished: 12,
  admitCardsGenerated: 245,
  totalExams: 45,
  averageGPA: 8.2
};