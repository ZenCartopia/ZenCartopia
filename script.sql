
CREATE SCHEMA zencartopia;

USE zencartopia;

-- -- Table: payment_information
CREATE TABLE payment_information (
    id INT AUTO_INCREMENT PRIMARY KEY,
    card_holder_name VARCHAR(50) NOT NULL,
    card_number VARCHAR(16) NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    expiry_date VARCHAR(5) NOT NULL,  -- Assuming expiry date is stored in MM/YY format
    payment_type ENUM('credit_card', 'paypal') NOT NULL
);


-- -- Table: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    payment_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_id) REFERENCES payment_information(id) ON DELETE CASCADE
);


-- Table: categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table: products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    aquantity INT NOT NULL, 
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);


-- Table: orders
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status ENUM('pending', 'paid', 'shipped') DEFAULT 'pending',
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: order_items
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Table: payments
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_type ENUM('credit_card', 'paypal') NOT NULL,
    status ENUM('success', 'failed', 'pending') DEFAULT 'pending',
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Seed data for categories
INSERT INTO categories (name)
VALUES 
('Hats'),
('Hoodies'),
('Shirts');

-- Seed data for products
INSERT INTO products (category_id, title, price, description, image_url, aquantity)
VALUES 
(1, 'Dota 2 Tidehunter', 45.00, 'Bucket Hat', '/assets/hat1.png', 120),
(1, 'Oakita', 35.00, 'Baseball Hat', '/assets/hat2.png', 150),
(1, 'Dota 2 Hat', 30.00, 'Baseball Cap', '/assets/hat3.png', 180),
(2, 'Windranger Hoodie', 50.00, '100% cotton', '/assets/hoodie1.png', 100),
(2, 'Earthshaker Hoodie', 60.00, '100% cotton', '/assets/hoodie4.png', 80),
(3, 'Invoker Shirt', 20.00, '100% cotton', '/assets/shirt1.png', 200),
(2, 'Bristleback Hoodie', 55.00, '100% cotton', '/assets/hoodie2.png', 60),
(2, 'Riki Hoodie', 65.00, '100% cotton', '/assets/hoodie3.png', 40),
(3, 'Tinker Shirt', 25.00, '100% cotton', '/assets/shirt2.png', 110),
(3, 'Anti-Mage Shirt', 22.00, '100% cotton', '/assets/shirt3.png', 130),
(3, 'Pudge Shirt', 28.00, '100% cotton', '/assets/shirt4.png', 90),
(3, 'Lina Shirt', 23.00, '100% cotton', '/assets/shirt5.png', 70),
(2, 'Faceless Void Hoodie', 48.00, '100% cotton', '/assets/hoodie5.png', 150);







