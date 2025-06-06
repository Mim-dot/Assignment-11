import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import "../index.css"
const AllArticles = () => {
  const data = useLoaderData();

  return (
    <div
      className="all-artical max-w-7xl mx-auto px-4 py-8 "
      style={{
        backgroundImage:
          "url('https://i.ibb.co/7tT3GZzC/photo-1503676260728-1c00da094a0bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "1rem",
        padding: "2rem",
      }}
    >
      <div className="  bg-white/70 dark:bg-black/60 rounded-xl pointer-events-none"></div>

      <div className=" ">
        {data.length === 0 ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-10">
              No Articles Found.
            </h2>
            <div className="flex justify-center items-center">
              <img
                src="https://i.ibb.co/kgV4xG9q/real.jpg"
                alt="No articles"
                className="mx-auto"
              />
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center text-primary mb-10">
               All Articles
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4  grid-rows-2 gap-10">
              {data.map((article, index) => (
                <motion.div
                  key={article._id}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900 cursor-pointer transition-transform duration-300 ease-in-out"
                  style={{
                    transform:
                      index % 2 === 0
                        ? "translateY(-25px)"
                        : "translateY(25px)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 8px 20px rgba(59, 130, 246, 0.4), 0 0 30px 5px rgba(96, 165, 250, 0.5)",
                  }}
                >
                  <h2 className="h2-title text-2xl font-bold text-primary mb-2">
                    {article.title}
                  </h2>

                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>
                      By <strong>{article.username}</strong>
                    </span>{" "}
                    · <span>{new Date(article.deadline).toDateString()}</span>
                  </div>

                  <div className="prose dark:prose-invert max-w-none line-clamp-4">
                    {parse(article.content || "")}
                  </div>

                  <div className="mt-6 text-right">
                    <Link
                     to={`/singleArtical/${article?._id}`}
                      className="inline-block px-5 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary/80 transition"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllArticles;
