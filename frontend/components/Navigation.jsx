import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "../style/Nav.css";
import { VscAccount } from "react-icons/vsc";
import { FiList, FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";

function Navigation({ onSearch }) {
  const navigate = useNavigate(); // Initialize navigate function
  const location = useLocation(); // Get the current location (page)

  // Function to handle account icon click
  const handleAccountClick = () => {
    // Navigate to UserAuth page, doesn't matter what page I am in.
    navigate("/userauth");
  };

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    onSearch(query); // Update global search query in App.jsx
    if (query) {
      navigate("/search");
    }
  };

  return (
    <div className="flex justify-between items-center h-24 mx-auto px-10 py-10 hover:cursor-pointer mt-6 border-b-2 border-gray-500 shadow-md">
      {/* Wrap the heading in a Link to navigate to the Welcome page ("/") */}
      <Link to="/">
        <h1 className="text-[40px] md:text-[40px] drop-shadow-2xl hover:text-slate-600">
          ZenCarToPiA.
        </h1>
      </Link>

      <ul className="flex space-x-6 text-[35px]">
        {/* Use Link component to navigate to the Shirt page */}
        <Link to="/shirt">
          <li className="p-4 hover:text-slate-600">Shirt</li>
        </Link>
        <Link to="/hoodies">
          <li className="p-4 hover:text-slate-600">Hoodies</li>
        </Link>
        <Link to="/hats">
          <li className="p-4 hover:text-slate-600">Hats</li>
        </Link>
      </ul>

      {/* Icons and Search Bar */}
      <div className="flex items-center space-x-6 text-3xl gap-4">
        <>
          {/* Search Bar */}
          <div className="flex items-center border rounded-full px-4 py-2 w-64 hover:scale-110 hover:shadow-lg transition-transform duration-300 border-gray-800">
            <FiSearch size={35} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              className="search-input outline-none w-full bg-transparent text-gray-700"
            />
          </div>
          <FiHeart
            size={35}
            className="hover:scale-110 transition-transform duration-300 hover:text-stone-500"
            aria-label="Favorites"
          />
          <Link to="/cart">
            <FiShoppingCart
              size={35}
              className="hover:scale-110 transition-transform duration-300 hover:text-stone-500"
            />
          </Link>
          {/* Add Link to the UserAuth page */}
          <VscAccount
            size={35}
            className="hover:scale-110 transition-transform duration-300 hover:text-stone-500"
            onClick={handleAccountClick} // Takes to UserAuth page when profile icon clicked
          />
          <FiList
            size={35}
            className="hover:scale-110 transition-transform duration-300 hover:text-stone-500"
          />
        </>
      </div>
    </div>
  );
}

export default Navigation;
