import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
const Register = () => {
   document.title = "Register";
  const { createUser, setUser, updateUser, handleGoogle } = use(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    //console.log(e.target);
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }
    //console.log(name,photo,email,password);
    createUser(email, password)
      .then((result) => {
        document.title = "Register";
        const user = result.user;
        const { uid, email } = user;
        const newUser = { uid, email };
        fetch("https://assi-10-psi.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));

        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Registered successfully!");
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    handleGoogle()
      .then((result) => {
        const user = result.user;
        toast.success("Google login successful!");
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Google login failed: " + error.message);
      });
  };
  return (
    <div className="hero bg-white min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse ">
        <div className="card bg-gradient-to-b from-orange-300 to-white w-80  max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="">Register Here</h1>
            {error && <p className="text-red-700 text-sm">{error}</p>}
            <form onSubmit={handleRegister} action="">
              <fieldset className="fieldset">
                {/* name */}
                <label className="label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Name"
                  required
                />
                {/* photoURL  */}
                <label className="label">photoURL </label>
                <input
                  name="photo"
                  type="url"
                  className="input"
                  placeholder="photoURL"
                  required
                />
                {/* email */}
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                {/* pass */}
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                  required
                />

                <button type="submit" className="btn btn-neutral mt-4">
                  Register
                </button>
                <div className="flex items-center gap-2 justify-center bg-white rounded-lg h-8">
                  <FcGoogle size={20} />
                  {/* Google */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="cursor-pointer font-semibold pt-1 text-[15px]"
                  >
                    Login with Google
                  </button>
                </div>

                <p className="link link-hover text-center font-semibold text-[14px]">
                  Already have an account?{" "}
                  <Link
                    className="text-[#F97316] hover:text-emerald-900"
                    to="/auth/login"
                  >
                    __Login
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;