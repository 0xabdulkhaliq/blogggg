import { Trash2, Loader } from "react-feather";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthenticationContext";
import { viewCommentsForPost } from "../utils/blog";

export default function Comments({ postId }) {
  const { user } = useAuth();
  const commentRef = useRef("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [comments, setComments] = useState(null);
  const [postCommentLoader, setPostCommentLoader] = useState(false);

  const createComment = async (e) => {
    e.preventDefault();

    if (commentRef.current.trim() === "") return;

    setPostCommentLoader(true);
    const content = commentRef.current;

    try {
      const response = await fetch(
        `http://localhost:3000/blog/create-comment/${postId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );

      if (response.ok) {
        const comment = await response.json();

        e.target.reset();

        setTimeout(() => {
          setComments([...comments, comment.comment]);
        }, 500);
      }
    } catch (error) {
      console.log("Error during Posting comment: ", error);
    } finally {
      setPostCommentLoader(null);
    }
  };

  const deleteComment = (id) => {
    setDeleteModal(false);
    setDeleteId(id);

    fetch(`http://localhost:3000/blog/delete-comment/${id}?delete=true`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        setComments(comments.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setDeleteId(false));
  };

  useEffect(() => {
    const fetchComments = async () => {
      const data = await viewCommentsForPost(postId);
      setComments(data);
    };

    fetchComments();
  }, [postId]);

  return (
    <div>
      <h2 className="font-kalnia text-2xl md:text-3xl my-5">Comments</h2>
      <div className="flex flex-col gap-4 mb-1">
        {comments &&
          comments.map((item) => (
            <div
              key={item._id}
              className="relative outline outline-1 outline-gray-300 p-3 rounded-lg md:p-5"
            >
              <figure className="flex gap-4">
                <img
                  src={`https://github.com/${item.author}.png`}
                  alt=""
                  className="w-12 h-12 rounded-full outline outline-1 outline-gray-400"
                />

                <figcaption>
                  <p className="text-lg font-bold tracking-wider">
                    {item.author}
                  </p>
                  <time className="text-xs">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </figcaption>
              </figure>

              <hr className="my-3 md:my-5" />

              <p className="whitespace-pre-line opacity-85">{item.content}</p>

              {user && user.username === item.author && (
                <button
                  aria-label="Delete Comment"
                  title="Delete Comment"
                  disabled={deleteId}
                  onClick={() => setDeleteModal(item._id)}
                  className="absolute right-4 top-4 outline outline-1 transition-[background,transform] outline-red-300 bg-red-100 rounded-md p-2 hover:bg-red-200 hover:outline-red-400 hover:scale-110 active:scale-90 disabled:pointer-events-none"
                >
                  {deleteId && deleteId === item._id ? (
                    <Loader
                      strokeWidth={1.5}
                      width={20}
                      height={20}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 strokeWidth={1.5} width={20} height={20} />
                  )}
                </button>
              )}
            </div>
          ))}

        {user && (
          <form
            className="relative outline outline-1 outline-gray-300 p-3 rounded-lg"
            onSubmit={createComment}
          >
            <div className="flex gap-3">
              <img
                src={`https://github.com/${user.username}.png`}
                alt=""
                className="w-12 h-12 rounded-full outline outline-1 outline-gray-400"
              />
              <textarea
                name="content"
                rows="4"
                spellCheck={false}
                required
                onChange={(e) => {
                  commentRef.current = e.target.value;
                }}
                className="bg-gray-100 p-2 rounded outline outline-1 outline-gray-300 w-full"
              ></textarea>
            </div>
            <button
              disabled={postCommentLoader}
              className="outline float-end outline-1 transition-[background,transform] outline-blue-300 bg-blue-100 rounded mt-3 px-3 py-1 hover:bg-blue-200 hover:outline-blue-400 active:scale-95 disabled:pointer-events-none"
            >
              {postCommentLoader ? (
                <span className="flex">
                  Posting Comment..
                  <Loader
                    strokeWidth={1.5}
                    width={20}
                    height={20}
                    className="animate-spin"
                  />
                </span>
              ) : (
                "Post Comment"
              )}
            </button>
          </form>
        )}
      </div>
      <div
        className={`grid place-items-center fixed z-20 inset-0 px-2 bg-[#0005] backdrop-blur-sm opacity-0 transition-opacity duration-200 invisible ${
          deleteModal && "!visible opacity-100"
        }`}
      >
        <div className="p-3 min-h-36 flex flex-col justify-between bg-gray-50 rounded-lg shadow-lg w-full max-w-sm">
          <p className="font-kalnia text-2xl md:text-3xl">Are you sure ?</p>

          <div className="flex justify-between text-white font-bold">
            <button
              onClick={() => setDeleteModal(false)}
              className="transition-[background,transform] bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-600 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteComment(deleteModal)}
              className="transition-[background,transform] bg-red-500 rounded-md px-2 py-1 hover:bg-red-600 active:scale-95"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
