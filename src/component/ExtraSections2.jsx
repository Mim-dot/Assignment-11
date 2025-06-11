import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const voices = [
  {
    name: "Zoya T.",
    avatar: "https://i.pravatar.cc/100?img=33",
    quote:
      "Before this platform, I had never published anything. Now my article reached 500+ readers!",
  },
  {
    name: "Kunal V.",
    avatar: "https://i.pravatar.cc/100?img=45",
    quote: "This community helped me rebuild confidence after failing two internships.",
  },
  {
    name: "Mina A.",
    avatar: "https://i.pravatar.cc/100?img=15",
    quote: "Sharing my code here got me my first freelance client. Forever grateful!",
  },
  {
    name: "Dev R.",
    avatar: "https://i.pravatar.cc/100?img=9",
    quote:
      "Not just a platform — it's a place where people lift each other up with ideas.",
  },
];

const ExtraSections2 = () => {
  const [index, setIndex] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % voices.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const visibleVoices = voices
    .slice(index, index + visibleCount)
    .concat(voices.slice(0, Math.max(0, index + visibleCount - voices.length)));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-10 text-center">
        💬 Voices of Impact
      </h2>

      <div className="flex gap-6 overflow-hidden">
        {visibleVoices.map((voice, i) => (
          <AnimatePresence key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex-1 min-w-[300px] bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-700 p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={voice.avatar}
                  alt={voice.name}
                  className="w-14 h-14 rounded-full border-2 border-blue-500"
                />
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
                  {voice.name}
                </h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                “{voice.quote}”
              </p>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

export default ExtraSections2;
