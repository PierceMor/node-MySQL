// Create a new Node application called bamazonManager.js. Running this application will:

// List a set of menu options:

// View Products for Sale

// View Low Inventory

// Add to Inventory

// Add New Product







var color = require("colors");
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
            type: "list",
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
        });
}


// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities. 
function showSales(){
    var query = connection.query("SELECT * FROM products",
    function(err,res){
        if (err) throw err;
        console.table(res);
    });
}

// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
function lowInvetory(){
    var query = connection.query("SELECT * FROM products GROUP BY stock_quantity HAVING stock_quantity < 50",
    function(err,res){
        if (err) throw err; 
            console.table(res);      
    });
}

// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInvetory(){
    console.log("\033");
    var query = connection.query('SELECT * FROM products',  function(err, res){
        if (err) throw err;

        console.table(res);
        inquirer.prompt([
            {
                type: "integer",
                name: "item",
                message: "What item is being stocked?"
            },
            {
                type: "integer",
                name: "amount",
                message: "Add Stock Amount?"
            }
        ]).then(function(answers){
            var itemquery = connection.query("SELECT * FROM products WHERE product_id=?", answers.item, function(err, res){
                    if ( ! res.length){
                        console.log(`What you doing boss man?`);
                        addInvetory();
                    } else {
                        var itemQuery = connection.query(" UPDATE products SET ? WHERE ?", [
                            {
                                stock_quantity: res[0].stock_quantity + answers.amount
                            },
                            {
                                product_id: answers.item
                            }
                        ]);
                        console.log(`Thank you for updating the Stock!`)
                    }
                    connection.end();
                }
            );
        });
        });
    }



// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
function addProduct(){
    console.log("\033c");
    inquirer.prompt([{
        name: "addId",
        type: "input",
        message: "Enter item ID of new product"
    }])
}

