DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products (
item_id BIGINT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2),
stock_quantity INTEGER(10),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Breaking The Habit of Being Yourself: How to Lose Your Mind and Create a New One', 'Books', 21.89, 243);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Foldable Travel Camping Duffel Bag/Shoe Compartment', 'Luggage', 17.88, 579);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Men\'s Casual Slim Fit Long Sleeve Button Down Shirt', 'Clothing', 26.38, 78);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('HP 15.6 Inch HD Thin Laptop (8GB DDR4 Memory, Windows 10)', 'Electronics', 299.00, 102);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Hasbro Rubik\'s Cube, Classic Colors','Toys', 4.49, 321);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Unfinished Shaker Extended Length Console Table', 'Furniture', 122.32, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Iced Coffee Maker and Tea Infuser with Spout - 1.0L', 'Housewares', 29.99, 466);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('3 Piece Set Suitcase Spinner Hardshell Lightweight', 'Luggage', 139.99, 444);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('One Piece Vintage Printed Off Shoulder Flounce Ruffled Swimsuit', 'Clothing', 26.99, 920);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Canon MX492 BLACK Wireless All-IN-One Small Printer', 'Electronics', 74.99, 557);