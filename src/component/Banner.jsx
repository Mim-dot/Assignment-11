import React from "react";
import CountUp from "react-countup";
import { NavLink } from "react-router-dom"; // ✅ fixed import

const Banner = () => {
  return (
    <div
      className="relative w-full h-[90vh] bg-cover bg-center font-[Comfortaa]"
      style={{
        backgroundImage: "url('https://i.ibb.co/twGV3ykK/banner.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          🌸 Empower Minds Through Knowledge 🌸
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">
          Share, learn, and grow with our lovely community-driven platform.
        </p>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 w-full max-w-4xl">
          <Counter color="bg-pink-300" number={1200} suffix="+" label="Articles" />
          <Counter color="bg-purple-300" number={800} suffix="+" label="Users" />
          <Counter color="bg-yellow-300" number={2500} suffix="+" label="Comments" />
          <Counter color="bg-green-300" number={95} suffix="%" label="Satisfaction" />
        </div>

        {/* Cute Button */}
        <NavLink
          to="/all"
          className="bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          💖 All Articles 💖
        </NavLink>
      </div>
    </div>
  );
};

const Counter = ({ color, number, suffix, label }) => (
  <div className={`p-4 rounded-2xl text-center ${color} text-white shadow-md`}>
    <div className="text-3xl font-bold drop-shadow-sm">
      <CountUp end={number} duration={2} suffix={suffix} />
    </div>
    <div className="text-sm mt-1">{label}</div>
  </div>
);

export default Banner;
