

USE zencartopiap;

-- Table: users
CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   
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
    price DECIMAL(10, 2) NOT NULL,
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
INSERT INTO products (category_id, title, price, description, image_url)
VALUES
(1, 'Dota 2 Tidehunter', 45, 'Bucket Hat', '/assets/hat1.png'),
(1, 'Oakita', 35, 'Baseball Hat', '/assets/hat2.png'),
(1, 'Dota 2 Hat', 30, 'Baseball Cap', '/assets/hat3.png'),
(2, 'Windranger Hoodie', 50, '100% cotton', '/assets/hoodie1.png'),
(2, 'Earthshaker Hoodie', 60, '100% cotton', '/assets/hoodie4.png'),
(3, 'Invoker Shirt', 20, '100% cotton', '/assets/shirt1.png');

SHOW TABLES;
DESCRIBE USERS;


ALTER TABLE users
ADD COLUMN full_name VARCHAR(255) NOT NULL;
USE zencartopiap; 


USE zencartopia;  -- Replace 'zencartopia' with your schema name

-- Modify the table to include missing columns
ALTER TABLE users
ADD COLUMN address VARCHAR(255) NOT NULL,
ADD COLUMN payment_method VARCHAR(50) NOT NULL;

USE zencartopia;  -- Replace 'zencartopia' with your schema name

INSERT INTO users (username, password, email, full_name, address, payment_method)
VALUES 
('keshif', 'password123', 'keshi@gmail.com', 'keshi fern', '123 Maple Street, Anytown, USA', 'Credit Card'),
('vishv', 'securepass', 'vish@yahoo.com', 'vish v', '456 Oak Avenue, Sometown, USA', 'PayPal'),
('tashfia', 'mypassword', 'tashfia@example.com', 'tash oyshi', '789 Birch Road, Othertown, USA', 'Debit Card'),
('kenneth', 'mypassword', 'kenneth@gmail.com', 'kenneth a', '56 Circle Ave, Otterton, USA', 'Debit Card');

DESCRIBE USERS;
SELECT * FROM users;

