DROP DATABASE IF EXISTS companyDB;
CREATE database companyDB;
USE companyDB;

CREATE TABLE employee (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER
);

CREATE TABLE role (
  id INTEGER PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(6,2),
  department_id INTEGER
);

CREATE TABLE department (
  id INTEGER PRIMARY KEY,
  name VARCHAR(30)
);

SELECT * FROM employee E 
LEFT JOIN role R ON R.id = E.role_id 
LEFT JOIN department D on D.id = R.department_id