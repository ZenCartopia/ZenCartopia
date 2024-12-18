import React, { useState } from "react";
import Cards from "../components/Cards.jsx";
import "../style/Cards.css";
import shirt1 from "../assets/shirt1.png";
import shirt2 from "../assets/shirt2.png";
import shirt3 from "../assets/shirt3.png";
import shirt4 from "../assets/shirt4.png";
import shirt5 from "../assets/shirt5.png";

// Static data for shirts
const shirtsData = [
  {
    image: shirt1,
    title: "Invoker Shirt",
    price: 20,
    description: "100% cotton",
  },
  {
    image: shirt2,
    title: "Civil Engineering Shirt",
    price: 20,
    description: "100% cotton",
  },
  {
    image: shirt3,
    title: "Marci Shirt",
    price: 15,
    description: "80% cotton and 20% polyester, Hand Wash",
  },
  {
    image: shirt4,
    title: "Make it rain Shirt",
    price: 25,
    description: "100% cotton",
  },
  {
    image: shirt5,
    title: "Phantom Assassin Shirt",
    price: 20,
    description: "100% Organic Cotton, Machine Wash",
  },
];

function Shirt({ searchQuery }) {
  const [sortOption, setSortOption] = useState("name-asc");

  const query = searchQuery ? searchQuery.toLowerCase() : "";

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

      {/* Render sorted and filtered shirt cards */}
      <div className="card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedShirts.length > 0 ? (
          sortedShirts.map((shirt, index) => (
            <Cards
              key={index}
              image={shirt.image}
              title={shirt.title}
              price={shirt.price}
              description={shirt.description}
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
