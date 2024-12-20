import React, { useContext, useState, useEffect } from "react";
import "../style/Cards.css";
import { FaCartArrowDown } from "react-icons/fa";
import { useCartStore } from "../store/CartStore";

export function Cards({ id, image, title, price, description, productId, aquantity }) {
  const { addToCart } = useCartStore();
  const [showPopup, setShowPopup] = useState(false); // For adding a pop-up when adding to cart

  const handleAddToCart = () => {
    const item = {
      id, 
      image,
      title,
      price,
      description,
      aquantity
    };
    addToCart(item); // Add item to the cart

    // Show popup
    setShowPopup(true);
    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="card bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-200">
      <img src={image} alt={title} className="card-image rounded-md mb-4 w-full h-48 object-cover" />
      <div className="card-content">
        <h2 className="card-title text-xl font-semibold">{title}</h2>
        <p className="card-text text-lg text-gray-800">${price.toFixed(2)}</p>
        
        <div className="my-4">
          <h2 className="font-bold text-gray-600">Description</h2>
          <p className="card-description text-justify text-sm text-gray-700">{description}</p>
        </div>

        {/* Display the available quantity from the backend */}
        <div className="my-4">
          {/* <h3 className="font-bold text-gray-600">Available Quantity: {quantity}</h3> */}
          {aquantity === 0 ? (
            <p className="text-red-500">Out of Stock</p>
          ) : (
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="quantity" className="text-gray-600 font-semibold">Available Quantity: {aquantity}</label>
            </div>
          )}
        </div>

        <button
          className="add-to-cart flex items-center gap-2 px-4 py-2 w-full text-white rounded-md bg-blue-600 hover:bg-blue-500 transition-all duration-200"
          onClick={handleAddToCart}
        >
          <FaCartArrowDown size={20} />
          <span>Add to cart</span>
        </button>

        {showPopup && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-lime-600 text-white py-3 px-8 rounded shadow-lg z-50">
            Item added to cart!
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;
