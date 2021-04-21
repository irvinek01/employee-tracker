const util = require('util');
const defaultConnection = require('./connection');

class DB {
    constructor(connection = defaultConnection) {
        this.connection = connection;
    }
    init() {
        return new Promise((resolve, reject) => {
            this.connection.connect((error) => {
                if (error) {
                    return reject(error);
                }
                this.connection.query = util.promisify(this.connection.query);
                resolve();
            });
        });
    }
    close_connection(callback) {
        return this.connection.end(callback);
    }
    view_all_employees() {
        const query_string = `SELECT E.id,E.first_name,E.last_name,R.title AS position,R.salary,D.name AS department,
        CONCAT(M.first_name, ' ', M.last_name) AS manager
        FROM employee E
        LEFT JOIN employee M ON E.manager_id = M.id
        LEFT JOIN role R ON R.id = E.role_id
        LEFT JOIN department D ON D.id = R.department_id`;
        return this.connection.query(query_string);
    }
    getAllDept() {
        const query_string = `SELECT name FROM department`;
        return this.connection.query(query_string);
    }
    getAllEmpByDept(department) {
        const query_string = `SELECT CONCAT(D.name, ' Dept.') AS department,
        R.title AS position,R.salary,
        E.id,E.first_name,E.last_name,
        CONCAT(M.first_name, ' ', M.last_name) AS manager
        FROM employee E
        LEFT JOIN employee M ON E.manager_id = M.id
        LEFT JOIN role R ON R.id = E.role_id
        LEFT JOIN department D ON D.id = R.department_id
        WHERE D.name = ?`;
        return this.connection.query(query_string, department);
    }
    getAllManagers() {
        const query_string = `SELECT E.id,
        CONCAT(E.first_name, ' ', E.last_name) AS managers
                FROM employee E
                LEFT JOIN employee M ON E.manager_id = M.id
                LEFT JOIN role R ON R.id = E.role_id
                LEFT JOIN department D ON D.id = R.department_id
                WHERE E.manager_id IS NULL`;
        return this.connection.query(query_string);
    }
    getAllEmpByManagers(manager_fullname) {
        const query_string = `SELECT CONCAT(M.first_name, ' ', M.last_name) AS manager,
        E.first_name,E.last_name,E.id,R.title AS position,R.salary,D.name AS department
        FROM employee E
        LEFT JOIN employee M ON E.manager_id = M.id
        LEFT JOIN role R ON R.id = E.role_id
        LEFT JOIN department D ON D.id = R.department_id
        WHERE CONCAT(M.first_name, ' ', M.last_name) = ?`;
        return this.connection.query(query_string, manager_fullname);
    }
    getAllRoles() {
        const query_string = `SELECT id,title AS position
        FROM role`;
        return this.connection.query(query_string);
    }
    addNewEmp(new_emp) {
        const query_string = 'INSERT INTO employee SET ?';
        return this.connection.query(query_string, new_emp);
    }


}

module.exports = DB;