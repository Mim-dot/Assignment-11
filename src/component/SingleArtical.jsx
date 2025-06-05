import { useLoaderData } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


export default function SingleArtical() {
  const article = useLoaderData();
  const { user } = useContext(AuthContext); // get real user info
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(article.comments || []);
  const [likes, setLikes] = useState(article.likes || 0);

  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) return;

    const newComment = {
      user_id: user.uid,
      user_name: user.displayName,
      user_photo: user.photoURL,
      comment: commentInput,
    };

    const res = await fetch(`http://localhost:9000/articles/${article._id}/comment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });

    if (res.ok) {
      setComments([...comments, { ...newComment, date: new Date() }]);
      setCommentInput("");
    }
  };

  const handleLike = async () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);

    await fetch(`http://localhost:9000/articles/${article._id}/like`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: updatedLikes }),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ARTICLE */}
          <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-b from-[#fff6f6] to-[#f6f6ff] p-6 rounded-xl shadow-xl">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={article.photo }
            alt={article.username || "Author"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-lg">{article.username}</p>
            <p className="text-sm text-gray-500">
              {new Date(article.deadline).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Article Title */}
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

        {/* Category + Tags */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          {article.category && (
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {article.category}
            </span>
          )}
     
        </div>

        {/* Content */}
        <p className="text-lg leading-relaxed">{article.content}</p>
        {/* Like */}
 <div className="flex justify-between mt-6">
          <button onClick={handleLike} className="px-4 py-2 bg-pink-600 text-white rounded-full hover:scale-105 transition">
            ❤️ Like ({likes})
          </button>
          <span className="text-gray-600">{comments.length} Comments</span>
        </div>
      </div>
    </div>

      
      {/* COMMENTS */}
      <div className="mt-10 bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <div className="flex items-center gap-2 mb-4">
          <input
            className="flex-1 p-2 border rounded-md"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write a comment..."
          />
          <button onClick={handleCommentSubmit} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
            Post
          </button>
        </div>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((c, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded-lg flex gap-3 items-start">
                <img
                  src={c.user_photo}
                  alt={c.user_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{c.user_name}</p>
                    <span className="text-xs text-gray-500">
                      {c.date ? new Date(c.date).toLocaleString() : ""}
                    </span>
                  </div>
                <div>
                  <p className="text-gray-800 mb-3">{c.comment}</p>
                  {/* tag */}
       {article.tags && article.tags.trim() !== "" &&
  article.tags.split(",").map((tag) => (
    <span
      key={tag.trim()}
      className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full"
    >
      #{tag.trim()}
    </span>
  ))
}

                  </div>  

                </div>
                
              </div>
              
            ))
          ) : (
            <p className="italic text-gray-500">No comments yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
}
