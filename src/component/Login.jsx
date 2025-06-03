import React, { use, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  
  document.title = "LogIn";
  const [error, setError] = useState("");
  const { signIn, handleForgetPassword,handleGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [useremail, setuseremail] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ email, password });
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(`${location.state ? location.state : "/"}`);

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        setError(errorCode);
      });
  };
  const handleForgotPasswordClick = () => {
    if (useremail) {
      handleForgetPassword(useremail)
        .then(() => {
          toast.success("Password reset email sent!");
        })
        .catch((error) => {
          setError("Error sending email: " + error.message);
        })} }
  return (
    <div className="hero bg-white  ">
      <div className="hero-content flex-col lg:flex-row-reverse ">
        <div className="card  bg-gradient-to-b from-white to-orange-300 text-gray-800 w-80  max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset">
              {/* Email */}
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                onChange={(e) => setuseremail(e.target.value)}
                placeholder="Email"
                required
              />
              {/* password */}
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
                required
              />
              {/* fp */}
              <div>
                <button
                  onClick={handleForgotPasswordClick}  className="link link-hover"
                >
                  Forgot password?
                </button>
                {error && <p className="text-red-900">{error}</p>}
              </div>
              {/* btn */}
              <button type="submit" className="btn bg-[#F97316] text-black border-[#e17d00]  mt-4">
                Login
              </button>
              <div className="flex items-center gap-2 justify-center bg-white rounded-lg h-8">
                <FcGoogle size={20} />
                {/* Google */}
                 <button onClick={handleGoogle} className="cursor-pointer font-semibold pt-1 text-[15px]">
                                 {" "}
                                 Login with Google{" "}
                               </button>
              </div>

              <p className="link link-hover mt-1 text-center font-semibold text-[14px]">
               Need an account? <span className="text-[#af5819]">Join us Now</span>{" "}
                <Link
                  className=" hover:text-emerald-900"
                  to="/auth/register"
                >
                  __Register
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;