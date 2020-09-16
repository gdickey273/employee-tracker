
--department seeds
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO department (name)
VALUES ("Human Resources");

INSERT INTO department(name)
VALUES("Management");


--role seeds
INSERT INTO role (title, salary, department_id)
VALUES("Junior Salesperson", 30000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES("Senior Salesperson", 45000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES("Tax Accountant", 40000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES("Payroll Accountant", 40000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES("HR Rep", 35000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES("Branch Manager", 55000.00, 4);


--employee seeds
INSERT INTO employee (first_name, last_name, role_id)
VALUES("Michael", "Scott", 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Jim", "Halpert", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Dwight", "Schrute", 1, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Ryan", "Howard", 1, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Angela", "Martin", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Oscar", "Martinez", 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Holly", "Flax", 5, 1);
