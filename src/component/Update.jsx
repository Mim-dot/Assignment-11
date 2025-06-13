import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import formlotti from "../assets/Lotties/Form.json";
import Lottie from "lottie-react";

const Update = () => {
  document.title = "Update Article";

  const data = useLoaderData();
  const { user } = useContext(AuthContext);

  const notify = () => toast.success("Article updated successfully!");

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updateArticle = Object.fromEntries(formData.entries());
    updateArticle.uid = user.uid;

    fetch(`https://assi11-mim-dots-projects.vercel.app/articles/${data?._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updateArticle),
    })
      .then((res) => res.json())
      .then(() => {
        notify();
        form.reset();
      });
  };

 
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
    }
  };

  return (
    <div className="update min-h-screen py-8 px-4 sm:px-6">
      <motion.div
        className="motion-div mt-11 max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex  flex-col md:flex-row">
         
          <div className="w-full Lottie md:w-1/2 flex items-center justify-center p-8">
            <div className="max-w-md w-full">
              <Lottie className="" animationData={formlotti} loop={true} />
              <div className="text-center mt-6">
                <h3 className="text-xl font-semibold text-purple-800 ">Edit with Confidence</h3>
                <p className="text-purple-600  mt-2">
                  Update your article details and make it even better!
                </p>
              </div>
            </div>
          </div>

          
          <div className="w-full form md:w-1/2 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600   mb-6 mt-8">
              Update Your Article
            </h2>

            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700  mb-2">
                  Title
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="Article Title"
                  defaultValue={data?.title || ""}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <input
                  name="category"
                  type="text"
                  list="categoryList"
                  placeholder="Select a Category"
                  required
                  defaultValue={data?.category || ""}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300  focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                />
                <datalist id="categoryList">
                  <option value="Technology" />
                  <option value="Science" />
                  <option value="Arts" />
                </datalist>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  name="content"
                  rows="6"
                  placeholder="Write your article content"
                  required
                  defaultValue={data?.content || ""}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300  focus:ring-2 focus:ring-purple-500 focus:border-transparent  transition-all duration-200"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  name="tags"
                  type="text"
                  placeholder="e.g. AI, JavaScript, Web Dev"
                  defaultValue={data?.tags || ""}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300  focus:ring-2 focus:ring-purple-500 focus:border-transparent  transition-all duration-200"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700  mb-2">
                  Deadline
                </label>
                <input
                  name="deadline"
                  type="date"
                  required
                  defaultValue={
                    data?.deadline
                      ? new Date(data.deadline).toISOString().split("T")[0]
                      : ""
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300  focus:ring-2 focus:ring-purple-500 focus:border-transparent  transition-all duration-200"
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700  mb-2">
                  Photo URL
                </label>
                <input
                  name="photo"
                  type="url"
                  required
                  placeholder="https://example.com/image.jpg"
                  defaultValue={data?.photo || ""}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300  focus:ring-2 focus:ring-purple-500 focus:border-transparent  transition-all duration-200"
                />
              </div>

              {/* User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Name
                  </label>
                  <input
                    name="username"
                    type="text"
                    readOnly
                    value={user?.displayName || ""}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700  cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    readOnly
                    value={user?.email || ""}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-100  text-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-200"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  Update Article
                </motion.button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </motion.div>
    </div>
  );
};

export default Update;
