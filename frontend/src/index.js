import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Index from "./routes/Index";
import { fetchPostById, fetchPosts, fetchUserById } from "./api";
import Post from "./routes/Post";
import User from "./routes/User";
import { AdminProvider } from "./routes/AdminContext";
import Admin from "./routes/Admin";
import AdminLogin from "./routes/AdminLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
        loader({ params }) {
          return fetchPostById(params.postId);
        },
      },
      {
        path: "users/:userId",
        element: <User />,
        loader({ params }) {
          return fetchUserById(params.userId);
        },
      },
      {
        path: "admin",
        element: <Admin />,
        loader() {
          return fetchPosts();
        },
        children: [
          {
            path: "login",
            element: <AdminLogin />,
          }
        ],
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AdminProvider>
    <RouterProvider router={router} />
  </AdminProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
