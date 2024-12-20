import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { useCartStore } from "../store/CartStore";

function SignInPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const user = {
        email: username,
        password: password,
      };
  
      // Step 1: Login API call
      const loginResponse = await axios.post(
        "http://localhost:5454/api/identity/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Check if login is successful by checking response status and message
      if (loginResponse.data.message === "SignIn Success") {
        const { id, token } = loginResponse.data;
  
        console.log("Logged in successfully:", loginResponse.data);
  
        // Step 2: Fetch user profile using token and userId
        const profileResponse = await axios.get(
          `http://localhost:5454/api/identity/profile?id=${id}`,
          {
            headers: {
              Authorization: `${token}`, // Correct format for token
            },
          }
        );

        console.log(profileResponse.data);
  
        // Step 3: Save user and token in the zustand store
        const login = useCartStore.getState().login; // Access the login action
        login(profileResponse.data, token); // Save profile data and token
  
        // Navigate to the last page or default to home if not available
        const lastPage = localStorage.getItem("lastPage") || "/welcome";
        navigate(lastPage);
      } else {
        setErrorMessage("Login failed. Please check your credentials and try again.");
      }
    } catch (err) {
      console.error("Error during Login:", err.response?.data || err.message);
       // Set error message
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {/* Error Notification */}
        {errorMessage && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
            <p>{errorMessage}</p>
          </div>
        )}
        
        {/* White Box Container */}
        <div className="bg-[#FAF7F7] rounded-[50px] shadow-lg w-[400px] p-10">
          <h2 className="text-4xl font-bold mb-6 text-center">Login Page</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
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
                  type="button" 
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
