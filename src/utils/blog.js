export const listPosts = async (limit, offset, tag) => {
  try {
    const request = await fetch(
      `http://localhost:3000/blog/list-posts?limit=${limit}&tag=${tag}&offset=${offset}`
    );

    const posts = await request.json();

    return posts;
  } catch (error) {
    console.log("Error during Fetching Posts: ", error);
  }
};
