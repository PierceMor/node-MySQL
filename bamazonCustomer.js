var mysql = require("mysql");
var inquirer = require("inquirer");

var customerInput = process.argv.slice(2);

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
    console.log( `connected as id ${connection.threadId}` );
});

//display the available sell things 
function displayItems(){
    console.log(`Here is our Inventory......`);
    connection.query("SELECT * FROM products",
function(err,res){
    if (err) throw err;
    console.log(res);
})
}


displayItems();