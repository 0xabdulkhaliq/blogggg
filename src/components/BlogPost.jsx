import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewPost } from "../utils/blog";
import Markdown from "react-markdown";
import CommentsBlock from "./CommentsSection";

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
      <img src={post.cover} alt="" className="rounded-lg shadow" />
      <Markdown
        components={{
          p(props) {
            return <p className="leading-6 my-5">{props.children}</p>;
          },
          img(props) {
            return (
              <img src={props.children} alt="" className="rounded-lg shadow" />
            );
          },
        }}
      >
        {post.content}
      </Markdown>
      <hr />
      <CommentsBlock postId={postId} />
    </div>
  );
}
