import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiList } from "react-icons/fi";
import "../style/Hamburger.css";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    // Prevent background scrolling
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleNavigation = (path) => {
    setIsOpen(false);
    document.body.style.overflow = "auto"; // Restore scrolling after navigation
    navigate(path);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <FiList
        size={35}
        className="cursor-pointer text-gray-700"
        aria-label="Open menu"
        onClick={toggleMenu}
      />

      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "visible" : ""}`}
        onClick={toggleMenu}
      ></div>

      {/* Sliding Menu */}
      <div
        className={`hamburger-menu ${isOpen ? "open" : ""}`}
        role="menu"
        aria-hidden={!isOpen}
      >
        {/* Close Button */}
        <button
          className="close-btn"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          &times;
        </button>

        {/* Menu Links */}
        <nav className="flex flex-col items-start p-6 space-y-4">
          <button
            className="text-lg text-gray-800 hover:text-blue-500"
            onClick={() => handleNavigation("/profile")}
          >
            Profile
          </button>
          <button
            className="text-lg text-gray-800 hover:text-blue-500"
            onClick={() => handleNavigation("/welcome")}
          >
            Welcome
          </button>
          <button
            className="text-lg text-gray-800 hover:text-blue-500"
            onClick={() => handleNavigation("/signinpage")}
          >
            Sign Out
          </button>
        </nav>
      </div>
    </>
  );
}

export default HamburgerMenu;
