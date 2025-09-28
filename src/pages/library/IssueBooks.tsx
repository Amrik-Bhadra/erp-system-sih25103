import { useLibrary } from "../../context/LibraryContext";
import { useState } from "react";

const IssueBooks = () => {
  const { books, issues, setIssues, setBooks } = useLibrary();
  const [student, setStudent] = useState("");
  const [bookId, setBookId] = useState<number | "">("");

  const issueBook = () => {
    if (!student || !bookId) return;
    const book = books.find(b => b.id === bookId);
    if (!book || !book.available) return;

    setIssues([...issues, { id: Date.now(), student, book: book.title, date: new Date().toLocaleDateString() }]);
    setBooks(books.map(b => (b.id === bookId ? { ...b, available: false } : b)));
    setStudent("");
    setBookId("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Issue Books</h1>
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Student Name"
          value={student}
          onChange={e => setStudent(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <select
          value={bookId}
          onChange={e => setBookId(Number(e.target.value))}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Select Book</option>
          {books.filter(b => b.available).map(b => (
            <option key={b.id} value={b.id}>
              {b.title} - {b.author}
            </option>
          ))}
        </select>
        <button onClick={issueBook} className="bg-blue-600 text-white px-4 rounded">
          Issue
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border p-2">Student</th>
            <th className="border p-2">Book</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue.id} className="odd:bg-white even:bg-gray-100 dark:even:bg-gray-800">
              <td className="border p-2">{issue.student}</td>
              <td className="border p-2">{issue.book}</td>
              <td className="border p-2">{issue.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueBooks;
