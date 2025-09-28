import { useLibrary } from "../../context/LibraryContext";
import { useState } from "react";

const Fines = () => {
  const { fines, setFines } = useLibrary();
  const [student, setStudent] = useState("");
  const [amount, setAmount] = useState("");

  const addFine = () => {
    if (!student || !amount) return;
    setFines([...fines, { id: Date.now(), student, amount: Number(amount), status: "Pending" }]);
    setStudent("");
    setAmount("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Fines</h1>
      <input
        type="text"
        placeholder="Student Name"
        value={student}
        onChange={(e) => setStudent(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <button onClick={addFine} className="p-2 bg-blue-600 text-white rounded">Add Fine</button>

      <ul className="mt-4 space-y-2">
        {fines.map(f => (
          <li key={f.id} className="p-2 border rounded">
            {f.student} - ${f.amount} [{f.status}]
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fines;
