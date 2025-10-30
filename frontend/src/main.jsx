// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css"; // Tailwind styles

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster
import "./index.css"; // Tailwind styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* ✅ Add Toaster once globally */}
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#1E293B", // dark background (optional)
          color: "#fff",
        },
        success: {
          style: {
            background: "#16a34a",
            color: "white",
          },
        },
        error: {
          style: {
            background: "#dc2626",
            color: "white",
          },
        },
      }}
    />
  </React.StrictMode>
);
