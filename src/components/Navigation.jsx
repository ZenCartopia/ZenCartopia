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

function Navigation() {
  const navigate = useNavigate(); // Initialize navigate function
  const location = useLocation(); // Get the current location (page)

  // Function to handle account icon click
  const handleAccountClick = () => {
    // Only navigate to UserAuth if the current page is Welcome
    if (location.pathname === "/") {
      navigate("/userauth");
    }
  };

  return (
    <div className="flex justify-between items-center h-24 mx-auto px-10 py-10 hover:cursor-pointer mt-6 border-b-2 border-gray-500 shadow-md">
      {/* <h1 className="text-[55px] hover:text-slate-600">ZenCarToPiA.</h1> */}
      <h1 className="text-[40px] md:text-[40px] drop-shadow-2xl hover:text-slate-600">
        ZenCarToPiA.
      </h1>

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

      <div className="flex items-center space-x-6 text-3xl gap-4">
        <>
          <div className="flex items-center border rounded-full px-4 py-2 w-64 hover:scale-110 hover:shadow-lg transition-transform duration-300 border-gray-800">
            <FiSearch size={35} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="search-input outline-none w-full bg-transparent text-gray-700"
            />
          </div>
          <FiHeart
            size={35}
            className="hover:scale-110 transition-transform duration-300 hover:text-stone-500"
            aria-label="Favorites"
          />
          <FiShoppingCart
            size={35}
            className="hover:scale-110 transition-transform duration-300 hover:text-stone-500"
          />
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
