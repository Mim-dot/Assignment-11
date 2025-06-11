import React, { useEffect, useState } from "react";

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

const ExtraSections = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % contributors.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getVisibleContributors = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(contributors[(startIndex + i) % contributors.length]);
    }
    return visible;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-6">
        🌟 Top Contributors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all">
        {getVisibleContributors().map((person, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-md border border-zinc-200 dark:border-zinc-700 text-center"
          >
            <img
              src={person.avatar}
              alt={person.name}
              className="w-20 h-20 rounded-full mb-4 border-4 border-blue-500 mx-auto"
            />
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
              {person.name}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm mt-2">
              “{person.quote}”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraSections;
