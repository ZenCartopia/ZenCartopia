import React, { useState } from "react";
import { Link } from "react-router-dom";
import clothe from "../assets/clothe.jpg";
import "../style/Cards.css";
import { FaCartArrowDown } from "react-icons/fa";

export function Cards({ image, title, price, description }) {
  return (
    <div className="card">
      <img src={image} alt="shirt" className="card-image"></img>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{price}</p>
        <div>
          <h2 className="flex font-bold">Description</h2>
          <p className="text-justify text-[10px] text-gray-700">
            {description}
          </p>
        </div>
        <button className="add-to-cart flex items-center gap-2 px-4 py-2 w-40 text-white rounded-md hover:bg-blue-500 transition-all duration-200">
          <FaCartArrowDown size={20} />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}

export default Cards;
