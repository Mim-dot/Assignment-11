import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import parse from "html-react-parser";
const CategoryArticles = () => {
 const [loading, setLoading] = useState(true);
  const { Science } = useParams();
  //const [sortOrder, setSortOrder] = useState("");
   const [data, setData] = useState([]);
  const navigate = useNavigate()

  
useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:9000/articles?sort=${Science}`
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed tofetch marathons:", err);
        setLoading(false);
      });
  }, [Science])
  return (
   <div className="">
    
     <div className="mt-18 grid grid-cols-1 md:grid-cols-4  grid-rows-2 gap-10">
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
                  <div className="text-sm text-gray-500 all-ty mb-2 mt-3" ><span>{new Date(article.deadline).toDateString()}</span></div>
                  </div>

                  <div className="prose max-w-none line-clamp-4">
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
