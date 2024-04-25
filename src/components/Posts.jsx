import { ArrowDown } from "react-feather";
import { useState, useEffect } from "react";
import { listPosts } from "../utils/blog";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import ServiceUnavailable from "./ServiceUnavailable";

export default function Posts({ postInitLimit, showTags }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(false);
  const [tag, setTag] = useState("All");

  const getPosts = async () => {
    const result = await listPosts(
      postInitLimit,
      (posts && posts.posts.length + posts.offset) || 0,
      tag
    );

    setPosts(result);
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const fetchPosts = (item) => {
    if (item) setTag(item);
    setLoading(true);
    getPosts().finally(() => setLoading(false));
  };

  useEffect(() => {
    setTimeout(() => {
      getPosts().finally(() => setLoading(false));
    }, 250);
  }, []);

  return !loading && !posts ? (
    <ServiceUnavailable />
  ) : (
    <div className="px-3 mb-4 max-w-[82rem] mx-auto">
      {showTags && (
        <div className="sticky top-0 z-10 flex justify-end gap-4 mt-4 mb-8">
          {["All", "JavaScript", "CSS", "Personal"].map((item) => (
            <button
              key={item}
              onClick={() => fetchPosts(item)}
              className={`px-4 py-1 outline outline-1 outline-gray-400 ${
                tag === item && "bg-gray-800 text-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array(postInitLimit)
              .fill()
              .map((_) => <CardSkeleton key={_} />)
          : posts.posts.map((post) => (
              <Card
                key={post._id}
                title={post.title}
                cover={post.cover}
                date={post.createdAt}
                id={post._id}
              />
            ))}
      </div>
      <div className="my-9"></div>
      <button
        onClick={fetchPosts}
        className="my-9 flex flex-col items-center mx-auto"
      >
        More
        <ArrowDown color="#444" className="mt-2 animate-bounce" />
      </button>
    </div>
  );
}
