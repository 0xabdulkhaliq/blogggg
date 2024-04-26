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
    const request = await fetch(`http://localhost:3000/blog/view-post/${id}`);
    return await request.json();
  } catch (error) {
    console.log("Error during Fetching Posts: ", error);
  }
};
