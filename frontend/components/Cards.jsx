import React, { useContext, useState } from "react";
import "../style/Cards.css";
import { FaCartArrowDown } from "react-icons/fa";
import { CartContext } from "./CartContext"; // Import the context

export function Cards({ image, title, price, description }) {
  const { addToCart } = useContext(CartContext); // Access addToCart from context
  const [showPopup, setShowPopup] = useState(false); // For adding a pop-up when adding to cart

  const handleAddToCart = () => {
    const item = {
      image,
      title,
      price,
      description,
    };
    addToCart(item); // Add item to the cart

    //Show popup
    setShowPopup(true);
    //Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="card">
      <img src={image} alt="shirt" className="card-image"></img>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">${price.toFixed(2)}</p>
        <div>
          <h2 className="flex font-bold">Description</h2>
          <p className="card-description text-justify text-[10px] text-gray-700">
            {description}
          </p>
        </div>
        <button
          className="add-to-cart flex items-center gap-2 px-4 py-2 w-40 text-white rounded-md hover:bg-blue-500 transition-all duration-200"
          onClick={handleAddToCart}
        >
          <FaCartArrowDown size={20} />
          <span>Add to cart</span>
        </button>
        {showPopup && (
          <div className="fixed justify-center bg-lime-600 text-white py-10 px-16 rounded shadow-lg z-50">
            Item added to cart!
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;
