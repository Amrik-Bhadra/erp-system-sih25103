// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

// ✅ Import LibraryProvider
import { LibraryProvider } from "./context/LibraryContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LibraryProvider>
      <App />
    </LibraryProvider>
  </BrowserRouter>
);
