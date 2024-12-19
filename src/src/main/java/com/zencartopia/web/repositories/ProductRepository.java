package com.zencartopia.web.repositories;

import com.zencartopia.web.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    // Native SQL query to fetch all products with their category_id
    @Query(value = "SELECT p.id AS product_id, p.title AS product_title, p.price AS product_price, p.description AS product_description, " +
            "p.image_url AS product_image_url, p.category_id AS category_id " +
            "FROM products p",
            nativeQuery = true)
    List<Object[]> findAllProductsWithCategoryId();

    @Query(value = "SELECT c.id AS category_id, c.name AS category_name, p.id AS product_id, p.title AS product_title, p.price AS product_price, p.description AS product_description, p.image_url AS product_image_url, p.quantity AS product_quantity " +
            "FROM categories c " +
            "LEFT JOIN products p ON c.id = p.category_id " +
            "WHERE c.name = :categoryName",
            nativeQuery = true)
    List<Object[]> findProductsByCategoryName(@Param("categoryName") String categoryName);



}
