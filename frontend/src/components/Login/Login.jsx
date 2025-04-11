import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { login } from "../../store/userSlice.js";
import userService from "../../backendConnect/user.js";
import { useDispatch } from "react-redux";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyUser = async (email, password) => {
    try {
      const response = await userService.login(email, password);
      if (response.message === true) {
        dispatch(login(response));
        navigate("/");
      } else setError(response.message);
    } catch (error) {
      console("login error", error);
    }
  };

  console.log(email);

  return (
    <div className="flex h-svh w-full justify-center items-center bg-gray-200 ">
      <title>Kapre | Login </title>
      <div
        className="relative z-0 bg-cover bg-center bg-no-repeat w-110 h-120 rounded-2xl"
        style={{ backgroundImage: "url('./heroBg.jpg')" }}
      >
        <div className="absolute z-0 h-full w-full rounded-2xl bg-[#0000009e]">
          <h1 className="text-5xl text-center text-amber-50 mt-8 ">Login</h1>

          <div className="flex flex-col items-center gap-6 px-8 pb-4 relative z-10 h-full w-full text-amber-50">
            <label className="h-10 text-red-500"> {error}</label>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-gray-100 ml-1"> Email.</label>
              <input
                type="email"
                className="w-full px-4 py-2 items-center text-black outline-none rounded-md bg-gray-100"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-gray-100 ml-1"> Passcode.</label>
              <div className="flex">
                <input
                  type={show ? "text" : "password"}
                  className="w-full px-4 py-2 items-center text-black outline-none rounded-l-md bg-gray-100"
                  placeholder="Enter your passcode"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
                <button
                  className="bg-gray-100 text-black rounded-r-md px-4"
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    <RiEyeCloseFill className="w-8" />
                  ) : (
                    <FaEye className="w-8" />
                  )}
                </button>
              </div>
            </div>
            {console.log(email)}
            <button
              className="w-40 py-2 border-2 text-black bg-green-300 rounded-md border-green-400 hover:bg-green-500"
              onClick={() => {
                verifyUser(email, password);
              }}
            >
              Login
            </button>

            <label>
              New user
              <Link className="text-blue-300 underline pl-1" to="/signup">
                Sign up
              </Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
