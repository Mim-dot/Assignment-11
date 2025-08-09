import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import parse from "html-react-parser";
const CategoryArticles = () => {
  const [loading, setLoading] = useState(true);
  const { Science } = useParams();
  //const [sortOrder, setSortOrder] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://assi11-mim-dots-projects.vercel.app/articles?sort=${Science}`
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed Articals:", err);
        setLoading(false);
      });
  }, [Science]);
   if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin  flex justify-center items-center gap-1">
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
    
    <div className="list min-h-[70vh] category bg-gray-50 flex justify-center items-center py-20 px-6">
     
      <div className="mt-18 max-w-6xl w-full grid grid-cols-1 sm:grid-cols-3 gap-10">
        {data.slice(0, 3).map((article, index) => (
          <motion.div
            key={article._id}
            className={`list-motion relative category rounded-3xl p-8 cursor-pointer bg-white border-2 border-gradient-to-r from-purple-400 via-pink-500 to-red-500
          backdrop-blur-md
          transition-transform duration-300 ease-in-out
          hover:scale-[1.04] hover:shadow-[0_8px_24px_rgba(219,39,119,0.4)]
          overflow-hidden
          before:absolute before:-inset-1 before:bg-gradient-to-r before:from-purple-400 before:via-pink-500 before:to-red-500 before:blur-3xl before:opacity-40 before:rounded-3xl before:-z-10`}
            style={{
              transform:
                index % 2 === 0
                  ? "translateY(-10px) skewY(-1deg)"
                  : "translateY(10px) skewY(1deg)",
            }}
            whileHover={{ scale: 1.06, rotate: 0 }}
          >
            <h2 className="text-2xl font-extrabold text-purple-700 mb-4">
              {article.title}
            </h2>

            <div className="text-sm list-motion-div text-purple-500 mb-5">
              <span>
                By <strong>{article.username}</strong>
              </span>
              <div className="mt-2">
                {new Date(article.deadline).toDateString()}
              </div>
            </div>

            <div className="prose  list-motion-div max-w-none line-clamp-4 text-gray-700 italic">
              {parse(article.content || "")}
            </div>

            <div className="mt-6 text-right">
              <Link
                to={`/singleArtical/${article?._id}`}
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-full shadow-lg hover:brightness-110 transition"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default CategoryArticles;
