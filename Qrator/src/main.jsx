import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/home.jsx";
import Idea from "./pages/Idea.jsx";
import Script from "./pages/Script.jsx";
import SEO from "./pages/SEO.jsx";
import Thumbnail from "./pages/Thumbnail.jsx";
import Calendar from "./pages/Calendar.jsx";
import Vault from "./pages/Vault.jsx";
import AuthCallback from "./components/AuthCallback.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="idea" element={<Idea />} />
        <Route path="script" element={<Script />} />
        <Route path="thumbnail" element={<Thumbnail />} />
        <Route path="seo" element={<SEO />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="vault" element={<Vault />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
