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
      <h2 className="font-kalnia text-2xl md:text-3xl my-5">Comments</h2>
      <div className="flex flex-col gap-4">
        {post.comments &&
          post.comments.map((item) => (
            <div
              key={item._id}
              className="outline outline-1 outline-gray-300 p-3 rounded-lg md:p-5"
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
            </div>
          ))}
      </div>
    </div>
  );
}
