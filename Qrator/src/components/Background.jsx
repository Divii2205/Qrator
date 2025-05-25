import React from "react";
import logo from "../assets/full-logo.png";
import Footer from "./Footer";
import Navbar from "./Navbar";
import UserDropdown from "./UserDropdown";

function Background({ children, showFooter = true, showNavbar = true }) {
  return (
    <div
      className="min-h-screen relative overflow-auto flex flex-col"
      style={{ minHeight: "100vh" }}
    >
      <div className="fixed inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-950/40 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-blue-950/30 to-transparent" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-[100vw] h-[60vh] absolute -top-20 left-0 bg-slate-700/20 blur-[120px]" />
          <div className="w-[100vw] h-[50vh] absolute -bottom-20 left-0 bg-gray-900/40 blur-[150px]" />
          <div className="w-[100vw] h-[40vh] absolute top-1/2 transform -translate-y-1/2 left-0 bg-blue-950/15 blur-[100px]" />
        </div>
      </div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <>
          <div className="absolute top-9 left-12 z-20 flex items-center">
            <img src={logo} alt="Qrator Logo" className="h-12 w-auto" />
          </div>

          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20 flex items-center">
            {showNavbar && <Navbar />}
          </div>

          <div className="absolute top-9 right-12 z-20 flex items-center">
            <UserDropdown />
          </div>
        </>
        <main className="flex-grow flex items-center justify-center px-8 z-10 relative">
          {children}
        </main>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}
export default Background;
