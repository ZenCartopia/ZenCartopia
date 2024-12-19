import React, { useEffect, useState } from 'react';
import { useCartStore } from '../store/CartStore';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UserProfile = () => {
  // Access user and the store actions from useCartStore
  const { user, token, login, logout } = useCartStore((state) => state);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    address: '',
    password: '',
  });

  // Fetch user data when the component mounts
  useEffect(() => {
    if (!user) return;
    setUserInfo({
      fullName: user.fullName,
      address: user.address,
      password: '', // Initially, password is empty
    });
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Merge the current user data with the updated user info
      const updatedUser = {
        ...user,          // The current user data
        ...userInfo,      // The new fields user wants to update
      };
  
      // Send the merged data to the backend
      const response = await axios.put(`http://localhost:5454/api/identity/profile/${user.id}`, updatedUser, {
        headers: {
          Authorization: `${token}`, // Ensure token is included in the request header
        },
      });
  
      login(updatedUser, token);
      setIsEditing(false);     // Turn off the editing mode
    } catch (error) {
      console.error('Error updating user information', error); // Handle error if the update fails
    }
  };
  

  const handleSignOut = () => {
    logout();
    
    axios.post('http://localhost:5454/api/identity/logout', null,  {
        headers: {Authorization: token}
    })
      .then(response => {
        // Handle sign-out success
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error signing out:", error);
      });
      navigate("/welcome");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      
      {user ? (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <p className="text-lg">{user.username}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <p className="text-lg">{user.email}</p>
          </div>

          {isEditing ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Shipping Address:</label>
                <input
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                <p className="text-lg">{user.fullName}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address:</label>
                <p className="text-lg">{user.address}</p>
              </div>
              
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit Information
              </button>
            </>
          )}

          {/* Purchase History */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Purchase History</h3>
            <ul className="space-y-4">
              {user.orders.map((order) => (
                <li key={order.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <h4 className="text-lg">Order ID: {order.id}</h4>
                  <p className="text-sm">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm">Total: ${order.totalAmount}</p>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleSignOut}
            className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p className="text-lg text-gray-500">Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default UserProfile;
