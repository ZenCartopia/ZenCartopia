import React, { useState, useEffect } from "react";

function ProfilePage() {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    creditCard: "",
    shippingAddress: "",
  });

  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [updatedInfo, setUpdatedInfo] = useState(customerInfo); // Local state for form

  useEffect(() => {
    // Fetch customer info from API or backend
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/user/profile"); // Replace with your API endpoint
        const data = await response.json();
        setCustomerInfo(data); // Set initial data
        setUpdatedInfo(data); // Sync with editable fields
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Simulate API call to save updated info
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInfo),
      });

      if (response.ok) {
        setCustomerInfo(updatedInfo); // Save changes locally
        setIsEditing(false); // Exit edit mode
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-gray-50 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-semibold text-gray-700">Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={updatedInfo.name}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          ) : (
            <p>{customerInfo.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={updatedInfo.email}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          ) : (
            <p>{customerInfo.email}</p>
          )}
        </div>

        {/* Credit Card */}
        <div>
          <label className="block font-semibold text-gray-700">
            Credit Card
          </label>
          {isEditing ? (
            <input
              type="text"
              name="creditCard"
              value={updatedInfo.creditCard}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          ) : (
            <p>{customerInfo.creditCard}</p>
          )}
        </div>

        {/* Shipping Address */}
        <div>
          <label className="block font-semibold text-gray-700">
            Shipping Address
          </label>
          {isEditing ? (
            <textarea
              name="shippingAddress"
              value={updatedInfo.shippingAddress}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          ) : (
            <p>{customerInfo.shippingAddress}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
