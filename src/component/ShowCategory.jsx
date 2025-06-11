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
   <div className="my-30">
       <select
  value={sortOrder}
  onChange={(e) => {
    const selected = e.target.value;
    setSortOrder(selected);
    if (selected) {
      navigate(`/articles/${selected}`);
    } else {
      navigate("/articles"); 
    }
  }}
  className="all-drop border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option disabled value="">Select Category</option>
  <option value="Science">Science</option>
  <option value="Arts">Arts</option>
  <option value="Technology">Technology</option>
</select>
    
   </div>
  );
};

export default ShowCategory;
