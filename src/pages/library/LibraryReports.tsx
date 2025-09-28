import { useLibrary } from "../../context/LibraryContext";

const LibraryReports = () => {
  const { books, issues, returns, fines, notices } = useLibrary();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <ul className="space-y-2">
        <li>Total Books: {books.length}</li>
        <li>Books Issued: {issues.length}</li>
        <li>Books Returned: {returns.length}</li>
        <li>Fines: {fines.length}</li>
        <li>Notices: {notices.length}</li>
      </ul>
    </div>
  );
};

export default LibraryReports;
