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

  useEffect(() => {
  if (user?.email) {
    // Fetch articles posted by user
    fetch('http://localhost:9000/myarticles')
      .then(res => res.json())
      .then(data => {
        console.log("All articles from /myarticles:", data);
        const arr = Array.isArray(data) ? data : [];
        const filtered = arr.filter(article => article.userEmail === user.email);
        console.log("Filtered articles by user email:", filtered);
        setArticles(filtered);
      })
      .catch(err => console.error("Failed to fetch articles", err));

    // Fetch all articles to extract user's comments
    fetch('http://localhost:9000/articles')
      .then(res => res.json())
      .then(data => {
        const allArticles = Array.isArray(data) ? data : [];
        const userComments = [];

        allArticles.forEach(article => {
          (article.comments || []).forEach(comment => {
            if (comment.user_email === user.email) {
              userComments.push({
                _id: comment._id || `${article._id}-${Math.random()}`,
                comment: comment.comment,
                articleId: article._id,
                user_name: comment.user_name,
                user_photo: comment.user_photo,
                date: comment.date,
              });
            }
          });
        });

        setComments(userComments);
      })
      .catch(err => console.error("Failed to fetch comments", err));
  }
}, [user?.email]);


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

  return (
    <div className="profile flex justify-center items-center p-4 min-h-screen mt-5">
      {user ? (
        <div className="profile-2 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          {/* Header */}
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
                Gmail: <span className="text-gray-600">{user.email}</span>
              </div>
              <div className="font-bold text-[18px] mt-2 text-gray-700">
                Name:{" "}
                <span className="text-gray-600">
                  {user.displayName || "User"}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
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

          {/* Content */}
          <div className="mt-6">
            {tab === "articles" && (
              <div className="space-y-4">
                {Array.isArray(articles) && articles.length > 0 ? (
                  articles.map((article) => (
                    <div
                      key={article._id}
                      className="p-4 border rounded-md bg-gray-50"
                    >
                      <h3 className="text-lg font-semibold">{article.title}</h3>
                      <p className="text-sm text-gray-500">
                        Posted on{" "}
                        {new Date(article.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No articles posted yet.</p>
                )}
              </div>
            )}

            {tab === "comments" && (
              <div className="space-y-4">
                {Array.isArray(comments) && comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="p-4 border rounded-md bg-gray-50"
                    >
                      <p>{comment.comment}</p>
                      <p className="text-xs text-gray-500">
                        On article #{comment.articleId}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No comments made yet.</p>
                )}
              </div>
            )}

            {tab === "edit" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4 items-center">
                  <label className="w-1/3 text-lg font-semibold">Name:</label>
                  <input
                    type="text"
                    className="w-2/3 p-2 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
        <p className="text-center text-xl text-gray-700">Loading user info...</p>
      )}
    </div>
  );
};

export default Profile;
