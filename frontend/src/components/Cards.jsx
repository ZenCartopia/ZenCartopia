import React, { useState } from "react";
import "../style/Cards.css";
import { FaCartArrowDown } from "react-icons/fa";
import { useCartStore } from "../store/CartStore";

export function Cards({ image, title, price, description }) {
  const { addToCart } = useCartStore();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    addToCart({ image, title, price, description });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">${price.toFixed(2)}</p>
        <p className="card-description">{description}</p>
        <button
          className="add-to-cart flex items-center gap-2 px-4 py-2 w-40 rounded-md bg-blue-600 text-white hover:bg-blue-500"
          onClick={handleAddToCart}
        >
          <FaCartArrowDown size={20} />
          Add to Cart
        </button>
        {showPopup && (
          <div className="popup bg-green-500 text-white rounded p-2 mt-2">
            Item added to cart!
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;
