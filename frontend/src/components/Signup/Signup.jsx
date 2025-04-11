import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import userService from "../../backendConnect/user.js";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(true);
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();
  const formData = new FormData();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setProfilePic(file); // Store the raw file object
    }
  };

  const verifyUser = async (profilePic, name, email, password) => {
    formData.append("profilePic", profilePic); // file
    formData.append("name", name); // text
    formData.append("email", email); // text
    formData.append("password", password); // text

    try {
      const response = await userService.signup(formData);
      if (response.message === true) {
        setError("User Registered successfully");
        setSignup(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else setError(response.message);
    } catch (error) {
      console.log("login error", error);
    }
  };

  useEffect(() => {
    let objectUrl;
    if (profilePic) {
      objectUrl = URL.createObjectURL(profilePic);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [profilePic]);

  return (
    <div className="flex h-200 w-full justify-center items-center bg-gray-200 ">
      <title>Kapre | Signup </title>

      <div
        className="relative z-0 bg-cover bg-center bg-no-repeat w-200 h-140 rounded-2xl"
        style={{ backgroundImage: "url('./heroBg.jpg')" }}
      >
        <div className="absolute z-0 h-full w-full rounded-2xl bg-[#0000009e]">
          <h1 className="text-5xl text-center text-amber-50 mt-8">Sign up</h1>
          <div className="flex items-center">
            <div className="flex flex-col items-center justify-center gap-6 px-8 py-4 relative z-10 h-1/2 w-full text-amber-50">
              {profilePic ? (
                <img
                  src={URL.createObjectURL(profilePic)}
                  alt="Preview"
                  className="w-50 h-50 mt-2.5 object-cover rounded-[50%] border-3 bg-amber-100 border-gray-400 "
                />
              ) : (
                <img
                  src="./heroBg.jpg"
                  alt="Preview"
                  className="w-50 h-50 mt-2.5 object-cover rounded-[50%] border-3 bg-amber-100 border-gray-400 "
                />
              )}

              <input
                type="file"
                accept="image/*"
                className="w-2/3 h-auto text-center px-6 py-1 text-black outline-none border-2 border-blue-400 rounded-md bg-blue-300"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-6 px-8 py-4 relative z-10 h-full w-full text-amber-50">
              <label
                className={`h-10 ${
                  signup === true ? "text-green-300" : "text-red-400"
                }`}
              >
                {" "}
                {error}
              </label>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-gray-100 ml-1"> User name.</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 items-center text-black outline-none rounded-md bg-gray-100"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                />
              </div>

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

              <button
                className="w-40 py-2 border-2 text-black bg-green-300 rounded-md border-green-400 hover:bg-green-500"
                onClick={() => {
                  verifyUser(profilePic, name, email, password);
                }}
              >
                Signup
              </button>

              <label>
                Already have a account
                <Link className="text-blue-300 underline pl-1" to="/login">
                  Login
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
