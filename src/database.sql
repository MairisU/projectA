-- Create Categories Table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products Table
CREATE TABLE products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    brand VARCHAR(255),
    category_id INT,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Create Product Gallery Table
CREATE TABLE product_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    image_url TEXT NOT NULL,
    display_order INT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create Attributes Table
CREATE TABLE attributes (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL
);

-- Create Attribute Items Table
CREATE TABLE attribute_items (
    id VARCHAR(255) PRIMARY KEY,
    attribute_id VARCHAR(255),
    display_value VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    FOREIGN KEY (attribute_id) REFERENCES attributes(id)
);

-- Create Product Attributes Table
CREATE TABLE product_attributes (
    product_id VARCHAR(255),
    attribute_id VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (attribute_id) REFERENCES attributes(id),
    PRIMARY KEY (product_id, attribute_id)
);

-- Create Prices Table
CREATE TABLE prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    currency_label VARCHAR(10) NOT NULL,
    currency_symbol VARCHAR(5) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create Orders Table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_amount DECIMAL(10, 2) NOT NULL,
    currency_label VARCHAR(10) NOT NULL,
    currency_symbol VARCHAR(5) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Order Items Table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id VARCHAR(255),
    quantity INT NOT NULL,
    selected_attributes JSON,
    price_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
