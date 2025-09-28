import type { Book, Student, BorrowRecord, Fine, Recommendation, Notice, LibraryStats } from '@/types/library';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '9780262033848',
    category: 'Computer Science',
    status: 'available',
    publishedYear: 2009,
    publisher: 'MIT Press',
    location: 'CS-001',
    totalCopies: 5,
    availableCopies: 3
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '9780132350884',
    category: 'Software Engineering',
    status: 'borrowed',
    publishedYear: 2008,
    publisher: 'Prentice Hall',
    location: 'SE-001',
    totalCopies: 3,
    availableCopies: 0
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    category: 'Literature',
    status: 'available',
    publishedYear: 1925,
    publisher: 'Scribner',
    location: 'LIT-001',
    totalCopies: 8,
    availableCopies: 6
  },
  {
    id: '4',
    title: 'Design Patterns',
    author: 'Erich Gamma',
    isbn: '9780201633610',
    category: 'Computer Science',
    status: 'reserved',
    publishedYear: 1994,
    publisher: 'Addison-Wesley',
    location: 'CS-002',
    totalCopies: 4,
    availableCopies: 2
  }
];

export const mockStudents: Student[] = [
  {
    id: '1',
    rollNumber: '2023001',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    phone: '+1234567890',
    department: 'Computer Science',
    year: '3rd Year',
    status: 'active',
    maxBooksAllowed: 5
  },
  {
    id: '2',
    rollNumber: '2023002',
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    phone: '+1234567891',
    department: 'Electrical Engineering',
    year: '2nd Year',
    status: 'active',
    maxBooksAllowed: 5
  },
  {
    id: '3',
    rollNumber: '2023003',
    name: 'Bob Johnson',
    email: 'bob.johnson@university.edu',
    phone: '+1234567892',
    department: 'Mechanical Engineering',
    year: '4th Year',
    status: 'active',
    maxBooksAllowed: 5
  }
];

export const mockBorrowRecords: BorrowRecord[] = [
  {
    id: '1',
    bookId: '2',
    bookTitle: 'Clean Code',
    studentId: '1',
    studentName: 'John Doe',
    issueDate: new Date('2024-01-15'),
    dueDate: new Date('2024-01-29'),
    status: 'issued',
    fineAmount: 0,
    renewed: false
  },
  {
    id: '2',
    bookId: '3',
    bookTitle: 'The Great Gatsby',
    studentId: '2',
    studentName: 'Jane Smith',
    issueDate: new Date('2024-01-20'),
    dueDate: new Date('2024-02-03'),
    status: 'issued',
    fineAmount: 0,
    renewed: false
  },
  {
    id: '3',
    bookId: '1',
    bookTitle: 'Introduction to Algorithms',
    studentId: '3',
    studentName: 'Bob Johnson',
    issueDate: new Date('2024-01-10'),
    dueDate: new Date('2024-01-24'),
    status: 'overdue',
    fineAmount: 50,
    renewed: true
  }
];

export const mockFines: Fine[] = [
  {
    id: '1',
    studentId: '3',
    studentName: 'Bob Johnson',
    borrowRecordId: '3',
    amount: 50,
    reason: 'overdue',
    status: 'pending',
    createdDate: new Date('2024-01-30')
  },
  {
    id: '2',
    studentId: '1',
    studentName: 'John Doe',
    borrowRecordId: '1',
    amount: 100,
    reason: 'damaged',
    status: 'paid',
    createdDate: new Date('2024-01-25'),
    paidDate: new Date('2024-01-28')
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    requestedBy: 'Dr. Smith',
    requestType: 'faculty',
    status: 'pending',
    requestDate: new Date('2024-01-20')
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    requestedBy: 'Alice Brown',
    requestType: 'student',
    status: 'approved',
    requestDate: new Date('2024-01-18')
  },
  {
    id: '3',
    title: 'Deep Work',
    author: 'Cal Newport',
    requestedBy: 'Prof. Wilson',
    requestType: 'faculty',
    status: 'rejected',
    requestDate: new Date('2024-01-22')
  }
];

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Library Holiday',
    content: 'Library will be closed on Republic Day, January 26th',
    type: 'holiday',
    startDate: new Date('2024-01-26'),
    isActive: true
  },
  {
    id: '2',
    title: 'New Arrivals',
    content: 'New computer science books have been added to the collection',
    type: 'new-arrival',
    startDate: new Date('2024-01-15'),
    isActive: true
  },
  {
    id: '3',
    title: 'System Maintenance',
    content: 'Library system will be down for maintenance on Sunday from 2-4 AM',
    type: 'warning',
    startDate: new Date('2024-01-28'),
    endDate: new Date('2024-01-28'),
    isActive: true
  }
];

export const mockStats: LibraryStats = {
  totalBooks: 1250,
  borrowedBooks: 342,
  overdueBooks: 23,
  availableBooks: 908,
  todaysFines: 1250,
  monthlyFines: 18750,
  totalStudents: 2450
};