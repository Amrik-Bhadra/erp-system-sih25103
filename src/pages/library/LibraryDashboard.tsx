import { useLibrary } from "../../context/LibraryContext";

const LibraryDashboard = () => {
  const { books, issues, returns, fines, notices } = useLibrary();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Library Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="font-semibold">Total Books</h2>
          <p className="text-3xl">{books.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="font-semibold">Books Issued</h2>
          <p className="text-3xl">{issues.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="font-semibold">Books Returned</h2>
          <p className="text-3xl">{returns.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="font-semibold">Fines</h2>
          <p className="text-3xl">{fines.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="font-semibold">Notices</h2>
          <p className="text-3xl">{notices.length}</p>
        </div>
      </div>
    </div>
  );
};

export default LibraryDashboard;
