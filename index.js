const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'companyDB',
});

const homeMenu = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "nextStep",
                message: "What would you like to do?",
                choices: ["View All Employees", 
                "View All Employees by Department",
                "View All Employee Roles"],
            },
        ])
        .then(userChoice => {
           
        })
}