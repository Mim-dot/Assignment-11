import React from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import "../index.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useTypewriter } from "react-simple-typewriter";
import { useAuth } from "../Provider/AuthProvider";
const AllArticles = () => {
    document.title = "All Articles";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const data = useLoaderData();
  const { user } = useAuth();
  const [sortOrder, setSortOrder] = useState("");
  const [text] = useTypewriter({
    words: ["NO Data Found"],
    loop: 0,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://assi11-mim-dots-projects.vercel.app/articles?sort=${sortOrder}`
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch articles:", err);
        setLoading(false);
      });
  }, [sortOrder]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600 flex justify-center items-center gap-1">
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-xl"></span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="all-artical mt-17 mb-2 max-w-7xl mx-auto px-4 py-8 "
      style={{
        backgroundImage:
          "url('https://i.ibb.co/7tT3GZzC/photo-1503676260728-1c00da094a0bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "1rem",
        padding: "2rem",
      }}
    >
      <div className="  bg-white/70 rounded-xl pointer-events-none"></div>

      <div className=" ">
        {data.length === 0 ? (
          <div className="text-center text-2xl sm:text-3xl font-semibold text-purple-600 mb-10">
            <span>{text}</span>
            <div className="flex justify-center items-center mt-4"></div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center text-primary mb-10">
              All Articles
            </h1>
            <div className="mb-6 text-right">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="all-drop border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Articles</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts </option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4  grid-rows-2 gap-10">
              {data.map((article, index) => (
                <motion.div
                  key={article._id}
                  className="div-all rounded-2xl border border-gray-200  p-6 bg-white cursor-pointer transition-transform duration-300 ease-in-out"
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

                  <div className="text-sm text-gray-500 all-ty mb-4 mt-">
                    <span>
                      By <strong>{article.username}</strong>
                    </span>{" "}
                    <div className="text-sm text-gray-500 all-ty mb-2 mt-3">
                      <span>{new Date(article.deadline).toDateString()}</span>
                    </div>
                  </div>

                  {/* <div className="prose max-w-none line-clamp-4">
                    {parse(article.content || "")}
                  </div> */}

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
