import React, { useState } from "react";
import assets from "../assets/assets";

const Login = () => {
  const [currState, setCurrentState] = useState("Sign Up"); // Fixed from "Signup"
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false); // Changed to boolean

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsDataSubmitted(true);
    // You can proceed with form handling logic here
  };

  return (
    <div className="flex min-h-screen bg-cover bg-center items-center justify-center gap-8 sm:justify-evenly max-smn:flex-col backdrop-blur-2xl">
      {/* left */}
      <img
        src={assets.logo_big}
        alt="logo"
        className="w-[min(30vw,250px)] max-sm:w-[min(50vw,250px)]"
      />

      {/* right */}
      <form
        onSubmit={handleSubmit}
        className="border-2 bg-white/8 text-white border-gray-500 flex flex-col gap-6 rounded-lg shadow-lg p-6"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {currState === "Sign Up" && isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="arrowIcon"
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === "Sign Up" && !isDataSubmitted && (
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {/* Show bio only after "Create Account" is clicked */}
        {currState === "Sign Up" && isDataSubmitted && (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
            placeholder="Provide a short bio..."
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign Up" ? (
            <div className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-violet-500 cursor-pointer"
                onClick={() => {
                  setCurrentState("Login");
                  setIsDataSubmitted(false);
                }}
              >
                Login
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <button
                type="button"
                className="font-medium text-violet-500 cursor-pointer"
                onClick={() => {
                  setCurrentState("Sign Up");
                  setIsDataSubmitted(false);
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
