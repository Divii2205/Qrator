import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Landing from "./components/Landing.jsx";
import Home from "./pages/home.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
