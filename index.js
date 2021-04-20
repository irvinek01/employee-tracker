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
                name: "userDo",
                message: "What would you like to do?",
                choices: ["View All Employees",
                    "View All Employees by Department",
                    "View All Employee Roles",
                    "Exit Commandline Application"],
            },
        ])
        .then(userChoice => {
            switch (userChoice.userDo) {
                case "View All Employees":
                    const queryStr = `SELECT E.id,E.first_name,E.last_name,R.title,R.salary,D.name FROM employee E 
                    LEFT JOIN role R ON R.id = E.role_id 
                    LEFT JOIN department D ON D.id = R.department_id`;
                    connection.query(queryStr, (err, row) => {
                        if (err) throw err;
                        console.table(row);
                        return homeMenu();
                    })
                    break;

                default:
                    console.log("You are now ending the Content Management System");
                    return connection.end();
            }
        })
}

homeMenu();