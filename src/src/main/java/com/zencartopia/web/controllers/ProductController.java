package com.zencartopia.web.controllers;

import com.zencartopia.web.models.Product;
import com.zencartopia.web.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * Fetch all products along with their category IDs.
     *
     * @return A list of all products with category IDs.
     */
    @GetMapping("/api/products")
    public List<Product> getAllProducts() {
        return productService.getAllProductsWithCategoryId();
    }

    /**
     * Fetch products by a specific category name.
     *
     * @param categoryName The name of the category to filter products by.
     * @return A list of products belonging to the specified category.
     */
    @GetMapping("/api/products/by-category")
    public List<Product> getProductsByCategoryName(@RequestParam("categoryName") String categoryName) {
        return productService.getProductsByCategoryName(categoryName);
    }
}
