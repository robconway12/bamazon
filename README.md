
In this project, I created an Amazon-like storefront using MySQL. The app takes in orders from customers in Node.js and depletes stock from the store's inventory database.

MySQL Database is called "Bamazon" with a single table called "products."
The products table has the following columns:

- item_id (unique id for each product)
- product_name (Name of product)
- department_name
- price (cost to customer)
- stock_quantity (how much of the product is available in stores)

Node runs this application, and first displays all of the items available for sale. 
The app then prompts users for the ID of the product they would like to buy and how many units of the product they would like to buy.

Once the customer has placed the order, the app checks if the store has enough of the product to meet the customer's request. If not, it notifies the customer "Insufficient quantity!", and then prevent the order from going through.

However, if the store does have enough of the product, it updates the SQL database to reflect the remaining quantity. Once the update goes through, it shows the customer the total cost of their purchase.

It will ask the customer if they would like to make another purchase and it not, the app closes.