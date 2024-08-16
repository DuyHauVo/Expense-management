import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Categories from "./components/Categories";
import List from "./components/List";
import Login from "./components/Login";
import Register from "./components/Register";
import Progress from "./components/Progress";
import ConvertNav from "./components/ConvertNav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ConvertNav />,
    children: [
      {
        path: "/home/:id",
        element: <Home />,
      },
      {
        path: "/add-cate",
        element: <Categories />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/baocao",
        element: <Progress />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
