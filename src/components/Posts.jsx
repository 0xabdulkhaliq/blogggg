import { ArrowDown, ArrowRightCircle } from "react-feather";
import { useState, useEffect } from "react";
import { listPosts } from "../utils/blog";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import ServiceUnavailable from "./ServiceUnavailable";
import { Link } from "react-router-dom";

export default function Posts({ postInitLimit, showTags, showViewMoreOption }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(false);
  const [tag, setTag] = useState("All");

  const getPosts = async () => {
    const result = await listPosts(
      postInitLimit,
      (posts && posts.posts.length + posts.offset) || 0,
      tag
    );
    console.log(tag, result);

    setPosts(result);
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const updateTag = (tag) => {
    setTag(tag);
    setLoading(true);
    setPosts(false);
  };

  const fetchPosts = () => {
    setLoading(true);
    getPosts().finally(() => setLoading(false));
  };

  useEffect(() => {
    setTimeout(() => {
      getPosts().finally(() => setLoading(false));
    }, 250);
  }, [tag]);

  return !loading && !posts ? (
    <ServiceUnavailable />
  ) : (
    <div className="px-3 mb-4 max-w-[82rem] mx-auto">
      {showTags && (
        <div className="sticky top-0 z-10 flex justify-end gap-4 mt-4 mb-8">
          {["All", "JavaScript", "CSS", "Personal"].map((item) => (
            <button
              key={item}
              onClick={() => updateTag(item)}
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
              .map((_, index) => <CardSkeleton key={index} />)
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
      {showViewMoreOption ? (
        <Link
          to={"/blog"}
          className="my-9 flex items-center justify-center mx-auto"
        >
          View More
          <ArrowRightCircle color="#444" strokeWidth={1.2} className="ml-2" />
        </Link>
      ) : (
        <button
          onClick={fetchPosts}
          className="my-9 flex flex-col items-center mx-auto"
        >
          More
          <ArrowDown color="#444" className="mt-2 animate-bounce" />
        </button>
      )}
    </div>
  );
}
