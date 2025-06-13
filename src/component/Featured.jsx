import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Featured = () => {
  document.title = "Featured";
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://assi11-mim-dots-projects.vercel.app/featured")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch featured tasks:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center p-6 dark:text-white">
        Loading featured tasks...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {tasks.map((task, index) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.04, rotate: -0.5 }}
            className="relative group bg-white feature  border border-purple-300 dark:border-indigo-800 p-6 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300"
          >
            {/* Glowing animated border layer */}
            <motion.div
              className="absolute  -inset-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-20 group-hover:opacity-40 rounded-2xl z-[-1]"
              aria-hidden="true"
            />

            <Link to={`/singleArtical/${task._id}`} className="block no-underline">
            
              <div className="absolute top-0 right-0 bg-pink-600 text-white font-bold text-xs px-3 py-1 rounded-bl-xl rotate-6 shadow-md pointer-events-none select-none">
                ❤️ {task.likes}
              </div>

              {/* Title */}
              <h3 className=" text-2xl font-extrabold text-indigo-800 dark:text-white mb-2">
                {task.title}
              </h3>

              {/* Category */}
              <p className="feature-p text-xs uppercase font-semibold text-purple-600 dark:text-purple-300 mb-1 tracking-wide">
                Category
              </p>
              <p className="feature-pp text-md text-gray-800 dark:text-gray-200 mb-4 font-medium">
                {task.category}
              </p>

              {/* Description */}
              <p className="feature-p text-xs uppercase font-bold text-purple-600  mb-1 tracking-wide">
                Describe
              </p>
              <p className="feature-pp text-sm text-gray-800 dark:text-gray-200 mb-4">
                {task.content}
              </p>


              <p className="feature-p text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                Deadline:{" "}
                <time dateTime={task.deadline} className="italic">
                  {new Date(task.deadline).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </p>

             
              <div className="absolute bottom-4 right-4 flex gap-1 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-${50 - i * 10}`}
                  />
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
