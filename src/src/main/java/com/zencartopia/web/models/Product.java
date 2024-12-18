package com.zencartopia.web.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.*;

//@Entity
//@Table(name = "products")
//public class Product {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false)
//    private String name;
//
//    private String description;
//
//    @Column(nullable = false)
//    private BigDecimal price;
//
//    private String imageUrl; // URL for the product image
//
//    @Column(nullable = false)
//    private Integer stockQuantity;
//
//    @Embedded
//    @ElementCollection
//    private Set<Size> sizes = new HashSet<Size>();
//
//    @ManyToOne
//    @JoinColumn(name="category_id")
//    private Category category;
//
//    public Product(Long id, String name, String description, BigDecimal price, String imageUrl, Integer stockQuantity,  Set<Size> sizes, Category category) {
//        this.id = id;
//        this.name = name;
//        this.description = description;
//        this.price = price;
//        this.imageUrl = imageUrl;
//        this.stockQuantity = stockQuantity;
//        this.sizes = sizes;
//        this.category = category;
//    }
//
//    // Getters and Setters
//    public Long getId() {
//        return id;
//    }
//
//    public Set<Size> getSizes() {
//        return sizes;
//    }
//
//    public void setSizes(Set<Size> sizes) {
//        this.sizes = sizes;
//    }
//
//    public Category getCategory() {
//        return category;
//    }
//
//    public void setCategory(Category category) {
//        this.category = category;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public BigDecimal getPrice() {
//        return price;
//    }
//
//    public void setPrice(BigDecimal price) {
//        this.price = price;
//    }
//
//    public String getImageUrl() {
//        return imageUrl;
//    }
//
//    public void setImageUrl(String imageUrl) {
//        this.imageUrl = imageUrl;
//    }
//
//    public Integer getStockQuantity() {
//        return stockQuantity;
//    }
//
//    public void setStockQuantity(Integer stockQuantity) {
//        this.stockQuantity = stockQuantity;
//    }
//
//    // Override equals and hashCode for entity equality
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        Product product = (Product) o;
//        return Objects.equals(id, product.id) &&
//                Objects.equals(name, product.name);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(id, name);
//    }
//}

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    // Getters and setters
}

