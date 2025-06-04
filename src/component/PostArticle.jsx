import React from 'react';

const PostArticle = () => {
    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-orange-100 via-white to-orange-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-orange-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">
          Add New Task
        </h2>
        <form onSubmit={handleAddTast} className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              className="input input-bordered w-full focus:border-orange-400 focus:ring-orange-300"
              placeholder="Enter task title"
              name="Task"
              required
            />
          </div>
          {/* bids */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Bids{" "}
            </label>
            <input
              type="number"
              className="input input-bordered w-full focus:border-orange-400 focus:ring-orange-300"
              placeholder="Enter Bids"
              value={0}
              name="Bids"
              readOnly
              required
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Category
            </label>
            <input
              type="text"
              className="input input-bordered w-full focus:border-orange-400 focus:ring-orange-300"
              placeholder="Select a Category"
              list="categories"
              name="category"
              required
            />
            <datalist id="categories">
              <option value="Web Development" />
              <option value="Design" />
              <option value="Writing" />
              <option value="Marketing" />
            </datalist>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full focus:border-orange-400 focus:ring-orange-300"
              placeholder="Describe your task"
              name="Describe"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Deadline & Budget */}
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
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Budget ($)
              </label>
              <input
                type="number"
                placeholder="Enter budget"
                className="input input-bordered w-full focus:border-orange-400 focus:ring-orange-300"
                name="budget"
                required
              />
            </div>
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