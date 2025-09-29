export interface Application {
  id: string;
  applicationNumber: string;
  studentName: string;
  email: string;
  phone: string;
  course: string;
  appliedDate: Date;
  status: 'pending' | 'verified' | 'approved' | 'rejected';
  category: string;
  marks: number;
  documents: string[];
  hostelRequired: boolean;
}

export interface MeritList {
  id: string;
  course: string;
  category: string;
  cutoff: number;
  generatedDate: Date;
  students: MeritStudent[];
}

export interface MeritStudent {
  id: string;
  applicationId: string;
  studentName: string;
  marks: number;
  rank: number;
  status: 'selected' | 'waitlisted' | 'rejected';
  category: string;
}

export interface CounselingSession {
  id: string;
  course: string;
  date: Date;
  venue: string;
  maxStudents: number;
  registeredStudents: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface AdmissionStats {
  totalApplications: number;
  pendingReview: number;
  approved: number;
  rejected: number;
  upcomingCounseling: number;
  totalFeesCollected: number;
  conversionRate: number;
}

export const mockApplications: Application[] = [
  {
    id: '1',
    applicationNumber: 'APP2024001',
    studentName: 'Aarav Sharma',
    email: 'aarav.sharma@email.com',
    phone: '+91 9876543210',
    course: 'B.Tech Computer Science',
    appliedDate: new Date('2024-01-15'),
    status: 'verified',
    category: 'General',
    marks: 92.5,
    documents: ['marksheet.pdf', 'id-proof.pdf'],
    hostelRequired: true
  },
  {
    id: '2',
    applicationNumber: 'APP2024002',
    studentName: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 9876543211',
    course: 'B.Tech Electrical',
    appliedDate: new Date('2024-01-16'),
    status: 'pending',
    category: 'OBC',
    marks: 88.0,
    documents: ['marksheet.pdf'],
    hostelRequired: false
  },
  {
    id: '3',
    applicationNumber: 'APP2024003',
    studentName: 'Rohan Kumar',
    email: 'rohan.kumar@email.com',
    phone: '+91 9876543212',
    course: 'B.Tech Mechanical',
    appliedDate: new Date('2024-01-17'),
    status: 'approved',
    category: 'SC',
    marks: 85.5,
    documents: ['marksheet.pdf', 'id-proof.pdf', 'transfer-certificate.pdf'],
    hostelRequired: true
  }
];

export const mockMeritLists: MeritList[] = [
  {
    id: '1',
    course: 'B.Tech Computer Science',
    category: 'General',
    cutoff: 90.0,
    generatedDate: new Date('2024-01-20'),
    students: [
      {
        id: '1',
        applicationId: '1',
        studentName: 'Aarav Sharma',
        marks: 92.5,
        rank: 1,
        status: 'selected',
        category: 'General'
      }
    ]
  }
];

export const mockCounselingSessions: CounselingSession[] = [
  {
    id: '1',
    course: 'B.Tech Computer Science',
    date: new Date('2024-02-01'),
    venue: 'Main Auditorium',
    maxStudents: 100,
    registeredStudents: 75,
    status: 'scheduled'
  }
];

export const mockAdmissionStats: AdmissionStats = {
  totalApplications: 1245,
  pendingReview: 234,
  approved: 567,
  rejected: 123,
  upcomingCounseling: 3,
  totalFeesCollected: 1250000,
  conversionRate: 45.5
};