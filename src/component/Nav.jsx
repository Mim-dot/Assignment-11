import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch(console.error);
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-primary font-semibold' : ''
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all"
          className={({ isActive }) =>
            isActive ? 'text-primary font-semibold' : ''
          }
        >
          All Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'text-primary font-semibold' : ''
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 bg-white text-[#1F2937] border-[#E5E7EB] border-b hover:bg-[#f4f4f7] backdrop-blur-md  shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost italic text-2xl text-[#77c97d] font-bold ">Lilo</a>
      </div>

      {/* Mobile Menu */}
      <div className="dropdown lg:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {navLinks}
        </ul>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Right Side: Avatar or Login Button */}
      <div className="flex-none">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                   src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                    }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/myarticals" >
                  My Articles
                </NavLink>
              </li>
              <li><NavLink to="/post">Post Article</NavLink></li>
              <li><NavLink to="/profile">Profile</NavLink></li>
              <li><button onClick={handleLogOut}>Log out</button></li>
            </ul>
          </div>
        ) : (
          <NavLink to="/auth/login" className="btn btn-primary btn-sm">
            Log In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Nav;
