import React from "react";
import logo from "../assets/full-logo.png";

function Background({ children }) {
  return (
    <div className="min-h-screen bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="w-[800px] h-[600px] absolute -top-32 right-0 bg-slate-500/20 rounded-full blur-[120px]" />
        <div className="w-[500px] h-[400px] absolute bottom-0 left-48 bg-blue-400/15 rounded-full blur-[100px]" />
        <div className="w-[700px] h-[500px] absolute top-1/3 left-1/4 bg-indigo-800/30 rounded-full blur-[130px]" />
      </div>

      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-slate-700/10 to-slate-900/20" />

      <div className="absolute top-12 left-12 z-10">
        <img src={logo} alt="Qrator Logo" className="h-12 w-auto" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        {children}
      </div>
    </div>
  );
}

export default Background;
