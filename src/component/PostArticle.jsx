import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getAuth } from "firebase/auth";

const PostArticle = () => {
  document.title = "AddTask";
  const { user } = useContext(AuthContext);

  const notify = () => toast.success("Article added successfully!");

  const handleAddTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const articleData = Object.fromEntries(formData.entries());
    articleData.uid = user.uid;

    try {
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken(true);
      const response = await axios.post(
        "https://assi11-mim-dots-projects.vercel.app/articles",
        articleData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        notify();
        form.reset();
      }
    } catch (error) {
      console.error("Failed to post article:", error);
      toast.error("Failed to submit article. Please try again.");
    }
  };

  return (
    <div className="min-h-screen main-post bg-white  py-10 px-4 mt-10">
      <div className="max-w-4xl main-2 mx-auto bg-white  shadow-xl rounded-xl p-8 border border-orange-200 ">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-600 dark:text-orange-400">
          Post Article
        </h2>

        <form onSubmit={handleAddTask}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <tbody>
                <tr className="border-b dark:border-gray-600">
                  <th scope="row" className="py-3 pr-4 font-semibold">
                    Title
                  </th>
                  <td>
                    <input
                      name="title"
                      type="text"
                      required
                      placeholder="Article Title"
                      className="table-input"
                    />
                  </td>
                </tr>

                <tr className="border-b dark:border-gray-600">
                  <th scope="row" className="py-3 pr-4 font-semibold">
                    Category
                  </th>
                  <td>
                    <input
                      name="category"
                      type="text"
                      list="categoryList"
                      placeholder="Select a Category"
                      required
                      className="table-input"
                    />
                    <datalist id="categoryList">
                      <option value="Technology" />
                      <option value="Science" />
                      <option value="Arts" />
                    </datalist>
                  </td>
                </tr>

                <tr className="border-b dark:border-gray-600">
                  <th scope="row" className="py-3 pr-4 font-semibold">
                    Content
                  </th>
                  <td>
                    <textarea
                      name="content"
                      rows="5"
                      placeholder="Write your article content"
                      required
                      className="table-input resize-none "
                    />
                  </td>
                </tr>

                <tr className="border-b dark:border-gray-600">
                  <th scope="row" className="py-3 pr-4 font-semibold">
                    Tags
                  </th>
                  <td>
                    <input
                      name="tags"
                      type="text"
                      required
                      placeholder="e.g. AI, JavaScript, Web Dev"
                      className="table-input"
                    />
                  </td>
                </tr>

                <tr className="border-b ">
                  <th scope="row" className="py-3 pr-4 font-semibold">
                    Deadline
                  </th>
                  <td>
                    <input
                      name="deadline"
                      type="date"
                      required
                      className="table-input"
                    />
                  </td>
                </tr>

                <tr className="border-b dark:border-gray-600">
                  <th scope="row" className="py-3 pr-4 font-semibold">
                    Photo URL
                  </th>
                  <td>
                    <input
                      name="photo"
                      type="url"
                      required
                      placeholder="https://example.com/image.jpg"
                      className="table-input"
                    />
                  </td>
                </tr>

                <tr className="border-b dark:border-gray-600">
                  <th scope="row" className="py-3 pr-4 font-semibold">
                    User Name
                  </th>
                  <td>
                    <input
                      name="username"
                      type="text"
                      readOnly
                      value={user?.displayName || ""}
                      className="table-input bg-gray-100 dark:bg-gray-800"
                    />
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="py-3 pr-4 font-semibold">
                    User Email
                  </th>
                  <td>
                    <input
                      name="email"
                      type="email"
                      readOnly
                      value={user?.email || ""}
                      className="table-input bg-gray-100 dark:bg-gray-800"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className=" cursor-pointer px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
            >
              Submit Article
            </button>
          </div>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default PostArticle;
