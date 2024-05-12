import { useLocation } from "react-router-dom";
import { viewPost } from "../utils/blog";
import { useState, useEffect } from "react";
import PostEditor from "./PostEditor";

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

  if (!post) {
    return <div>Loading...</div>;
  }

  return <PostEditor post={post} toUpdatePost={true} />;
}
