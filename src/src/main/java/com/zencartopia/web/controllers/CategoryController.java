package com.zencartopia.web.controllers;

import com.zencartopia.web.models.Category;
import com.zencartopia.web.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/api/categories")
    public List<Object[]> getCategories() {
        return categoryService.getAllCategoriesWithProducts();
    }
}
