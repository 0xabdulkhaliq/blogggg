export const listPosts = async (limit, offset, tag, isPublished) => {
  try {
    const request = await fetch(
      `https://blogggg-backend.vercel.app/blog/list-posts?limit=${limit}&tag=${tag}&offset=${offset}${
        isPublished ? "" : "&isNotPublished=true"
      }`,
      { credentials: "include" }
    );
    return await request.json();
  } catch (error) {
    console.log("Error during Fetching Posts: ", error);
  }
};

export const viewPost = async (id) => {
  try {
    const postReq = await fetch(
      `https://blogggg-backend.vercel.app/blog/view-post/${id}`
    );
    const post = await postReq.json();

    return post;
  } catch (error) {
    console.log("Error during Fetching Posts: ", error);
  }
};

export const viewCommentsForPost = async (id) => {
  try {
    const commentsReq = await fetch(
      `https://blogggg-backend.vercel.app/blog/${id}/comments`
    );
    const comments = await commentsReq.json();

    return comments.data;
  } catch (error) {
    console.log("Error during Fetching Comments: ", error);
  }
};
