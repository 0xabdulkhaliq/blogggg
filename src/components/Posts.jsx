import { ArrowDown, ChevronRight, ChevronLeft } from "react-feather";
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

  const getPosts = async (offset) => {
    const result = await listPosts(postInitLimit, offset || 0, tag);
    setPosts(result);
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const updateTag = (tag) => {
    setTag(tag);
    setLoading(true);
    setPosts(false);
  };

  const fetchPosts = (offset) => {
    setLoading(true);
    getPosts(offset).finally(() => setLoading(false));
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
        <div className="sticky top-0 z-10 flex justify-center md:justify-end gap-4 mt-4 mb-8">
          {["All", "Frontend", "Backend", "Extras"].map((item) => (
            <button
              key={item}
              onClick={() => updateTag(item)}
              disabled={tag === item}
              className={`px-4 py-1 outline outline-1 outline-gray-400 disabled:bg-gray-800 disabled:text-gray-50`}
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
          className="my-9 flex items-center flex-col justify-center mx-auto"
        >
          View More
          <ArrowDown color="#444" className="mt-2 animate-bounce" />
        </Link>
      ) : (
        posts && (
          <div className="my-9 flex justify-center gap-2 items-center mx-auto">
            <button
              onClick={() => fetchPosts(posts.offset - 3)}
              disabled={!posts.offset}
              aria-label="Previous page"
              className="w-8 h-8 grid place-items-center outline outline-1 outline-gray-400 disabled:opacity-50"
            >
              <ChevronLeft color="#444" />
            </button>
            <p className="grid place-items-center px-3 h-8">
              {posts.offset ? posts.totalCount / posts.offset : 1} of {""}
              {Math.ceil(posts.totalCount / posts.limit)}
            </p>
            <button
              onClick={() => fetchPosts(posts.offset + 3)}
              disabled={
                posts.offset * 2 >= posts.totalCount ||
                posts.limit >= posts.totalCount
              }
              aria-label="Next page"
              className="w-8 h-8 grid place-items-center outline outline-1 outline-gray-400 disabled:opacity-50"
            >
              <ChevronRight color="#444" />
            </button>
          </div>
        )
      )}
    </div>
  );
}
