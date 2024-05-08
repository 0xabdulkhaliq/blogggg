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
      </form>
    </div>
  );
}
