var mysql = require("mysql");
var inquirer = require("inquirer");
var request = require("request-promise");
var cTable= require("console.table");
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
    
    connection.query("SELECT product_id, product_name, price FROM products",
    function(err,res){
        if (err) throw err;
            console.table(res);
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
            //Checks if the Item ID exists 
            if ( ! res.length ) {
                console.log("We aint got that BABAY!");
            }
            // Checks if we get 
            else if( answers.amount > res[0].stock_quantity ){
                console.log("Not enough stock");
            } 
            else {
                var itemQuery = connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity: res[0].stock_quantity - answers.amount
                },
                {
                    product_id: answers.item
                }
            ]);
            console.log(`Thank you for your purchase, BABAY! Your Order number is ${connection.threadId}`);
            }
            connection.end();
        }); 
    });
};

   