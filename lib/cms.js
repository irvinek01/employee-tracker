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
                    type: "rawlist",
                    name: "userDo",
                    message: "What would you like to do?",
                    choices: ["View All Employees",
                        "View All Employees by Department",
                        "View All Employee by Manager",
                        "View All Roles",
                        "Add Department",
                        "Add Employee",
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
                    case "View All Roles":
                        return this.viewAllRoles();
                    case "Add Department":
                        return this.addDept();
                    case "Add Employee":
                        return this.addEmp();

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
    viewAllRoles() {
        return this.db
            .getAllRoles()
            .then((rows) => {
                console.table(rows);
                return this.homeMenu()
            });
    }
    addDept() {
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'dname',
                    message: 'What is the new department`s name?',
                }
            ])
            .then((userChoice) => {
                const new_dept = {
                    name: userChoice.dname.trim(),
                };
                console.log('New department `'+new_dept+'` added successfully!');
                return this.db.addNewDept(new_dept);
            })
            .then(() => {
                return this.homeMenu();
            });
    }
    addEmp() {
        let obj = {};
        return this.db
            .getAllRoles()
            .then((rows) => {
                obj.roleList = rows;
                return this.db.getAllManagers();
            })
            .then((rows) => {
                const roleListobj = obj.roleList.map((role) => {
                    return {
                        id: role.id,
                        role: role.position,
                    }
                });
                const entries = Object.entries(roleListobj);
                console.log(entries);
                // auctions.map((auction) => {
                //     return {
                //       ID: auction.id,
                //       'Item Name': auction.item_name,
                //       Category: auction.category,
                //       'Starting Bid': auction.starting_bid,
                //       'Highest Bid': auction.highest_bid,
                //       Bidder: auction.highest_bidder || '-',
                //     };
                //   })
                const managerlist = rows.map((managers) => { return managers });

                return inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'fname',
                            message: 'What is the new employee`s first name?',
                        },
                        {
                            type: 'input',
                            name: 'lname',
                            message: 'What is the new employee`s last name?',
                        },
                        {
                            type: 'rawlist',
                            name: 'empRole',
                            message: 'What is the new employee`s job role?',
                            choices: entries
                        },
                        {
                            type: 'list',
                            name: 'empMan',
                            message: 'Who is the new employee`s manager?',
                            choices: managerlist
                        },
                    ])
                // .then((userChoice) => {
                //     const new_emp = {
                //         first_name: userChoice.fname,
                //         last_name: userChoice.lname,
                //         role_id: 
                //         manager_id: 
                //     };
                //     return this.db.addNewEmp(new_emp);
                // })
                // .then(() => {
                //     console.log('New employee added successfully!');
                //     return this.homeMenu();
                // });
            })
    }

}

module.exports = CMS;