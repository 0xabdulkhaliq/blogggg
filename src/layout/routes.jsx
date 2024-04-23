import Layout from "./Layout";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import About from "../pages/About";
import Authenticate from "../pages/Authenticate";

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
        element: <Authenticate />,
      },
      {
        path: "signup",
        element: <Authenticate />,
      },
    ],
  },
];

export default routes;
