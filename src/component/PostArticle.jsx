import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
const PostArticle = () => {
  document.title = "AddTask";
  const { user } = useContext(AuthContext);

  const notify = () => toast("Added succesfully!");
  const handleAddTast = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const articalData = Object.fromEntries(formData.entries());
    articalData.uid = user.uid;
    console.log(articalData);
    //send to db
    fetch("http://localhost:9000/articles", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(articalData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        notify();
        form.reset();
      });
  };
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-orange-100 via-white to-orange-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-orange-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">
          Post Article
        </h2>
        <form onSubmit={handleAddTast} className="space-y-6">
          {/* post Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="input input-bordered w-full focus:border-orange-400 focus:ring-orange-300"
              placeholder="Enter task title"
              name="title"
              required
            />
          </div>

          {/* Category   */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Category
            </label>
            <input
              type="text"
              className="input input-bordered w-full focus:border-orange-400 focus:ring-orange-300"
              placeholder="Select a Category"
              list="Category "
              name="category"
              required
            />
            <datalist id="Category ">
              <option value="Technology" />
              <option value="Science" />
              <option value="Arts" />
            </datalist>
          </div>

          {/* Content  */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Content
            </label>
            <textarea
              className="textarea textarea-bordered w-full focus:border-orange-400 focus:ring-orange-300"
              placeholder="Describe your Category "
              name="Content "
              rows="5"
              required
            ></textarea>
          </div>
      {/* Tags */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              name="tags"
              placeholder="e.g. AI, JavaScript, Web Development"
            />
          </div>
          {/* Deadline  */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                className="input input-bordered w-full focus:border-orange-400 focus:ring-orange-300"
                required
              />
            </div>
          </div>
          {/* img */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">photoURL </label>
            <input
              name="photo"
              type="url"
            
              placeholder="photoURL"
               className="input input-bordered w-full focus:border-orange-400 focus:ring-orange-300"
              required
            />
          </div>
          {/* username and email */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                User Name
              </label>
              <input
                type="text"
                name="username"
                value={user?.displayName || ""}
                readOnly
                required
                className="input input-bordered w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be 3 to 30 characters, only letters, numbers or dashes.
              </p>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                User Email
              </label>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                readOnly
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center bg-amber-600 cursor-pointer h-8 rounded-lg ">
            <button className="text-white mt-1"> Add Task</button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default PostArticle;
