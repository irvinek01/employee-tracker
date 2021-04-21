const inquirer = require('inquirer');
require('console.table');

class CMS {
    constructor(db) {
        this.db = db;
    }
    start() {
        this.db.init().then(() => this.homeMenu());
    }
    exit() {
        console.log("You are now closing the Content Management System");
        return this.db.close_connection(() => process.exit(0));
    }
    homeMenu() {
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
                        return this.viewAllEmpByManager();
                    case "View All Employees by Department":
                        connection.query('SELECT name FROM department', (err, row) => {
                            if (err) throw err;
                            const choices = row.map(({ name }) => { return name });
                            inquirer
                                .prompt([
                                    {
                                        type: "list",
                                        name: "deptChoice",
                                        message: "These are all the company's departments",
                                        choices: choices
                                    },
                                ])
                                .then(userChoice => {
                                    const queryStr = `SELECT E.id,E.first_name,E.last_name,R.title,R.salary,D.name,
                                CONCAT(M.first_name, ' ', M.last_name) AS manager
                                FROM employee E
                                LEFT JOIN employee M ON E.manager_id = M.id
                                LEFT JOIN role R ON R.id = E.role_id
                                LEFT JOIN department D ON D.id = R.department_id
                                WHERE D.name = 'Human Resources';`;
                                    connection.query(queryStr, (err, row) => {
                                        if (err) throw err;
                                        console.table(row);
                                        return homeMenu();
                                    })
                                    if (userChoice.deptChoice == "Sales") {

                                    }
                                })
                        });
                        break;

                    default:
                        return this.exit();
                }
            })
    }
    viewAllEmpByManager() {
        return this.db
            .view_all_employees()
            .then((rows) => {
                console.table(rows);
                return this.homeMenu()
            });
    }

}

module.exports = CMS;