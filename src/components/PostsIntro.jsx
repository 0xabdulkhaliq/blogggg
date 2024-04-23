import { ArrowDown } from "react-feather";
import { useState, useEffect } from "react";
import { listPosts } from "../utils/blog";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import ServiceUnavailable from "./ServiceUnavailable";

export default function PostsIntro() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(false);

  const getPosts = async () => {
    const result = await listPosts(3, 0, "all");

    setPosts(result.posts);
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  useEffect(() => {
    setTimeout(() => {
      getPosts().finally(() => setLoading(false));
    }, 250);
  }, []);

  return !loading && !posts ? (
    <ServiceUnavailable />
  ) : (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-3 mb-4 max-w-[82rem] mx-auto">
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          posts.map((post) => (
            <Card
              key={post._id}
              title={post.title}
              cover={post.cover}
              date={post.createdAt}
              id={post._id}
            />
          ))
        )}
      </div>
      <div className="my-9 flex flex-col justify-center items-center">
        <p>More</p>
        <ArrowDown color="#444" className="mt-2 animate-bounce" />
      </div>
    </>
  );
}
