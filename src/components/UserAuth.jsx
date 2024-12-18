import React from "react";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

function UserAuth() {
  const navigate = useNavigate(); // React Router's navigation hook
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#bfbfbfb4] rounded-[50px] shadow-lg w-[600px] h-[400px] p-10 flex flex-col items-center justify-center drop-shadow-lg shadow-gray-600">
          {/* Heading with added margin and custom styling */}
          <h1 className="text-[50px] font-extrabold text-purple-950 text-opacity-70 mb-6">
            Before we begin!
          </h1>

          {/* Buttons with scale effect */}
          <button
            onClick={() => navigate("/signinpage")}
            className="flex bg-blue-300 items-center rounded-2xl py-2 px-5 text-2xl border-rose-900 mb-8 transform transition-transform duration-300 hover:scale-110"
          >
            I'm already a member!
          </button>
          <button
            onClick={() => navigate("/register")}
            className="flex bg-pink-900 bg-opacity-80 items-center rounded-2xl py-2 px-5 text-2xl border-purple-950 transform transition-transform duration-300 hover:scale-110"
          >
            I'm not a member yet!!
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserAuth;
