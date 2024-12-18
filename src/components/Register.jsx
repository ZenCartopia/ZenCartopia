import React, { useState } from "react";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Registration Successful!");
    // Here, you can handle form submission, for example, by calling an API
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#bfbfbf] rounded-[50px] shadow-lg w-[500px] p-8 flex flex-col space-y-6 drop-shadow-lg shadow-gray-600">
          <h2 className="text-[50px] font-extrabold text-pink-800 text-opacity-70 mb-6 text-center">
            Registration Page
          </h2>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Username Input */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="username"
                className="mr-4 text-lg font-medium text-gray-700 w-32"
              >
                Username:
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username Here ..."
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full bg-neutral-100"
                required
              />
            </div>

            {/* First Name Input */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="firstName"
                className="mr-4 text-lg font-medium text-gray-700 w-32"
              >
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name . . ."
                value={formData.firstName}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full bg-neutral-100"
                required
              />
            </div>

            {/* Last Name Input */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="lastName"
                className="mr-4 text-lg font-medium text-gray-700 w-32"
              >
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name . . ."
                value={formData.lastName}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full bg-neutral-100"
                required
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="email"
                className="mr-4 text-lg font-medium text-gray-700 w-32"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="*****@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full bg-neutral-100"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="password"
                className="mr-4 text-lg font-medium text-gray-700 w-32"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password****"
                value={formData.password}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full bg-neutral-100"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="confirmPassword"
                className="mr-4 text-lg font-medium text-gray-700 w-32"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password****"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full bg-neutral-100"
                required
              />
            </div>

            <div className="flex justify-between items-center ">
              {/* Login Button */}
              <button
                onClick={() => navigate("/signinpage")}
                type="button"
                className="bg-pink-100 py-2 px-4 rounded-2xl w-40 hover:bg-pink-200 font-bold"
              >
                Login
              </button>

              {/* Register Button */}
              <button
                type="submit"
                className="bg-pink-400 py-2 px-4 rounded-2xl w-40 hover:bg-pink-900 font-bold"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
