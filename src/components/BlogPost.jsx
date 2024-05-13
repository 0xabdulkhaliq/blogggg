import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewPost } from "../utils/blog";
import CommentsBlock from "./CommentsSection";
import MarkdownEditor from "@uiw/react-markdown-editor";
import LoadingOverlay from "./LoadingOverlay";

export default function BlogPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await viewPost(postId);
      setPost(data);
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <LoadingOverlay />;
  }

  return (
    <div className="p-3 max-w-3xl md:mx-auto md:text-base">
      <h1 className="font-kalnia text-2xl md:text-3xl text-center mt-2 mb-4">
        {post.title}
      </h1>
      <img src={post.cover} alt="" className="rounded-lg shadow mb-5" />
      <MarkdownEditor.Markdown
        components={{
          p(props) {
            return <p className="leading-6 !my-6">{props.children}</p>;
          },
          img(props) {
            return (
              <img src={props.children} alt="" className="rounded-lg shadow" />
            );
          },
        }}
        source={post.content}
      />
      <hr className="mt-5" />
      <CommentsBlock postId={postId} />
    </div>
  );
}
