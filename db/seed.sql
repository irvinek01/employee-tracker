DROP DATABASE IF EXISTS companyDB;
CREATE database companyDB;
USE companyDB;

CREATE TABLE employee (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER
);

CREATE TABLE role (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(6,2) NOT NULL,
  department_id INTEGER
);

CREATE TABLE department (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

SELECT E.id,E.first_name,E.last_name,R.title,R.salary,D.name,
CONCAT(M.first_name, ' ', M.last_name) AS manager
FROM employee E
LEFT JOIN employee M ON E.manager_id = M.id
LEFT JOIN role R ON R.id = E.role_id
LEFT JOIN department D ON D.id = R.department_id


