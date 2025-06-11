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
import CategoriesList from '../component/CategoriesList';
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
        path: "/profile", 
        element: <Profile />,
      },
      

       {
        path: "/post", 
         element:(
  <Privet><PostArticle /></Privet>
          
        ) ,
      },
      {
        path: "/myarticles/:id",
        element:(
  <Privet><MyArticals/></Privet>
          
        ) ,
        loader: ({ params }) =>
          fetch(`http://localhost:9000/myarticals/${params.id}`),
      },
 
      {
        path: "/all", 
        element: <AllArticles />,
        
      },
      {
        path: "/articles/:Science", 
        element:  <CategoriesList/>,
       
      },
      
      {
        path: "/singleArtical/:id", 
        element: <SingleArtical/>,
       loader: ({ params }) =>
  fetch(`http://localhost:9000/articles/${params.id}`)

      },
      {
        path: "/update/:id", 
        element: <Update />,
          loader: ({ params }) => fetch(`http://localhost:9000/articles/${params.id}`),
      },
      {
        path: "/about", 
        element: <Abouts />,
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