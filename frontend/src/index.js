import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root';
import Index from './routes/Index';
import { fetchPost } from './api';
import Post from './routes/Post';
import User from './routes/User';
import Admin from './routes/Admin';
import AdminHome from './routes/AdminHome';
import AdminHighlight from './routes/AdminHighlight';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader() {
          // TODO
          return fetchPost();
        },
      },
      {
        path: "/posts/:postId",
        element: <Post />,
        loader({ params }) {
          // TODO
          return null;
        },
      },
      {
        path: "user/:userId",
        element: <User />,
        loader({ params }) {
          // TODO
          return null;
        },
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <AdminHome />,
            loader() {
              // TODO
          return null;
            },
          },
          {
            path: "highlight",
            element: <AdminHighlight />,
            loader() {
              // TODO
              return null;
            }
          }
        ]
        
        
      },
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
