import React, { useState } from "react";
import Cards from "../components/Cards.jsx";
import "../style/Cards.css";
import hat1 from "../assets/hat1.png";
import hat2 from "../assets/hat2.png";
import hat3 from "../assets/hat3.png";

// Static data for hats
const hatsData = [
  {
    image: hat1,
    title: "Dota 2 Tidehunter",
    price: 45,
    description: "Bucket Hat",
  },
  { image: hat2, title: "Oakita", price: 35, description: "Baseball Hat" },
  {
    image: hat3,
    title: "Dota 2 Hat",
    price: 30,
    description: "Baseball Cap",
  },
];

function Hats({ searchQuery }) {
  const [sortOption, setSortOption] = useState("name-asc");

  const query = searchQuery ? searchQuery.toLowerCase() : "";

  // Filter hats based on the search query
  const filteredHats = hatsData.filter((hat) =>
    `${hat.title} ${hat.description}`.toLowerCase().includes(query)
  );

  // Sort hats based on the selected sort option
  const sortedHats = [...filteredHats].sort((a, b) => {
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

      {/* Render sorted and filtered hat cards */}
      <div className="card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedHats.length > 0 ? (
          sortedHats.map((hat, index) => (
            <Cards
              key={index}
              image={hat.image}
              title={hat.title}
              price={hat.price}
              description={hat.description}
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

// Export getData to access the hats data
Hats.getData = () => hatsData;

export default Hats;
