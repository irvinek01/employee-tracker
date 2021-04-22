INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Human Resources");

INSERT INTO role (title,salary,department_id) VALUES ("Sales Lead",899.99,1);
INSERT INTO role (title,salary,department_id) VALUES ("Sales Talker",599.99,1);
INSERT INTO role (title,salary,department_id) VALUES ("Lead Engineer",1199.99,2);
INSERT INTO role (title,salary,department_id) VALUES ("Software Engineer",999.99,2);
INSERT INTO role (title,salary,department_id) VALUES ("Trainee Software Engineer",799.99,2);
INSERT INTO role (title,salary,department_id) VALUES ("Human Resources Director",1099.99,3);
INSERT INTO role (title,salary,department_id) VALUES ("Payroll Processing Specialist",799.99,3);
INSERT INTO role (title,salary,department_id) VALUES ("Training Coordinator",699.99,3);

INSERT INTO employee (first_name,last_name,role_id) VALUES ("AJ","Bautista",1);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("Arianna","Grande",2,1);
INSERT INTO employee (first_name,last_name,role_id) VALUES ("Erin","Caesar",3);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("Areen","Delle",4,3);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("Cheska","Chesapeake",5,3);
INSERT INTO employee (first_name,last_name,role_id) VALUES ("Reiss","Jaeger",6);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("Bailey","Morgan",7,6);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("Basti","Casey",7,6);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("Rei","Chu",8,6);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("Dailey","Morgan",2,1);