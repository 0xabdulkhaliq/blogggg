import { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import LoadingOverlay from "../components/LoadingOverlay";

function InputGroup({
  label,
  text,
  value,
  setter,
  type,
  customElement = false,
}) {
  return (
    <div>
      <label
        htmlFor={label}
        className="heading capitalize text-base mb-2 block"
      >
        {text || label}
      </label>
      {customElement || (
        <input
          type={type || "text"}
          value={value}
          onChange={(e) => setter(e.target.value)}
          id={label}
          name={label}
          className="w-full p-2 outline outline-1 outline-gray-300 rounded-sm"
        />
      )}
    </div>
  );
}

export default function PostEditor({
  post = {
    title: "",
    cover: "",
    description: "",
    content: "# Hello World!",
    isPublished: true,
    tag: null,
  },
  toUpdatePost,
}) {
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const [cover, setCover] = useState(post.cover);
  const [description, setDescription] = useState(post.description);
  const [isPublished, setPublished] = useState(post.isPublished);
  const [tag, setTag] = useState(post.tag);
  const [loading, setLoading] = useState(null);
  const [cancelModal, setCancelModal] = useState(null);
  const navigate = useNavigate();

  const preventDefaultSubmission = (e) => e.preventDefault();

  const closePostEditor = () => navigate("/admin");

  const submitForm = async () => {
    if (
      !title.trim() ||
      !cover.trim() ||
      !description.trim() ||
      !tag ||
      !content.trim()
    )
      return;

    setLoading(true);

    try {
      await fetch(
        `http://localhost:3000/blog/${
          toUpdatePost ? `update-post/${post._id}` : "create-post"
        }`,
        {
          method: toUpdatePost ? "PATCH" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            cover,
            description,
            isPublished,
            tag,
          }),
        }
      );
    } catch (error) {
      console.log(
        `Error during ${toUpdatePost ? "Updating" : "Creating"} the Post: `,
        error
      );
    } finally {
      setLoading(false);
      closePostEditor();
    }
  };

  return (
    <div className="mb-4 p-3 mx-auto w-full max-w-[82rem]">
      <form
        onSubmit={preventDefaultSubmission}
        noValidate
        className={`flex flex-col gap-4 ${loading && "pointer-events-none"}`}
      >
        <InputGroup label={"title"} value={title} setter={setTitle} />
        <InputGroup
          label={"cover"}
          text={"Cover Image URL"}
          value={cover}
          setter={setCover}
        />
        <InputGroup
          label={"description"}
          value={description}
          setter={setDescription}
        />
        <InputGroup
          label={"content"}
          customElement={
            <MarkdownEditor
              value={content}
              name="content"
              id="content"
              className="w-full min-h-96"
              enableScroll={false}
              onChange={(value) => setContent(value)}
            />
          }
        />

        <div className="flex flex-col gap-4 justify-between md:flex-row md:items-center rounded-sm">
          <fieldset className="flex flex-col w-full p-4 pt-3 outline outline-1 outline-gray-300 rounded-sm gap-2 md:flex-row md:gap-4 md:p-4 md:justify-center">
            <span>
              <legend className="heading text-base">Select Tag</legend>
            </span>
            <div className="flex w-full justify-between items-center md:w-auto md:gap-4">
              {["Frontend", "Backend", "Extras"].map((item) => (
                <label
                  key={item}
                  htmlFor={item}
                  className={`block rounded-sm h-max cursor-pointer px-4 py-1 outline outline-1 outline-gray-400 ${
                    tag === item && "bg-gray-800 text-gray-50"
                  }`}
                >
                  {item}
                  <input
                    type="radio"
                    id={item}
                    value={item}
                    checked={tag === item}
                    onChange={(e) => setTag(e.target.value)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex justify-between w-full p-4 items-center outline outline-1 outline-gray-300 rounded-sm md:p-[1.1rem] md:gap-4 md:justify-center">
            <p className="heading text-base">Publish Post After Creating :</p>
            <div className="w-12 h-6 outline outline-1 outline-gray-400 relative">
              <div
                className={`w-6 h-6 bg-gray-800 transition-transform ${
                  isPublished && "translate-x-full rotate-[135deg] scale-110"
                }`}
              ></div>
              <button
                onClick={() => setPublished(!isPublished)}
                type="button"
                className="absolute inset-0 w-full"
                aria-pressed={isPublished}
              ></button>
            </div>
          </div>
        </div>

        <div className="flex font-bold justify-between p-4 items-center outline outline-1 outline-gray-300 rounded-sm mt-8">
          <button
            onClick={() => setCancelModal(true)}
            className="outline outline-1 transition-[background,transform] outline-red-400 bg-red-200 rounded px-4 py-2 hover:bg-red-300 hover:outline-red-500 active:scale-95 md:px-12"
          >
            Cancel
          </button>
          <button
            onClick={submitForm}
            className="outline outline-1 transition-[background,transform] outline-indigo-400 bg-indigo-200 rounded px-4 py-2 hover:bg-indigo-300 hover:outline-indigo-500 active:scale-95 disabled:pointer-events-none md:px-12"
          >
            {toUpdatePost ? "Update" : "Create"} Post
          </button>
        </div>
      </form>

      <LoadingOverlay isActive={loading} />

      <ConfirmationModal
        modalVisibility={cancelModal}
        toggleVisibility={setCancelModal}
        confirmFunction={closePostEditor}
      />
    </div>
  );
}
