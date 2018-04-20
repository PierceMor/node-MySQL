//This wil be able to see products for sale, view low inventory, add to inventory, and add new product 
// View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
//View Low Inventory, then it should list all items with an inventory count lower than five.
//Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//Add New Product, it should allow the manager to add a completely new product to the store.

var mysql = require("mysql");
var inquirer = require("inquirer");
var request = require("request-promise");
var cTable = require("console.table");
var input = process.argv.slice(2);

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "root",
    database:"bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    offerChoices();
});

//This will display our input options
function offerChoices(){
    inquirer   
        .prompt({
            name:"action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }).then(function(answer){
            switch (answer.action){
                case "View Products for Sale":
                    showSales();
                    break;

                case "View Low Inventory":
                    lowInvetory();
                    break;
                
                case "Add to Inventory":
                    addInvetory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;
            }
        })
}


//View Products for Sale. 
