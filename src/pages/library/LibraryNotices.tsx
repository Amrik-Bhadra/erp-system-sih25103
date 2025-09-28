import { useLibrary } from "../../context/LibraryContext";
import { useState } from "react";

const LibraryNotices = () => {
  const { notices, setNotices } = useLibrary();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const addNotice = () => {
    if (!title || !message) return;
    setNotices([...notices, { id: Date.now(), title, message, date: new Date().toLocaleDateString() }]);
    setTitle("");
    setMessage("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notices</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <button onClick={addNotice} className="p-2 bg-blue-600 text-white rounded">Add Notice</button>

      <ul className="mt-4 space-y-2">
        {notices.map(n => (
          <li key={n.id} className="p-2 border rounded">
            <strong>{n.title}</strong> - {n.message} [{n.date}]
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryNotices;
