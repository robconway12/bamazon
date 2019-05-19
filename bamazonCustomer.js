var mysql = require('mysql');
var inquirer = require('inquirer');
var confirm = require('inquirer-confirm');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazonDB',
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('connected as id ' + connection.threadId + '\n');
	selectProducts();
});

function selectProducts() {
	console.log('Selecting all products...\n\n');
	connection.query('SELECT * FROM products', function(err, results) {
		if (err) throw err;

		inquirer
			.prompt([
				{
					name: 'choice',
					type: 'input',
					choices: function() {
						for (var i = 0; i < results.length; i++) {
							console.log(
								`${results[i].item_id} - ${results[i].product_name}\n$${results[i].price.toFixed(
									2
								)}\n--------------------------------`
							);
						}
					},
					message: 'Which product would you like to buy? [Enter ID #]',
				},
				{
					name: 'units',
					type: 'input',
					message: 'How many units would you like?',
				},
			])
			.then(function(answer) {
				if (answer.choice <= results.length) {
					verifyQuantity(answer.choice, answer.units);
				} else {
					console.log(`${answer.choice} is not a valid item ID`);
					confirm('Would you like to try again?').then(
						function confirmed() {
							selectProducts();
						},
						function cancelled() {
							console.log('Goodbye!');
							connection.end();
						}
					);
				}
			});
	});
}

function verifyQuantity(userIDChoice, userQtyInput) {
	const query = 'SELECT stock_quantity FROM products WHERE ?';
	connection.query(query, { item_id: userIDChoice }, function(err, res) {
		if (err) throw err;
		if (res[0].stock_quantity >= userQtyInput) {
			fulfillment(userIDChoice, userQtyInput, res[0].stock_quantity);
		} else {
			console.log('Your Qty: ' + userQtyInput + '. Available Qty: ' + res[0].stock_quantity);
			confirm('Insufficient quantity! Would you like to try again?').then(
				function confirmed() {
					selectProducts();
				},
				function cancelled() {
					console.log('Goodbye!');
					connection.end();
				}
			);
		}
	});
}

function fulfillment(userIDChoice, userQtyInput, previousStock) {
	const reducedStock = previousStock - userQtyInput;
	const updateStock = 'UPDATE products SET ? WHERE ?';
	connection.query(
		updateStock,
		[
			{
				stock_quantity: reducedStock,
			},
			{
				item_id: userIDChoice,
			},
		],
		function(err) {
			if (err) throw err;
			finalPrice(userIDChoice, userQtyInput);
		}
	);
}

function finalPrice(userIDChoice, userQtyInput) {
	const queryPrice = 'SELECT price FROM products WHERE ?';
	connection.query(
		queryPrice,
		{
			item_id: userIDChoice,
		},
		function(err, res) {
			if (err) throw err;
			confirm(
				`Bid placed successfully! Your total cost is $${parseFloat(res[0].price * userQtyInput).toFixed(2)}. Would you like to place another order?`
			).then(
				function confirmed() {
					selectProducts();
				},
				function cancelled() {
					console.log('Goodbye!');
					connection.end();
				}
			);
		}
	);
}
