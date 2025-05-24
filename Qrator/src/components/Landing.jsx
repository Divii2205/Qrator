import React from "react";
import { useNavigate } from "react-router-dom";
import Background from "./Background";

function Landing() {
  const navigate = useNavigate();
  return (
    <Background>
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
          <button
            onClick={() => navigate("/home")}
            className="cursor-pointer px-12 py-4 bg-gradient-to-b from-indigo-600 to-blue-500 text-white text-2xl font-semibold rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            SIGN IN
          </button>
          <button
            onClick={() => navigate("/home")}
            className="cursor-pointer px-12 py-4 bg-gradient-to-b from-indigo-600 to-blue-500 text-white text-2xl font-semibold rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </Background>
  );
}

export default Landing;
