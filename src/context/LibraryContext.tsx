import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Book = { id: number; title: string; author: string; available: boolean };
type Issue = { id: number; student: string; book: string; date: string };
type Return = { id: number; student: string; book: string; date: string };
type Fine = { id: number; student: string; amount: number; status: string };
type Notice = { id: number; title: string; message: string; date: string };

interface LibraryContextType {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  issues: Issue[];
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  returns: Return[];
  setReturns: React.Dispatch<React.SetStateAction<Return[]>>;
  fines: Fine[];
  setFines: React.Dispatch<React.SetStateAction<Fine[]>>;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [returns, setReturns] = useState<Return[]>([]);
  const [fines, setFines] = useState<Fine[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    localStorage.setItem(
      "library-data",
      JSON.stringify({ books, issues, returns, fines, notices })
    );
  }, [books, issues, returns, fines, notices]);

  useEffect(() => {
    const saved = localStorage.getItem("library-data");
    if (saved) {
      const parsed = JSON.parse(saved);
      setBooks(parsed.books || []);
      setIssues(parsed.issues || []);
      setReturns(parsed.returns || []);
      setFines(parsed.fines || []);
      setNotices(parsed.notices || []);
    }
  }, []);

  return (
    <LibraryContext.Provider
      value={{ books, setBooks, issues, setIssues, returns, setReturns, fines, setFines, notices, setNotices }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error("useLibrary must be used within LibraryProvider");
  return context;
};
