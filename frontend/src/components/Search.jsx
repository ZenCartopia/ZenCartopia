import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";

function Search({ searchQuery }) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching

        // Fetch data for each category from the backend
        const fetchCategoryData = async (category) => {
          const response = await fetch(`http://localhost:5454/api/products/by-category?categoryName=${category}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          return data;
        };

        // Fetch products for each category
        const hoodiesData = await fetchCategoryData("Hoodies");
        console.log(hoodiesData);
        const shirtsData = await fetchCategoryData("Shirts");
        const hatsData = await fetchCategoryData("Hats");

        // Combine all the fetched products into a single array
        setAllProducts([...hoodiesData, ...shirtsData, ...hatsData]);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching all products:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchAllData();
  }, []);

  // Filter products based on the search query
  const query = searchQuery ? searchQuery.toLowerCase() : "";
  const filteredProducts = allProducts.filter((product) =>
    `${product.title} ${product.description}`.toLowerCase().includes(query)
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 p-6">All Search Results</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <Cards
              key={index}
              image={"/public/" + product.imageUrl}
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
