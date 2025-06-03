import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../component/Home";
import Login from "../component/Login";
import Register from "../component/Register";
import Mainlayout from "../Layout/Mainlayout";
import Error from "../component/Error";

export const router = createBrowserRouter([
  {
    path: "/",
 Component : Mainlayout,
    errorElement: <Error />,
    hydrateFallbackElement: (
      <div className="flex items-center justify-center w-full h-screen space-x-2 text-4xl animate-pulse">
        <span
          role="img"
          aria-label="sparkle"
          className="animate-bounce delay-0"
        >
          ✨
        </span>
        <span role="img" aria-label="star" className="animate-bounce delay-100">
          🌟
        </span>
        <span
          role="img"
          aria-label="sparkle"
          className="animate-bounce delay-200"
        >
          ✨
        </span>
        <span role="img" aria-label="star" className="animate-bounce delay-300">
          🌟
        </span>
        <span
          role="img"
          aria-label="sparkle"
          className="animate-bounce delay-500"
        >
          ✨
        </span>
      </div>
    ),

    children: [
      {
        path: "/",
        element: <Home />,
      },
     
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
     
    ],
  },
]);