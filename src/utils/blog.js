export const listPosts = async (limit, offset, tag) => {
  try {
    const request = await fetch(
      `http://localhost:3000/blog/list-posts?limit=${limit}&tag=${tag}&offset=${offset}`
    );
    return await request.json();
  } catch (error) {
    console.log("Error during Fetching Posts: ", error);
  }
};

export const viewPost = async (id) => {
  try {
    const postReq = await fetch(`http://localhost:3000/blog/view-post/${id}`);
    const commentsReq = await fetch(
      `http://localhost:3000/blog/${id}/comments`
    );
    const post = await postReq.json();
    const comments = await commentsReq.json();
    post.comments = comments.data;

    return post;
  } catch (error) {
    console.log("Error during Fetching Posts: ", error);
  }
};
