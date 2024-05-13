import { Loader } from "react-feather";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthenticationContext";
import { viewCommentsForPost } from "../utils/blog";
import Comment from "./Comment";
import ConfirmationModal from "./ConfirmationModal";

export default function CommentsBlock({ postId }) {
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
            <Comment
              key={item._id}
              user={user}
              item={item}
              setDeleteModal={setDeleteModal}
              deleteId={deleteId}
            />
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
              className="outline float-end outline-1 transition-[background,transform] outline-indigo-300 bg-indigo-100 rounded mt-3 px-3 py-1 hover:bg-indigo-200 hover:outline-indigo-400 active:scale-95 disabled:pointer-events-none"
            >
              {postCommentLoader ? (
                <span className="flex">
                  Posting Comment..
                  <Loader
                    strokeWidth={1.5}
                    width={20}
                    height={20}
                    className="animate-spin-slow"
                  />
                </span>
              ) : (
                "Post Comment"
              )}
            </button>
          </form>
        )}
      </div>
      <ConfirmationModal
        modalVisibility={deleteModal}
        toggleVisibility={setDeleteModal}
        confirmFunction={deleteComment}
      />
    </div>
  );
}
