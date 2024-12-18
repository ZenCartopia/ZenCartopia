import React, { useState } from "react";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Sign-in details:\nUsername: ${username}\nPassword: ${password}`);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {/* White Box Container */}
        <div className="bg-[#FAF7F7] rounded-[50px] shadow-lg w-[400px] p-10">
          <h2 className="text-4xl font-bold mb-6 text-center">Login Page</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text" // Changed from email to text
                placeholder="Username" // Updated placeholder
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Updated state
                className="border rounded-lg p-2 w-full mx-auto"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg p-2 w-full mx-auto"
                required
              />
            </div>
            <div>
              {/* This should be the link */}
              <a href="" className="flex text-center text-blue-500 p-3 text-xl">
                Forgot your password?
              </a>
              <h2>
                <a href="" className="flex text-pink-500 p-3 text-xl">
                  Not a member yet?
                </a>
              </h2>
              <div className="flex justify-between items-center w-full">
                {/* Register button */}
                <button
                  onClick={() => navigate("/register")}
                  className="flex justify-start right-4 bg-pink-300 rounded-2xl py-2 px-5 text-2xl"
                >
                  Register
                </button>
                {/* Login button */}
                <button className="flex left-4 bg-pink-100 rounded-2xl py-2 px-5 text-2xl">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
