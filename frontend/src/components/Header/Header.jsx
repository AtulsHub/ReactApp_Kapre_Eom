import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiShoppingCart } from "react-icons/hi2";

const Header = () => {
  const isLogin = useSelector((state) => state.status);
  console.log(isLogin);

  return (
    <>
      <header className="">
        <div className="flex justify-between items-center bg-gray-200 p-2 ">
          <div className="flex justify-center w-full font-bold text-gray-700 ">
            <h3>Get the Job Done | Shop Work</h3>
          </div>
          <ul className="flex gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            |<li>Contact</li>
          </ul>
        </div>
        <div className="flex justify-between py-2 px-8 bg-gray-300 items-center">
          <div className="w-full text-2xl font-bold pl-4">
            <Link to="/">
              <img src="" alt="" />
              <h3 className="text-4xl tracking-widest">Kapre</h3>
            </Link>
          </div>
          <div className="flex py-2 gap-4">
            <div className="flex">
              <input
                type="text"
                placeholder="input Items"
                className="bg-white border-gray-300 rounded-l-md outline-none pl-4 py-1"
              />
              <button className="rounded-r-md bg-amber-100 px-2">Search</button>
            </div>
            <ul className="flex px-2 gap-4">
              <li>
                <Link to="/">
                  <HiShoppingCart className="h-full w-6" />
                </Link>
              </li>

              {isLogin ? (
                <li>
                  <Link to="/profile">profile</Link>
                </li>
              ) : (
                <li>
                  <Link to="/signup">Signup/Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="flex px-8 bg-gray-300 border-t-1">
          <ul className="flex justify-items-start gap-8 pt-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "border-b-4 border-b-cyan-800" : ""
              }
            >
              HOME
            </NavLink>

            <NavLink
              to="/store"
              className={({ isActive }) =>
                isActive ? "border-b-4 border-b-cyan-800" : ""
              }
            >
              STORE
            </NavLink>

            <NavLink
              to="/men"
              className={({ isActive }) =>
                isActive ? "border-b-4 border-b-cyan-800" : ""
              }
            >
              MEN
            </NavLink>

            <NavLink
              to="/women"
              className={({ isActive }) =>
                isActive ? "border-b-4 border-b-cyan-800" : ""
              }
            >
              WOMEN
            </NavLink>

            <NavLink
              to="/children"
              className={({ isActive }) =>
                isActive ? "border-b-4 border-b-cyan-800" : ""
              }
            >
              CHILDREN
            </NavLink>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
