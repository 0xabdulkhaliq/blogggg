import { Loader, Trash2, Edit } from "react-feather";
import { useState } from "react";

export default function Comment({ item, user, setDeleteModal, deleteId }) {
  const [editing, setEditing] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [content, setContent] = useState(item.content);

  const updateComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setUpdating(true);

    try {
      await fetch(`http://localhost:3000/blog/update-comment/${item._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
    } catch (error) {
      console.log("Error during Updating comment: ", error);
      setContent(item.content);
    } finally {
      setEditing(false);
      setUpdating(false);
    }
  };

  return (
    <div className="relative outline outline-1 outline-gray-300 p-3 rounded-lg md:p-5">
      <figure className="flex gap-4">
        <img
          src={`https://github.com/${item.author}.png`}
          alt=""
          className="w-12 h-12 rounded-full outline outline-1 outline-gray-400"
        />

        <figcaption>
          <p className="text-lg font-bold tracking-wider">{item.author}</p>
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

      {editing ? (
        <form onSubmit={updateComment}>
          <textarea
            name="content"
            rows="4"
            spellCheck={false}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-100 p-2 rounded outline outline-1 outline-gray-300 w-full"
          ></textarea>

          <div className="flex gap-3 justify-between">
            <button
              onClick={() => {
                setContent(item.content);
                setEditing(false);
              }}
              className="outline float-end outline-1 transition-[background,transform] outline-red-300 bg-red-100 rounded mt-3 px-3 py-1 hover:bg-red-200 hover:outline-red-400 active:scale-95 disabled:pointer-events-none"
            >
              Cancel
            </button>
            <button className="outline float-end outline-1 transition-[background,transform] outline-indigo-300 bg-indigo-100 rounded mt-3 px-3 py-1 hover:bg-indigo-200 hover:outline-indigo-400 active:scale-95 disabled:pointer-events-none">
              Update Comment
            </button>
          </div>
        </form>
      ) : (
        <p className="whitespace-pre-line opacity-85">{content}</p>
      )}

      {user && user.username === item.author && (
        <div className="absolute right-4 top-4 flex gap-3">
          <button
            aria-label="Edit Comment"
            title="Edit Comment"
            disabled={updating || editing}
            onClick={() => setEditing(true)}
            className="outline outline-1 transition-[background,transform] outline-indigo-300 bg-indigo-100 rounded-md p-2 hover:bg-indigo-200 hover:outline-indigo-400 hover:scale-110 active:scale-90 disabled:pointer-events-none"
          >
            {updating ? (
              <Loader
                strokeWidth={1.5}
                width={20}
                height={20}
                className="animate-spin-slow"
              />
            ) : (
              <Edit strokeWidth={1.5} width={20} height={20} />
            )}
          </button>
          <button
            aria-label="Delete Comment"
            title="Delete Comment"
            disabled={deleteId}
            onClick={() => setDeleteModal(item._id)}
            className="outline outline-1 transition-[background,transform] outline-red-300 bg-red-100 rounded-md p-2 hover:bg-red-200 hover:outline-red-400 hover:scale-110 active:scale-90 disabled:pointer-events-none"
          >
            {deleteId && deleteId === item._id ? (
              <Loader
                strokeWidth={1.5}
                width={20}
                height={20}
                className="animate-spin-slow"
              />
            ) : (
              <Trash2 strokeWidth={1.5} width={20} height={20} />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
