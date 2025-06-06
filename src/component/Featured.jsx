import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Featured = () => {
   document.title = "Featured";
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9000/featured")
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <Link
            key={task._id}
            to={`/taskdetails/${task._id}`}
            className="relative block bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-[#1e1b4b] dark:to-[#312e81] rounded-xl p-6 shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-1 no-underline"
          >
            {/* Budget Ribbon */}
            <div className="absolute top-0 right-0 bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wide px-4 py-1 rounded-bl-lg rotate-12 shadow-lg select-none pointer-events-none">
              ${task.budget}
            </div>

            {/* Content */}
            <h3 className="text-2xl font-extrabold text-indigo-900 dark:text-white mb-3 tracking-tight">
              {task.Task}
            </h3>

            <p className="text-sm text-indigo-700 dark:text-indigo-300 uppercase font-semibold mb-1 tracking-wider">
              Category
            </p>
            <p className="text-md mb-4 font-medium text-indigo-800 dark:text-indigo-200">
              {task.category}
            </p>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 uppercase font-semibold mb-1 tracking-wider">
              Describe
            </p>
            <p className="text-md mb-4 font-medium text-indigo-800 dark:text-indigo-200">
              {task.Describe}
            </p>

            <p className="mt-4 text-sm text-indigo-600 dark:text-indigo-300 font-semibold">
              Deadline:{" "}
              <time dateTime={task.deadline} className="italic">
                {new Date(task.deadline).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </p>

            {/* Decorative dots */}
            <div className="absolute bottom-4 right-4 flex space-x-1 pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className={`block w-2 h-2 rounded-full bg-indigo-700 dark:bg-indigo-900 opacity-${
                    40 - i * 10
                  }`}
                />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Featured;