import React from "react";
import logo from "../assets/full-logo.png";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Background({ children, showFooter = true, showNavbar = true }) {
  return (
    <div className="min-h-screen h-screen bg-slate-800 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="w-[800px] h-[600px] absolute -top-32 right-0 bg-slate-500/20 rounded-full blur-[120px]" />
        <div className="w-[500px] h-[400px] absolute -bottom-32 left-48 bg-blue-400/15 rounded-full blur-[100px]" />
        <div className="w-[700px] h-[500px] absolute top-1/3 left-1/4 bg-indigo-800/30 rounded-full blur-[130px]" />
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-slate-700/10 to-slate-900/20" />
      </div>

      <>
        <div className="absolute top-9 left-12 z-20 flex items-center">
          <img src={logo} alt="Qrator Logo" className="h-12 w-auto" />
        </div>

        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20 flex items-center">
          {showNavbar && <Navbar />}
        </div>
      </>

      <main className="flex-grow flex items-center justify-center px-8 z-10">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

export default Background;
