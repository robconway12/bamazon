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
				console.log('product choice: ' + answer.choice);
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
	var query = 'SELECT stock_quantity FROM products WHERE ?';
	connection.query(query, { item_id: userIDChoice }, function(err, res) {
		if (err) throw err;
		if (res[0].stock_quantity >= userQtyInput) {
			console.log('User Qty: '+ userQtyInput);
			console.log('Available Qty: ' + res[0].stock_quantity);
			fullfillment();
		} else {
			console.log('User Qty: '+ userQtyInput);
			console.log('Available Qty: ' + res[0].stock_quantity);
			console.log('Insufficient quantity!');
			connection.end();
		}
	});
}

function fullfillment() {
	console.log('it worked!');
	connection.end();
}
