// Enhanced ExtraSections (Top Contributors)
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const contributors = [
  {
    name: "Ayesha K.",
    avatar: "https://i.pravatar.cc/100?img=5",
    quote: "Keep pushing boundaries. You inspire others to do the same!",
  },
  {
    name: "Rahul D.",
    avatar: "https://i.pravatar.cc/100?img=12",
    quote: "Creativity and persistence never go unnoticed.",
  },
  {
    name: "Lina M.",
    avatar: "https://i.pravatar.cc/100?img=18",
    quote: "Your journey motivates the entire community!",
  },
  {
    name: "Jason P.",
    avatar: "https://i.pravatar.cc/100?img=22",
    quote: "Turning ideas into action—you're leading the way.",
  },
  {
    name: "Nina R.",
    avatar: "https://i.pravatar.cc/100?img=31",
    quote: "Great stories come from great effort. You're proof!",
  },
  {
    name: "Ahmed Z.",
    avatar: "https://i.pravatar.cc/100?img=45",
    quote: "Consistency breeds excellence—well done!",
  },
];

const visibleCount = 4;

const ExtraSections = () => {
  const [startIndex, setStartIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setStartIndex((prev) => (prev + 1) % contributors.length);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, []);

  const visibleContributors = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, i) => {
      return contributors[(startIndex + i) % contributors.length];
    });
  }, [startIndex]);

  return (
    <div className="extra w-full max-w-7xl mx-auto px-4 py-24 relative overflow-hidden mb-5 rounded-3xl shadow-inner">
      <h2 className="extra-h2 text-4xl font-extrabold text-center text-zinc-900  mb-16">
        🌟 Top Contributors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        <AnimatePresence initial={false}>
          {visibleContributors.map((person, index) => (
            <motion.div
              key={person.name + index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative extra-motion bg-white  rounded-2xl p-6 border border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-300 group"
            >
              <motion.img
                src={person.avatar}
                alt={person.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-500 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 3 }}
              />
              <h3 className="extra-h3 text-xl font-semibold text-zinc-800  text-center">
                {person.name}
              </h3>
              <p className="text-sm text-zinc-600  mt-2 text-center italic">
                “{person.quote}”
              </p>
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-blue-500 animate-ping opacity-70"></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-400 opacity-20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 w-80 h-80 bg-purple-400 opacity-20 blur-3xl rounded-full animate-pulse delay-2000" />
      </div>
    </div>
  );
};

export default ExtraSections;
