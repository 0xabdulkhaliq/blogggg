import {
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  PlusCircle,
} from "react-feather";
import { useState, useEffect } from "react";
import { listPosts } from "../utils/blog";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import ServiceUnavailable from "./ServiceUnavailable";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

export default function Posts({
  postInitLimit,
  showTags,
  showViewMoreOption,
  isAdmin,
}) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(false);
  const [isPublished, setPublished] = useState(true);
  const [tag, setTag] = useState("All");
  const [deleteModal, setDeleteModal] = useState(null);
  const navigate = useNavigate();

  const openPostEditor = (id) => {
    navigate("/admin/edit-post", { state: { postId: id } });
  };

  const deletePost = (id) => {
    setDeleteModal(false);
    setLoading(true);

    fetch(`http://localhost:3000/blog/delete-post/${id}?delete=true`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        setPosts({ posts: posts.posts.filter((item) => item._id !== id) });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const getPosts = async (offset) => {
    const result = await listPosts(
      postInitLimit,
      offset || 0,
      tag,
      isAdmin ? isPublished : true
    );
    setPosts(result);

    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const toggleReset = (func) => {
    func();
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
  }, [tag, isPublished]);

  return !loading && !posts ? (
    <ServiceUnavailable />
  ) : (
    <div
      className={`mb-4 min-h-[70svh] w-full max-w-[82rem] mx-auto ${
        loading && "w-full"
      }`}
    >
      {showTags && (
        <div
          className={`sticky bg-gray-50 shadow-[0_20px_20px_#f9fafb] ${
            isAdmin ? "-top-1" : "top-[3.65rem]"
          } md:top-[3.65rem] z-10 flex flex-col md:flex-row gap-4 items-center justify-center md:justify-end pt-5 pb-2 mb-5 md:px-3 md:gap-8`}
        >
          {isAdmin && (
            <>
              <Link
                to={"create-post"}
                className="gap-2 items-center uppercase tracking-wider hidden md:flex absolute left-3"
              >
                <PlusCircle strokeWidth={1} color="#444" />
                Add Post
              </Link>
              <div className="px-6 w-full md:p-0 md:w-auto flex justify-between items-center">
                <Link
                  to={"create-post"}
                  className="flex gap-2 items-center uppercase tracking-wider md:hidden"
                >
                  <PlusCircle strokeWidth={1} color="#444" />
                  Add Post
                </Link>

                <div className="flex gap-4 items-center">
                  Published
                  <div className="w-12 h-6 outline outline-1 outline-gray-400 relative">
                    <div
                      className={`w-6 h-6 bg-gray-800 transition-transform ${
                        isPublished &&
                        "translate-x-full rotate-[135deg] scale-110"
                      }`}
                    ></div>
                    <button
                      onClick={() =>
                        toggleReset(() => {
                          setPublished(!isPublished);
                        })
                      }
                      type="button"
                      className="absolute inset-0 w-full"
                      aria-pressed={isPublished}
                    ></button>
                  </div>
                </div>
              </div>
              <div className="w-11/12 mx-auto h-[1px] bg-gray-300 md:w-[1px] md:h-7 md:m-0"></div>
            </>
          )}
          <div className="flex w-full md:w-auto justify-evenly md:gap-4">
            {["All", "Frontend", "Backend", "Extras"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  toggleReset(() => {
                    setTag(item);
                  })
                }
                disabled={tag === item}
                className={`px-4 py-1 outline outline-1 outline-gray-400 disabled:bg-gray-800 disabled:text-gray-50`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid px-3 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array(postInitLimit)
            .fill()
            .map((_, index) => <CardSkeleton key={index} />)
        ) : posts.posts.length ? (
          posts.posts.map((post) => (
            <Card
              key={post._id}
              title={post.title}
              cover={post.cover}
              date={post.createdAt}
              description={post.description}
              id={post._id}
              showOptions={isAdmin}
              deletePost={isAdmin && setDeleteModal}
              editPost={isAdmin && openPostEditor}
            />
          ))
        ) : (
          <div className="mt-20 w-full col-span-3 text-center">
            <h2 className="text-center text-lg">
              No posts have founded, <span className="block md:hidden"></span>
              Please add new ones.
            </h2>
          </div>
        )}
      </div>
      {showViewMoreOption ? (
        <Link
          to={"/blog"}
          className="my-9 flex items-center flex-col justify-center mx-auto"
        >
          View More
          <ArrowDown color="#444" className="mt-2 animate-bounce" />
        </Link>
      ) : posts && posts.posts.length ? (
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
            {Math.floor(posts.offset ? posts.totalCount / posts.offset : 1)} of{" "}
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
      ) : null}
      {isAdmin && (
        <ConfirmationModal
          modalVisibility={deleteModal}
          toggleVisibility={setDeleteModal}
          confirmFunction={deletePost}
        />
      )}
    </div>
  );
}
