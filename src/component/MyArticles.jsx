import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useTypewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";
import { useAuth } from "../Provider/AuthProvider";
import axios from "axios";

const MyArticles = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const { email } = useParams();

  const [text] = useTypewriter({
    words: ["NO Data Found"],
    loop: 0,
  });

  useEffect(() => {
    if (!user?.accessToken) return;
    setLoading(true);
    axios(
      `https://assi11-mim-dots-projects.vercel.app/myarticles?email=${user.email}`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      });
  }, [user.accessToken, email]);

  const handleDelete = (articleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6c63ff",
      cancelButtonColor: "#e07a5f",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assi11-mim-dots-projects.vercel.app/articles/${articleId}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remaining = articles.filter((a) => a._id !== articleId);
              setArticles(remaining);
              Swal.fire(
                "Deleted!",
                "Your article has been deleted.",
                "success"
              );
            }
          });
      }
    });
  };
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
    <div className="mt-8 max-w-7xl mx-auto px-4 py-8 ">
      {articles.length === 0 ? (
        <div className="text-center text-2xl sm:text-3xl font-semibold text-purple-600 mb-10">
          <span>{text}</span>
          <div className="flex justify-center items-center mt-4">
            <img
              src="https://i.ibb.co/kgV4xG9q/real.jpg"
              alt="No data"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-purple-700 mb-10 mt-12">
            📋 My Posted Tasks
          </h1>
          <div className="overflow-x-auto">
            <table className="table w-full border border-purple-200 text-sm sm:text-base rounded-lg overflow-hidden shadow-md">
              <thead className="bg-purple-100">
                <tr>
                  <th className="py-3 px-4 text-purple-700">📌 Task</th>
                  <th className="py-3 px-4 text-purple-700">⏰ Deadline</th>
                  <th className="py-3 px-4 text-purple-700">🗂️ Category</th>
                  <th className="py-3 px-4 text-purple-700 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {articles.map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-purple-50 transition-all duration-300 ease-in-out cursor-pointer"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.02)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <td className="font-medium text-purple-600 py-3 px-4">
                      {task.title}
                    </td>
                    <td className="py-3 px-4 text-purple-500">
                      {new Date(task.deadline).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 text-[13px] text-purple-700 bg-purple-200 rounded-full select-none">
                        {task.category}
                      </span>
                    </td>
                    <td className="space-x-2 text-center py-3 px-4">
                      <Link to={`/update/${task._id}`}>
                        <button className="btn btn-xs sm:btn-sm bg-purple-200 text-purple-800 hover:bg-purple-300">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="btn btn-xs sm:btn-sm bg-red-200 text-red-700 hover:bg-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyArticles;
