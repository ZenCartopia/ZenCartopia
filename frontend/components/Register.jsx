import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    cardHolderName:"",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    paymentType: "credit_card", 
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        role: formData.role,
        paymentInformation: {
          cardHolderName: formData.cardHolderName,
          cardNumber: formData.cardNumber,
          cvv: formData.cvv,
          expiryDate: formData.expiryDate,
          paymentType: formData.paymentType,
        },
      };
  
      const res = await axios.post("http://localhost:5454/api/identity/register", JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.data.message === "SignUp Success") {
        console.log("Registration successful:", res.data);
        sessionStorage.setItem("token", res.data.token);
        navigate("/welcome");
      }
    } catch (err) {
      console.error("Error during registration:", err.response?.data || err.message);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#bfbfbf] rounded-[50px] shadow-lg w-[500px] p-8 flex flex-col space-y-6 drop-shadow-lg shadow-gray-600">
        <h2 className="text-[50px] font-extrabold text-pink-800 text-opacity-70 mb-6 text-center">
          Registration Page
        </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Username Input */}
          <InputField label="Username" name="username" value={formData.username} onChange={handleChange} />

          {/* First Name Input */}
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />

          {/* Last Name Input */}
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />

          {/* Email Input */}
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />

          {/* Password Input */}
          <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />

          {/* Confirm Password Input */}
          <InputField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />

          {/* Address Input */}
          <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />

          {/* Card Holder Name Input */}
          <InputField label="Card Holder Name" name="cardHolderName" value={formData.cardHolderName} onChange={handleChange} />

          {/* Card Number Input */}
          <InputField label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />

          {/* CVV Input */}
          <InputField label="CVV" name="cvv" value={formData.cvv} onChange={handleChange} />

          {/* Expiry Date Input */}
          <InputField label="Expiry Date (MM/YY)" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />

          {/* Payment Type Input */}
          <InputField label="Payment Type" name="paymentType" value={formData.paymentType} onChange={handleChange} />

          <div className="flex justify-between items-center">
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
  );
}

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div className="flex items-center mb-4">
    <label htmlFor={name} className="mr-4 text-lg font-medium text-gray-700 w-32">
      {label}:
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={`${label} Here...`}
      value={value}
      onChange={onChange}
      className="border rounded-lg p-2 w-full bg-neutral-100"
      required
    />
  </div>
);

export default Register;
