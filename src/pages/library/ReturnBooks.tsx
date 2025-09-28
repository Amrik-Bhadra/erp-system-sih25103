import { useLibrary } from "../../context/LibraryContext";

const ReturnBooks = () => {
  const { books, setBooks, issues, setIssues, returns, setReturns } = useLibrary();

  const returnBook = (issueId: number) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;
    const book = books.find((b) => b.title === issue.book);
    if (book) book.available = true;
    setBooks([...books]);
    setIssues(issues.filter((i) => i.id !== issueId));
    setReturns([...returns, { id: Date.now(), student: issue.student, book: issue.book, date: new Date().toLocaleDateString() }]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Return Books</h1>
      <ul className="space-y-2">
        {issues.map((i) => (
          <li key={i.id} className="p-2 border rounded flex justify-between">
            <span>{i.book} issued to {i.student} on {i.date}</span>
            <button onClick={() => returnBook(i.id)} className="p-1 bg-green-600 text-white rounded">
              Return
            </button>
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl font-semibold">Returned Books</h2>
      <ul className="space-y-2 mt-2">
        {returns.map((r) => (
          <li key={r.id} className="p-2 border rounded">
            {r.book} returned by {r.student} on {r.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReturnBooks;
