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
                        "View All Employee by Manager",
                        "View All Roles",
                        "Exit Commandline Application"],
                },
            ])
            .then(userChoice => {
                switch (userChoice.userDo) {
                    case "View All Employees":
                        return this.viewAllEmp();
                    case "View All Employees by Department":
                        return this.viewAllEmpByDept();
                    case "View All Employee by Manager":
                        return this.viewAllEmpByMan();

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
    viewAllEmpByMan() {
        return this.db
            .getAllManagers()
            .then((rows) => {
                const manager_list = rows.map(({ managers }) => { return managers });
                return inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "managerChoice",
                            message: "These are all the company team leaders",
                            choices: manager_list
                        },
                    ])
                    .then((userChoice) => {
                        return this.db
                            .getAllEmpByManagers(userChoice.managerChoice)
                            .then((rows) => {
                                console.table(rows);
                                return this.homeMenu()
                            });
                    });
            });
    }

}

module.exports = CMS;