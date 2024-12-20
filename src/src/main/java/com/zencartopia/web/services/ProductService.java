package com.zencartopia.web.services;

import com.zencartopia.web.models.Product;
import com.zencartopia.web.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProductsWithCategoryId() {
        List<Object[]> rawResults = productRepository.findAllProductsWithCategoryId();
        List<Product> products = new ArrayList<>();

        for (Object[] result : rawResults) {
            Product product = new Product();

            // Map the data from the result to the product object
            product.setId((Integer) result[0]);
            product.setTitle((String) result[1]);
            product.setPrice((BigDecimal) result[2]);
            product.setDescription((String) result[3]);
            product.setImageUrl((String) result[4]);

            // Set the categoryId from the query result
            int categoryId = (Integer) result[5];
            product.setCategoryId(categoryId);

            products.add(product);
        }

        return products;
    }

    /**
     * Fetches products for a given category name.
     *
     * @param categoryName The name of the category.
     * @return A list of Product objects belonging to the specified category.
     */
    public List<Product> getProductsByCategoryName(String categoryName) {
        // Fetch raw query results from the repository
        List<Object[]> rawResults = productRepository.findProductsByCategoryName(categoryName);
        List<Product> products = new ArrayList<>();

        // Map raw data to Product objects
        for (Object[] result : rawResults) {
            Product product = new Product();

            // Map the columns to the Product properties
            product.setId((Integer) result[2]); // Product ID
            product.setTitle((String) result[3]); // Product title
            product.setPrice((BigDecimal) result[4]); // Product price
            product.setDescription((String) result[5]); // Product description
            product.setImageUrl((String) result[6]); // Product image URL
            product.setAQuantity((Integer) result[7]); // Product quantity

            // Set the category ID (if needed for the Product model)
            int categoryId = (Integer) result[0];
            product.setCategoryId(categoryId);

            // Add the mapped Product object to the list
            products.add(product);
        }

        return products;
    }
}
