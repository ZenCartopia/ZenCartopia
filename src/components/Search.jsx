import React from "react";
import Cards from "../components/Cards";
import Hoodies from "../clothings/Hoodies";
import Shirt from "../clothings/Shirt";
import Hats from "../clothings/Hats";

function Search({ searchQuery }) {
  const hoodies = Hoodies.getData();
  const shirts = Shirt.getData();
  const hats = Hats.getData();

  const allProducts = [...hoodies, ...shirts, ...hats];

  const filteredProducts = allProducts.filter((product) =>
    `${product.title} ${product.description}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 p-6">All Search Results</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <Cards
              key={index}
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg font-medium text-gray-700">
          No results found for "{searchQuery}".
        </p>
      )}
    </div>
  );
}

export default Search;
