package com.zencartopia.web.repositories;

import com.zencartopia.web.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    // Native SQL query to fetch categories with their products
    @Query(value = "SELECT c.id AS category_id, c.name AS category_name, p.id AS product_id, p.title AS product_title, p.price AS product_price, p.description AS product_description, p.image_url AS product_image_url " +
            "FROM categories c LEFT JOIN products p ON c.id = p.category_id",
            nativeQuery = true)
    List<Object[]> findAllWithProducts();
}
