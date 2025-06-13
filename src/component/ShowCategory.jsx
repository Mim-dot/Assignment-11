import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import parse from "html-react-parser";
const ShowCategory = () => {
 const [loading, setLoading] = useState(true);
  //const { category } = useParams();
  const [sortOrder, setSortOrder] = useState("");
   const [data, setData] = useState([]);
  const navigate = useNavigate()
useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:9000/articles?sort=${sortOrder}`
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed tofetch marathons:", err);
        setLoading(false);
      });
  }, [sortOrder])
return (
  <div className="my-20 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {["Science", "Arts", "Technology"].map((category, index) => (
      <motion.div
        key={category}
        onClick={() => {
          setSortOrder(category);
          navigate(`/articles/${category}`);
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.15, type: "spring" }}
        whileHover={{ scale: 1.05, rotate: -0.3 }}
        className={`relative cursor-pointer rounded-3xl p-8 overflow-hidden group transition duration-500 border-2 shadow-xl 
          ${
            sortOrder === category
              ? "bg-gradient-to-br from-[#4f46e5] to-[#9333ea] text-white border-transparent"
              : "bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 border-zinc-200 dark:border-zinc-700 hover:shadow-2xl"
          }`}
      >
        {/* Glowing Layer */}
        <motion.div
          className="absolute -inset-1 rounded-[inherit] blur-xl opacity-30 z-[-1] group-hover:opacity-50 transition-all duration-700"
          style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)",
          }}
        />

        {/* Decorative Circles */}
        <div className="absolute top-[-30px] right-[-30px] w-32 h-32 bg-purple-500 opacity-20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-[-20px] left-[-20px] w-20 h-20 bg-indigo-400 opacity-20 rounded-full blur-2xl pointer-events-none" />

        {/* Content */}
        <h3 className="text-2xl font-extrabold text-center tracking-tight">
          {category}
        </h3>
        <p className="mt-3 text-sm text-center font-medium opacity-80">
          ✨ Explore the world of <span className="italic">{category}</span> articles.
        </p>

        {/* Border Shine on hover */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-500 transition-all duration-300 pointer-events-none" />
      </motion.div>
    ))}
  </div>
);

};

export default ShowCategory;
