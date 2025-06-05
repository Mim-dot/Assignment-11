import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { useLoaderData } from "react-router";
import '../index.css'
const Update = () => {
  document.title = "Update Artical";

  const data = useLoaderData();
  console.log(data);
  const { user } = useContext(AuthContext);

  const notify = () => toast.success("Article Update successfully!");

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updateArtical = Object.fromEntries(formData.entries());
    updateArtical.uid = user.uid;
    console.log(updateArtical);
    fetch(`http://localhost:9000/articles/${data?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateArtical),
    })
      .then((res) => res.json())
      .then(() => {
        notify();
        form.reset();
      });
  };

 // Just update classes below, rest of your code stays the same

return (
  <div className="update-page">
    <div className="update-container">
      <h2 className="update-title">Update Article</h2>

      <form onSubmit={handleUpdate}>
        <div className="table-wrapper">
          <table className="update-table">
            <tbody>
              <tr>
                <th>Title</th>
                <td>
                  <input
                    name="title"
                    type="text"
                    required
                    placeholder="Article Title"
                    className="input-field"
                    defaultValue={data?.title || ""}
                  />
                </td>
              </tr>

              <tr>
                <th>Category</th>
                <td>
                  <input
                    name="category"
                    type="text"
                    list="categoryList"
                    placeholder="Select a Category"
                    required
                    className="input-field"
                    defaultValue={data?.category || ""}
                  />
                  <datalist id="categoryList">
                    <option value="Technology" />
                    <option value="Science" />
                    <option value="Arts" />
                  </datalist>
                </td>
              </tr>

              <tr>
                <th>Content</th>
                <td>
                  <textarea
                    name="content"
                    rows="4"
                    placeholder="Write your article content"
                    required
                    className="input-field textarea-field"
                    defaultValue={data?.content || ""}
                  />
                </td>
              </tr>

              <tr>
                <th>Tags</th>
                <td>
                  <input
                    name="tags"
                    type="text"
                    placeholder="e.g. AI, JavaScript, Web Dev"
                    className="input-field"
                    defaultValue={data?.tags || ""}
                  />
                </td>
              </tr>

              <tr>
                <th>Deadline</th>
                <td>
                  <input
                    name="deadline"
                    type="date"
                    required
                    className="input-field"
                    defaultValue={
                      data?.deadline
                        ? new Date(data.deadline).toISOString().split("T")[0]
                        : ""
                    }
                  />
                </td>
              </tr>

              <tr>
                <th>Photo URL</th>
                <td>
                  <input
                    name="photo"
                    type="url"
                    required
                    placeholder="https://example.com/image.jpg"
                    className="input-field"
                    defaultValue={data?.photo || ""}
                  />
                </td>
              </tr>

              <tr>
                <th>User Name</th>
                <td>
                  <input
                    name="username"
                    type="text"
                    readOnly
                    value={user?.displayName || ""}
                    className="input-field readonly-field"
                  />
                </td>
              </tr>

              <tr>
                <th>User Email</th>
                <td>
                  <input
                    name="email"
                    type="email"
                    readOnly
                    value={user?.email || ""}
                    className="input-field readonly-field"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="button-wrapper">
          <button type="submit" className="btn-submit">
            Submit Article
          </button>
        </div>

        <ToastContainer />
      </form>
    </div>
  </div>
);

};

export default Update;
