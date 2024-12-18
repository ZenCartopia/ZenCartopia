import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios

function SignInPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email: username,
        password: password
      };
      const res = await axios.post("http://localhost:5454/api/identity/login", JSON.stringify(user), {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log("Logged in successfully:", res.data);
      if (res.data.message == "SignIn Success") {
        sessionStorage.setItem("token", res.data.token);
        navigate("/welcome"); 
      }
    } catch (err) {
      console.error("Error during Login:", err.response?.data || err.message);
    }
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
              {/* Forgot password link */}
              <a href="/forgot-password" className="flex text-center text-blue-500 p-3 text-xl">
                Forgot your password?
              </a>
              <h2>
                <a href="/register" className="flex text-pink-500 p-3 text-xl">
                  Not a member yet?
                </a>
              </h2>
              <div className="flex justify-between items-center w-full">
                {/* Register button */}
                <button
                  type="button" // Prevent form submission
                  onClick={() => navigate("/register")}
                  className="flex justify-start right-4 bg-pink-300 rounded-2xl py-2 px-5 text-2xl"
                >
                  Register
                </button>
                {/* Login button */}
                <button type="submit" className="flex left-4 bg-pink-100 rounded-2xl py-2 px-5 text-2xl">
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
