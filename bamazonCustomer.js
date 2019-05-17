var mysql = require('mysql');
var inquirer = require('inquirer');
const chosenItem = 0;

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
                `${results[i].item_id} - ${results[i].product_name}\n$${results[i].price.toFixed(2)}\n--------------------------------`
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
            verifyQuantity(answer.choice);
					} else {
            console.log(`${answer.choice} is not a valid item ID`)
          }
			})
	});
};

function verifyQuantity(x) {
  var query = "SELECT stock_quantity FROM products WHERE ?";
  connection.query(query, { item_id: x}, function(err, res) {
    if (err) throw err;
    if (res >= x) {
      fullfillment();
    } else {
    console.log('Insufficient quantity!');
    connection.end();
    }
  });
};

function fullfillment() {
  console.log('it worked!');
  connection.end();
};