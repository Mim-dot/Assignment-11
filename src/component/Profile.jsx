import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  document.title = "Profile";
  const { user, updateUser, setUser } = useContext(AuthContext);
  const defaultImage = "https://via.placeholder.com/100";

  const [tab, setTab] = useState("articles");
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setName(user?.displayName || "");
    setPhoto(user?.photoURL || "");
  }, [user]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();

        const articlesRes = await fetch(
          `https://assi11-mim-dots-projects.vercel.app/myarticles?email=${encodeURIComponent(
            user.email
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const articlesData = await articlesRes.json();
        setArticles(Array.isArray(articlesData) ? articlesData : []);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      }

      try {
        const res = await fetch(
          "https://assi11-mim-dots-projects.vercel.app/articles"
        );
        const data = await res.json();

        const userEmail = user?.email?.trim().toLowerCase();
        const userComments = [];

        (Array.isArray(data) ? data : []).forEach((article) => {
          (article.comments || []).forEach((comment) => {
            if (comment?.user_email?.trim()?.toLowerCase() === userEmail) {
              userComments.push({
                _id: comment._id || `${article._id}-${Math.random()}`,
                comment: comment.comment,
                articleId: article._id,
                articleTitle: article.title,
                user_name: comment.user_name,
                user_photo: comment.user_photo,
                date: comment.date,
                user_email: comment.user_email, // ✅ fixed this line
              });
            }
          });
        });

        setComments(userComments);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
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
    <div className="profile flex justify-center items-center p-4 min-h-screen mt-5">
      {user ? (
        <div className="profile-2 mt-10 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring-2 ring-offset-2 overflow-hidden">
              <img
                src={user.photoURL || defaultImage}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center lg:text-left">
              <div className="font-bold text-[18px] text-gray-700">
                Email: <span className="text-gray-600">{user.email}</span>
              </div>
              <div className="font-bold text-[18px] mt-2 text-gray-700">
                Name:{" "}
                <span className="text-gray-600">
                  {user.displayName || "User"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            {["articles", "comments", "edit"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded ${
                  tab === type ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setTab(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === "articles" ? (
              <div className="space-y-4">
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <div
                      key={article._id}
                      className="p-4 border rounded-md bg-gray-50"
                    >
                      <h3 className="text-lg font-semibold">{article.title}</h3>
                      <p className="text-sm text-gray-500">
                        Posted on{" "}
                        {new Date(article.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No articles posted yet.</p>
                )}
              </div>
            ) : tab === "comments" ? (
              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="p-4 border rounded-md bg-gray-50"
                    >
                      <p>{comment.comment}</p>
                      <p className="text-xs text-gray-500">
                        On article &quot;{comment.articleTitle}&quot;
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No comments made yet.</p>
                )}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-md mx-auto"
              >
                <div className="flex gap-4 items-center">
                  <label className="w-1/3 text-lg font-semibold">Name:</label>
                  <input
                    type="text"
                    className="w-2/3 p-2 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your display name"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <label className="w-1/3 text-lg font-semibold">
                    Photo URL:
                  </label>
                  <input
                    type="url"
                    className="w-2/3 p-2 border rounded"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    required
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>

          <ToastContainer />
        </div>
      ) : (
        <p className="text-center text-xl text-gray-700">
          Loading user info...
        </p>
      )}
    </div>
  );
};

export default Profile;
