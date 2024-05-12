import { useLocation } from "react-router-dom";
import { viewPost } from "../utils/blog";
import { useState, useEffect } from "react";
import PostEditor from "./PostEditor";
import LoadingOverlay from "../components/LoadingOverlay";

export default function EditPost() {
  const { state } = useLocation();
  const { postId } = state;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await viewPost(postId);
      setPost(data);
    };

    fetchPost();
  }, [postId]);

  return !post ? (
    <LoadingOverlay isActive={true} />
  ) : (
    <PostEditor post={post} toUpdatePost={true} />
  );
}
