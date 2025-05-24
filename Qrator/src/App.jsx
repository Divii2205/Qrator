import React from "react";
import logo from "./assets/full-logo.png";

function App() {
  return (
    <div className="min-h-screen bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="w-[800px] h-[600px] absolute -top-32 right-0 bg-slate-500/20 rounded-full blur-[120px]" />
        <div className="w-[500px] h-[400px] absolute bottom-0 left-48 bg-blue-400/15 rounded-full blur-[100px]" />
        <div className="w-[700px] h-[500px] absolute top-1/3 left-1/4 bg-indigo-800/30 rounded-full blur-[130px]" />
      </div>

      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-slate-700/10 to-slate-900/20" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        <div className="absolute top-12 left-12">
          <img src={logo} alt="Qrator Logo" className="h-12 w-auto" />
        </div>

        <div className="text-center space-y-8 max-w-4xl">
          <h1 className="text-white font-bold leading-tight">
            <div className="text-7xl lg:text-8xl mb-4">
              Start your <span className="text-blue-400">Journey</span>
            </div>
            <div className="text-5xl lg:text-6xl text-blue-300">
              Get, Set, Create
            </div>
          </h1>

          <p className="text-white/80 text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            <br />
            sed do eiusmod tempor incididunt ut labore et dolore
            <br />
            nisl tincidunt eget. Lectus mauris eros in vitae.
          </p>

          <div className="flex gap-6 justify-center pt-8">
            <button className="px-12 py-4 bg-gradient-to-b from-indigo-600 to-blue-500 text-white text-2xl font-semibold rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              SIGN IN
            </button>
            <button className="px-12 py-4 bg-gradient-to-b from-indigo-600 to-blue-500 text-white text-2xl font-semibold rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
