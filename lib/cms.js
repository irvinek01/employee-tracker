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
                        return this.viewAllEmp();
                    case "View All Employees by Department":
                        return this.viewAllEmpByDept();

                    default:
                        return this.exit();
                }
            })
    }
    viewAllEmp() {
        return this.db
            .view_all_employees()
            .then((rows) => {
                console.table(rows);
                return this.homeMenu()
            });
    }
    viewAllEmpByDept() {
        return this.db
            .getAllDept()
            .then((rows) => {
                const dept_list = rows.map(({ name }) => { return name });
                return inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "deptChoice",
                            message: "These are all the company's departments",
                            choices: dept_list
                        },
                    ])
                    .then((userChoice) => {
                        return this.db
                            .getAllEmpByDept(userChoice.deptChoice)
                            .then((rows) => {
                                console.table(rows);
                                return this.homeMenu()
                            });
                    });
            });
    }

}

module.exports = CMS;