export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: 'available' | 'borrowed' | 'reserved' | 'maintenance';
  publishedYear: number;
  publisher: string;
  location: string;
  totalCopies: number;
  availableCopies: number;
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  status: 'active' | 'inactive';
  maxBooksAllowed: number;
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  issueDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'issued' | 'returned' | 'overdue';
  fineAmount: number;
  renewed: boolean;
}

export interface Fine {
  id: string;
  studentId: string;
  studentName: string;
  borrowRecordId: string;
  amount: number;
  reason: 'overdue' | 'damaged' | 'lost';
  status: 'pending' | 'paid';
  createdDate: Date;
  paidDate?: Date;
}

export interface Recommendation {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  requestedBy: string;
  requestType: 'faculty' | 'student';
  status: 'pending' | 'approved' | 'rejected';
  requestDate: Date;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'holiday' | 'new-arrival';
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export interface LibraryStats {
  totalBooks: number;
  borrowedBooks: number;
  overdueBooks: number;
  availableBooks: number;
  todaysFines: number;
  monthlyFines: number;
  totalStudents: number;
}