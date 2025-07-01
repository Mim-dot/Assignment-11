import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../component/Home";
import Login from "../component/Login";
import Register from "../component/Register";
import Mainlayout from "../Layout/Mainlayout";
import Error from "../component/Error";
import Profile from "../component/Profile";
import PostArticle from "../component/PostArticle";
import MyArticals from "../component/MyArticles";
import AllArticles from "../component/AllArticles";
import Abouts from "../component/Abouts";
import SingleArtical from "../component/SingleArtical";
import Privet from "../Provider/Privet";
import Update from "../component/Update";
import CategoriesList from "../component/CategoriesList";
import MyArticles from "../component/MyArticles";
import { getAuth } from "firebase/auth";
import ContactUs from "../component/ContactUs";
// import myArticlesLoader from "../component/myArticlesLoader";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    errorElement: <Error />,
    hydrateFallbackElement: (
      <div>
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
      </div>
    ),

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/post",
        element: (
          <Privet>
            <PostArticle />
          </Privet>
        ),
      },
      {
        path: "/myarticles/:email",
        element: (
          <Privet>
            <MyArticals />
          </Privet>
        ),
        // loader: myArticlesLoader(),
        // loader: ({ params }) =>
        //   fetch(`https://assi11-mim-dots-projects.vercel.app/myarticles/${params.id}`),
      },
      // routes

      // {
      //   path: "/myarticles/:id",
      //   element: <Privet><MyArticals/></Privet>,
      //   loader: myArticlesLoader,

      // },

      {
        path: "/all",
        element: <AllArticles />,
      },
      {
        path: "/articles/:Science",
        element: <CategoriesList />,
      },

      {
        path: "/singleArtical/:id",
        element: (
          <Privet>
            {" "}
            <SingleArtical />
          </Privet>
        ),
        // loader: ({ params }) =>
        //   fetch(
        //     `https://assi11-mim-dots-projects.vercel.app/articles/${params.id}`
        //   ),
      },
      {
        path: "/update/:id",
        element: (
          <Privet>
            {" "}
            <Update />{" "}
          </Privet>
        ),
        // loader: ({ params }) => fetch(`https://assi11-mim-dots-projects.vercel.app/articles/${params.id}`),
      },
      {
        path: "/about",
        element: <Abouts />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
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
