// import React, { useState } from 'react';
// import { Link, useLoaderData, useParams } from 'react-router-dom';
// import { useTypewriter } from 'react-simple-typewriter';
// import Swal from "sweetalert2";

// const MyArticles = () => {
//   // const { userId } = useParams();
//   const initialArticles = useLoaderData();
//   const [articles, setArticles] = useState(initialArticles);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const [text] = useTypewriter({
//     words: ["No Articles Found"],
//     loop: 0,
//   });

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#6c63ff",
//       cancelButtonColor: "#e07a5f",
//       confirmButtonText: "Yes, Delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setIsDeleting(true);
//         fetch(`http://localhost:9000/articles/${id}`, { method: "DELETE" })
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.deletedCount) {
//               const remainingArticles = articles.filter((article) => article._id !== id);
//               setArticles(remainingArticles);
//               Swal.fire({
//                 title: "Deleted!",
//                 text: "Your article has been deleted.",
//                 icon: "success",
//                 confirmButtonColor: "#6c63ff",
//               });
//             }
//           })
//           .catch(error => {
//             Swal.fire({
//               title: "Error!",
//               text: "Failed to delete article",
//               icon: "error",
//               confirmButtonColor: "#6c63ff",
//             });
//           })
//           .finally(() => setIsDeleting(false));
//       }
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 mt-16"> 
//       {articles.length === 0 ? (
//         <div className="text-center text-2xl sm:text-3xl font-semibold text-purple-600 mb-10">
//           <span>{text}</span>
//           <div className="flex justify-center items-center mt-4">
//             <img
//               src="https://i.ibb.co/kgV4xG9q/real.jpg"
//               alt="No articles found"
//               className="rounded-lg shadow-lg max-w-md"
//             />
//           </div>
//         </div>
//       ) : (
//         <>
//           <h1 className="text-2xl sm:text-3xl font-semibold text-center text-purple-700 mb-8">
//             📋 My Articles
//           </h1>
//           <div className="overflow-x-auto">
//             <table className="table w-full border border-purple-200 text-sm sm:text-base rounded-lg overflow-hidden shadow-md">
//               <thead className="bg-purple-100">
//                 <tr>
//                   <th className="py-3 px-4 text-purple-700">📌 Title</th>
//                   <th className="py-3 px-4 text-purple-700">⏰ Date</th>
//                   <th className="py-3 px-4 text-purple-700">🗂️ Category</th>
//                   <th className="py-3 px-4 text-purple-700 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {articles.map((article) => (
//                   <tr
//                     key={article._id}
//                     className="hover:bg-purple-50 transition-colors duration-300"
//                   >
//                     <td className="font-medium text-purple-600 py-3 px-4">{article.title}</td>
//                     <td className="py-3 px-4 text-purple-500">
//                       {new Date(article.deadline).toLocaleDateString()}
//                     </td>
//                     <td className="py-3 px-4">
//                       <span className="inline-block px-3 py-1 text-[13px] text-purple-700 bg-purple-200 rounded-full">
//                         {article.category}
//                       </span>
//                     </td>
//                     <td className="space-x-2 text-center py-3 px-4">
//                       <Link to={`/update/${article._id}`}>
//                         <button
//                           className="btn btn-xs sm:btn-sm bg-purple-200 text-purple-800 hover:bg-purple-300 transition-colors duration-300"
//                           style={{ boxShadow: "0 2px 6px rgba(108, 99, 255, 0.2)" }}
//                         >
//                           Update
//                         </button>
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(article._id)}
//                         disabled={isDeleting}
//                         className="btn btn-xs sm:btn-sm bg-red-200 text-red-700 hover:bg-red-300 transition-colors duration-300"
//                         style={{ boxShadow: "0 2px 6px rgba(224, 122, 95, 0.2)" }}
//                       >
//                         {isDeleting ? 'Deleting...' : 'Delete'}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MyArticles;

import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { useTypewriter } from 'react-simple-typewriter';
import Swal from "sweetalert2";

const MyArticles = () => {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);

  const [text] = useTypewriter({
    words: ["NO Data Found"],
    loop: 0,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6c63ff",   // softer purple
      cancelButtonColor: "#e07a5f",    // muted coral
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:9000/articles/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remainingUsers = users.filter((user) => user._id !== id);
              setUsers(remainingUsers);
              Swal.fire({
                title: "Deleted!",
                text: "Your User has been deleted.",
                icon: "success",
                confirmButtonColor: "#6c63ff",
              });
            }
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {users.length === 0 ? (
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
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-purple-700 mb-8">
            📋 My Posted Tasks
          </h1>
          <div className="overflow-x-auto">
            <table className="table w-full border border-purple-200 text-sm sm:text-base rounded-lg overflow-hidden shadow-md">
              <thead className="bg-purple-100">
                <tr>
                  <th className="py-3 px-4 text-purple-700">📌 Task</th>
                  <th className="py-3 px-4 text-purple-700">⏰ Deadline</th>
                  <th className="py-3 px-4 text-purple-700">🗂️ Category</th>
                  <th className="py-3 px-4 text-purple-700 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-purple-50 transition-colors duration-300 ease-in-out cursor-pointer"
                    style={{ transitionProperty: "background-color, transform" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <td className="font-medium text-purple-600 py-3 px-4">{task.title}</td>
                    <td className="py-3 px-4 text-purple-500">{new Date(task.deadline).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 text-[13px] text-purple-700 bg-purple-200 rounded-full select-none">
                        {task.category}
                      </span>
                    </td>
                    <td className="space-x-2 text-center py-3 px-4">
                      <Link to={`/update/${task._id}`}>
                        <button
                          className="btn btn-xs sm:btn-sm bg-purple-200 text-purple-800 hover:bg-purple-300 transition-colors duration-300"
                          style={{ boxShadow: "0 2px 6px rgba(108, 99, 255, 0.2)" }}
                        >
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="btn btn-xs sm:btn-sm bg-red-200 text-red-700 hover:bg-red-300 transition-colors duration-300"
                        style={{ boxShadow: "0 2px 6px rgba(224, 122, 95, 0.2)" }}
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
