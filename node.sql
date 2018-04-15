
--creating database--
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

---creating the database--
USE bamazon;

CREATE TABLE products (
product_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR (9999) NULL,
department_name VARCHAR (9999) NULL,
price DECIMAL (9999,2) NULL,
stock_quantity DECIMAL (9999,2) NULL,
PRIMARY KEY(product_id)
);

-- inserting mock info--
USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirt", "Clothing", 30, 456);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoe", "Clothing", 50, 757);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pant", "Clothing", 680, 614);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keyboard", "Technology", 426, 93);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Technology", 250, 412);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gi", "Jiu Jitsu", 720, 122);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mouth Guard", "Jiu Jitsu", 20, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 2, 1112);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Speakers", "Technology", 20, 89);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Technology", 30, 412);

--  --