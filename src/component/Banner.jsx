import React from "react";
import CountUp from "react-countup";
import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative">
      {/* Navbar spacer (navbar height অনুযায়ী) */}
      <div className="h-16"></div>

      {/* Banner Background */}
      <div
        className="w-full h-[80vh] sm:h-[85vh] md:h-[85vh] lg:h-[80vh] bg-cover bg-center font-[Comfortaa]"
        style={{
          backgroundImage: "url('https://i.ibb.co/twGV3ykK/banner.jpg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 bg-opacity-30"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white text-center px-4 h-full">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            🌸 Empower Minds Through Knowledge 🌸
          </h1>
          <p className="text-sm sm:text-lg md:text-xl max-w-2xl mb-6">
            Share, learn, and grow with our lovely community-driven platform.
          </p>

          {/* Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 w-full max-w-4xl px-2">
            <Counter color="bg-pink-300" number={1200} suffix="+" label="Articles" />
            <Counter color="bg-purple-300" number={800} suffix="+" label="Users" />
            <Counter color="bg-yellow-300" number={2500} suffix="+" label="Comments" />
            <Counter color="bg-green-300" number={95} suffix="%" label="Satisfaction" />
          </div>

          {/* Call to Action Button */}
          <NavLink
            to="/all"
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold px-5 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
          >
            💖 Explore Articles 💖
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const Counter = ({ color, number, suffix, label }) => (
  <div className={`p-3 sm:p-4 rounded-2xl text-center ${color} text-white shadow-md`}>
    <div className="text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-sm">
      <CountUp end={number} duration={2} suffix={suffix} />
    </div>
    <div className="text-xs sm:text-sm mt-1">{label}</div>
  </div>
);

export default Banner;
