import { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";

function InputGroup({ label, text, type, customElement = false }) {
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
          id={label}
          name={label}
          className="w-full p-2 outline outline-1 outline-gray-300 rounded-sm"
        />
      )}
    </div>
  );
}

export default function PostEditor() {
  const [content, setContent] = useState("# Hello World!");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setPublished] = useState(true);
  const [selectedTag, setSelectedTag] = useState("All");

  return (
    <div className="mb-4 p-3 mx-auto w-full max-w-[82rem]">
      <form noValidate className="flex flex-col gap-4">
        <InputGroup label={"title"} />
        <InputGroup label={"cover"} text={"Cover Image URL"} />
        <InputGroup label={"description"} />
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

        <div className="flex flex-col gap-4 justify-between md:flex-row md:items-center outline outline-0 outline-gray-300 rounded-sm md:outline-1">
          <fieldset className="flex flex-col w-full p-2 outline outline-1 outline-gray-300 rounded-sm gap-2 md:flex-row md:gap-4 md:p-4 md:outline-0 md:w-auto">
            <span>
              <legend className="heading text-base">Select Tag</legend>
            </span>
            <div className="flex w-full justify-between items-center md:w-auto md:gap-4">
              {["All", "Frontend", "Backend", "Extras"].map((tag) => (
                <label
                  key={tag}
                  htmlFor={tag}
                  className={`block h-max cursor-pointer px-4 py-1 outline outline-1 outline-gray-400 ${
                    selectedTag === tag && "bg-gray-800 text-gray-50"
                  }`}
                >
                  {tag}
                  <input
                    type="radio"
                    id={tag}
                    value={tag}
                    checked={selectedTag === tag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex gap-2 w-full p-2 py-4 items-center outline outline-1 outline-gray-300 rounded-sm md:p-4 md:outline-0 md:w-auto">
            <p className="heading text-base">Publish Post</p>
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
      </form>
    </div>
  );
}
