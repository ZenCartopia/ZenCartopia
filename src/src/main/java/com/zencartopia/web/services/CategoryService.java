package com.zencartopia.web.services;

import com.zencartopia.web.models.Category;
import com.zencartopia.web.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Object[]> getAllCategoriesWithProducts() {
        return categoryRepository.findAllWithProducts();
    }

}
