var mysql = require("mysql");
var inquirer = require("inquirer");
var request = require("request-promise");

// this connects us to the beautiful server
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log(`connected as Customer ID ${connection.threadId}`);
    displayItems();
});



//display the available sell things 
function displayItems(){
    console.log(`Here is our Inventory......`);
    console.log(`Item Id- Item- Price`);
    connection.query("SELECT * FROM products",
function(err,res){
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log(`\n ${res[i].product_id} ${res[i].product_name} $${res[i].price}`);
    }
    newOrder();
});
}

var newOrder = function(){
    inquirer.prompt([
        {
            type: "integer",
            name: "item",
            message: "What is the Id Number of your item?",
        },
        {
            type: "integer",
            name: "amount",
            message: "How many would you be purchasing today?"
        }
    ]).then(function(answers){

        var itemQuery = connection.query("SELECT * FROM products WHERE product_id=?", answers.item, function(err, res) {
console.log(res);
console.log(err);
            if (answers.amount > res[0].stock_quantity) {
                console.log("We aint got that babay!");
            } else {
                var itemQuery = connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity: res[0].stock_quantity - answers.amount
                },
                {
                    product_id: answers.item
                }
            ]);
            } connection.end();
        });
        
    });

    };

   