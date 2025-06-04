import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dummy articles/comments (replace with API/database data later)
const dummyArticles = [
  { id: 1, title: "My First Post", createdAt: "2024-01-10" },
  { id: 2, title: "React Tips", createdAt: "2024-02-20" },
];

const dummyComments = [
  { id: 1, content: "Great post!", articleId: 1 },
  { id: 2, content: "Very helpful.", articleId: 2 },
];

const Profile = () => {
  document.title = "Profile";
  const { user, updateUser, setUser } = useContext(AuthContext);
  const defaultImage = "https://via.placeholder.com/100";

  const [tab, setTab] = useState("articles");
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

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
     Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
 
});
    }
  };

  return (
    <div className="flex justify-center items-center p-4 bg-gradient-to-b from-pink-100 to-blue-100 min-h-screen">
      {user ? (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          {/* Profile Header */}
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
                Name: <span className="text-gray-600">{user.displayName || "User"}</span>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              className={`px-4 py-2 rounded ${tab === "articles" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setTab("articles")}
            >
              Articles
            </button>
            <button
              className={`px-4 py-2 rounded ${tab === "comments" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setTab("comments")}
            >
              Comments
            </button>
            <button
              className={`px-4 py-2 rounded ${tab === "edit" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setTab("edit")}
            >
              Edit Profile
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {/* Articles Tab */}
            {tab === "articles" && (
              <div className="space-y-4">
                {dummyArticles.map((article) => (
                  <div key={article.id} className="p-4 border rounded-md bg-gray-50">
                    <h3 className="text-lg font-semibold">{article.title}</h3>
                    <p className="text-sm text-gray-500">
                      Posted on {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Comments Tab */}
            {tab === "comments" && (
              <div className="space-y-4">
                {dummyComments.map((comment) => (
                  <div key={comment.id} className="p-4 border rounded-md bg-gray-50">
                    <p>{comment.content}</p>
                    <p className="text-xs text-gray-500">On article #{comment.articleId}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Edit Profile Tab */}
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
                  <label className="w-1/3 text-lg font-semibold">Photo URL:</label>
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
