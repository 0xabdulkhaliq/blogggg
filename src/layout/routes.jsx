import Layout from "./Layout";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import About from "../pages/About";
import Authenticate from "../pages/Authenticate";
import BlogPost from "../components/BlogPost";
import Admin from "./Admin";
import PostEditor from "../pages/PostEditor";
import Posts from "../components/Posts";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "login",
        element: <Authenticate action={"Login"} />,
      },
      {
        path: "signup",
        element: <Authenticate action={"Sign Up"} />,
      },
      {
        path: "post/:postId",
        element: <BlogPost />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            index: true,
            element: <Posts postInitLimit={3} showTags={true} isAdmin={true} />,
          },
          {
            path: "create-post",
            element: <PostEditor />,
          },
        ],
      },
    ],
  },
];

export default routes;
