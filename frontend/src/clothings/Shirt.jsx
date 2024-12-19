import React, { useState, useEffect } from "react";
import Cards from "../components/Cards.jsx";
import "../style/Cards.css";

function Shirt({ searchQuery }) {
  const [sortOption, setSortOption] = useState("name-asc");
  const [shirtsData, setShirtsData] = useState([]);

  const query = searchQuery ? searchQuery.toLowerCase() : "";

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch("http://localhost:5454/api/products/by-category?categoryName=Shirts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setShirtsData(data);
      } catch (error) {
        console.error("Error fetching shirts products:", error);
      }
    };
  
    fetchProductsByCategory();
  }, []);

  // Filter shirts based on the search query
  const filteredShirts = shirtsData.filter((shirt) =>
    `${shirt.title} ${shirt.description}`.toLowerCase().includes(query)
  );

  // Sort shirts based on the selected sort option
  const sortedShirts = [...filteredShirts].sort((a, b) => {
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
        <label htmlFor="sortBy" className="text-lg text-slate-900 font-semibold">
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

      {/* Render sorted and filtered shirt cards */}
      <div className="card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedShirts.length > 0 ? (
          sortedShirts.map((shirt, index) => (
            <Cards
              key={index}
              image={".." + shirt.imageUrl}
              title={shirt.title}
              price={shirt.price}
              description={shirt.description}
              quantity={shirt.quantity}
            />
          ))
        ) : (
          <p className="text-center text-xl font-semibold text-gray-700">
            No results found for "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
}

// Export getData to access the shirts data
Shirt.getData = () => shirtsData;

export default Shirt;
