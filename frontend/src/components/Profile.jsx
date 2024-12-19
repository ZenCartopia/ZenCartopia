import React, { useState, useEffect } from "react";

function Profile() {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    creditCard: "",
    shippingAddress: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState(customerInfo);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/user/profile"); // Update with actual API
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        setCustomerInfo(data);
        setUpdatedInfo(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInfo),
      });

      if (response.ok) {
        setCustomerInfo(updatedInfo);
        setIsEditing(false);
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

      <div className="mt-6 flex space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
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
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
