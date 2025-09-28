import { useLibrary } from "../../context/LibraryContext";
import { useState } from "react";

const ManageBooks = () => {
  const { books, setBooks } = useLibrary();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = () => {
    if (!title || !author) return;
    setBooks([...books, { id: Date.now(), title, author, available: true }]);
    setTitle("");
    setAuthor("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Books</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button onClick={addBook} className="p-2 bg-blue-600 text-white rounded">
          Add Book
        </button>
      </div>
      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book.id} className="p-2 border rounded flex justify-between">
            <span>
              {book.title} by {book.author} [{book.available ? "Available" : "Issued"}]
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBooks;
