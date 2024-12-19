import React, { useState, useEffect } from "react";
import Cards from "../components/Cards.jsx";
import "../style/Cards.css";
import hoodie1 from "../assets/hoodie1.png";
import hoodie2 from "../assets/hoodie2.png";
import hoodie3 from "../assets/hoodie3.png";
import hoodie4 from "../assets/hoodie4.png";
import hoodie5 from "../assets/hoodie5.png";

function Hoodies({ searchQuery }) {
  const [sortOption, setSortOption] = useState("name-asc");
  const [hoodiesData, setHoodiesData] = useState([]);

  // Filter hoodies based on search query
  const filteredHoodies = hoodiesData.filter((hoodie) =>
    `${hoodie.title} ${hoodie.description}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch("http://localhost:5454/api/products/by-category?categoryName=Hoodies");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setHoodiesData(data);
      } catch (error) {
        console.error("Error fetching hoodies products:", error);
      }
    };
  
    fetchProductsByCategory();
  }, []);

  // Sort filtered hoodies
  const sortedHoodies = [...filteredHoodies].sort((a, b) => {
    const [sortBy, sortOrder] = sortOption.split("-");
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    }
    return 0;
  });

  return (
    <div>
      {/* Dropdown menu for sorting */}
      <div className="sort-controls mb-4 flex items-center justify-start space-x-4 p-6">
        <label
          htmlFor="sortBy"
          className="text-lg text-slate-900 font-semibold"
        >
          Sort By:
        </label>
        <select
          id="sortBy"
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
          className="border px-2 py-1 rounded border-b-orange-200 shadow-xl bg-orange-100"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
      <div className="card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedHoodies.length > 0 ? (
          sortedHoodies.map((hoodie, index) => (
            <Cards
              key={index}
              image={".."+hoodie.imageUrl}
              title={hoodie.title}
              price={hoodie.price}
              description={hoodie.description}
            />
          ))
        ) : (
          <p className="text-center text-lg font-medium text-gray-700">
            No results found for "{searchQuery}".
          </p>
        )}
      </div>
    </div>
  );
}

// Export getData to access the hoodies data
Hoodies.getData = () => hoodiesData;
export default Hoodies;
