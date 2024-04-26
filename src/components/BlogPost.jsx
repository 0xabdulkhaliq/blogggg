import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewPost } from "../utils/blog";
import Markdown from "react-markdown";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="p-3 max-w-3xl md:mx-auto md:text-base">
      <h1 className="font-kalnia text-2xl md:text-3xl text-center mt-2 mb-4">
        {post.title}
      </h1>
      <Markdown
        components={{
          p(props) {
            return <p className="leading-6 my-5">{props.children}</p>;
          },
        }}
      >
        {post.content}
      </Markdown>
    </div>
  );
}
