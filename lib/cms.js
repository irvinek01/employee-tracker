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
                        "Add Roles",
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
                    case "Add Roles":
                        return this.addRoles();

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
                const dept_list = rows.map((deptobj) => {
                    return {
                        name: deptobj.name,
                        value: deptobj.id
                    }
                });
                return inquirer
                    .prompt([
                        {
                            type: "rawlist",
                            name: "deptChoice",
                            message: "These are all the company's departments",
                            choices: dept_list
                        },
                    ])
                    .then((userChoice) => {
                        console.log(userChoice.deptChoice);
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
                            type: "rawlist",
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
                console.log('New department `' + new_dept + '` added successfully!');
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
                        name: role.position,
                        value: role.id,
                    }
                });
                const managerlist = rows.map((managerobj) => {
                    return {
                        name: managerobj.managers,
                        value: managerobj.id,
                    }
                });
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
                            choices: roleListobj
                        },
                        {
                            type: 'rawlist',
                            name: 'empMan',
                            message: 'Who is the new employee`s manager?',
                            choices: managerlist
                        },
                    ])
                    .then((userChoice) => {
                        const new_emp = {
                            first_name: userChoice.fname,
                            last_name: userChoice.lname,
                            role_id: userChoice.empRole,
                            manager_id: userChoice.empMan,
                        };
                        console.log(`${userChoice.fname}, ${userChoice.lname}.
                        Welcome to the company!`);
                        return this.db.addNewEmp(new_emp);
                    })
                    .then(() => {
                        return this.homeMenu();
                    });
            })
    }
    addRoles() {
        return this.db
            .getAllDept()
            .then((rows) => {
                const dept_list = rows.map((deptobj) => {
                    return {
                        name: deptobj.name,
                        value: deptobj.id
                    }
                });
                return inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'roleTitle',
                            message: 'What is the new role job title?',
                        },
                        {
                            type: 'number',
                            name: 'roleSalary',
                            message: 'What is the new role starting job salary?',
                        },
                        {
                            type: "rawlist",
                            name: "deptChoice",
                            message: "What associated department the new role job title will be?",
                            choices: dept_list
                        },
                    ])
                    .then((userChoice) => {
                        const new_role = {
                            title: userChoice.roleTitle.trim(),
                            salary: userChoice.roleSalary,
                            department_id: userChoice.deptChoice,
                        };
                        console.log(`${userChoice.roleTitle}, successfully added to company roles!`);
                        return this.db.addNewRole(new_role);
                    })
                    .then(() => {
                        return this.homeMenu();
                    });
            })
    }

}

module.exports = CMS;