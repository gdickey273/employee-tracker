const inquirer = require("inquirer");
const cTable = require("console.table");
const query = require("./db-query");
const { createPromptModule } = require("inquirer");
const ExpandPrompt = require("inquirer/lib/prompts/expand");



function start() {
  inquirer.prompt({
    name: "todo",
    type: "list",
    message: "What would you like to do?",
    choices: ["View Employees", "View Roles", "View Departments", "Create Employee", "Create Role", "Create Department", "Update an Employee's Role", "Quit"]
  }).then(answer => {
    switch (answer.todo) {
      case "View Employees":
        break;

      case "View Roles":
        break;

      case "View Departments":
        break;

      case "Create Employee":
        newEmployee();
        break;

      case "Create Role":
        newRole();
        break;

      case "Create Department":
        newDepartment();
        break;
      case "Update an Employee's Role":
        newEmployeeRole();
        break;
      case "Quit":
        query.endConnection();
        break;

    }
  })
}

async function newEmployee() {
  let employeeChoices = await getEmployeeChoices();
  let roleChoices = await getRoleChoices();


  inquirer.prompt(
    [{
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?",
      validate: function (value) {
        if (!/[^a-z-\s]/.test(value.toLowerCase())) {
          return true;
        }
        return false;
      }
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?",
      validate: function (value) {
        if (!/[^a-z-\s]/.test(value.toLowerCase())) {
          return true;
        }
        return false;
      }
    },
    {
      name: "role_id",
      type: "list",
      message: "What is the employee's role?",
      choices: roleChoices
    },
    {
      name: "hasManager",
      type: "confirm",
      message: "Does the employee have a manger?",
      validate: function (value) {
        if (value.toLowerCase() === "y" || value.toLowerCase === "n") {
          return true;
        }
        return false;
      }
    },
    {
      name: "manager_id",
      type: "list",
      message: "Who is the employee's manager?",
      choices: employeeChoices,
      when: (answ) => { return answ.hasManager; }
    }]
  ).then(async function (answers) {
    await query.createEmployee(answers);
    console.table(await query.getEmployees());
    start();
  })
}

async function newRole() {
  let departmentChoices = await getDepartmentChoices();

  inquirer.prompt(
    [
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the role's annual salary?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "department_id",
        type: "list",
        message: "To which department does this role belong?",
        choices: departmentChoices
      }
    ]
  ).then(async function (answers) {
    await query.createRole(answers);
    console.table(await query.getRoles());
    start();
  })
}

async function newDepartment() {
  inquirer.prompt(
    [
      {
        name: "name",
        type: "input",
        message: "What is the name of the new Department?"
      }
    ]
  ).then(async function (answers) {
    await query.createDepartment(answers);
    console.table(await query.getDepartments());
    start();
  })
}

async function getEmployeeChoices() {
  let employees = await query.getEmployees();
  let employeeChoices = [];
  for (let employee of employees) {
    employeeChoices.push(
      {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      });
  }

  return employeeChoices;
}

async function getRoleChoices() {
  let roles = await query.getRoles();
  let roleChoices = [];
  for (let role of roles) {
    roleChoices.push(
      {
        name: role.title,
        value: role.id
      });
  }

  return roleChoices;
}

async function getDepartmentChoices() {
  let departments = await query.getDepartments();
  let departmentChoices = [];
  for (let dept of departments) {
    departmentChoices.push({
      name: dept.name,
      value: dept.id
    });
  }

  return departmentChoices;
}

async function newEmployeeRole() {
  let employeeChoices = await getEmployeeChoices();
  let roleChoices = await getRoleChoices();
  inquirer.prompt(
    [
      {
        name: "employee_id",
        type: "list",
        message: "Which employee's role would you like to update?",
        choices: employeeChoices
      },
      {
        name: "role_id",
        type: "list",
        message: "What is the employee's new role?",
        choices: roleChoices
      }
    ]
  ).then(async function (answers) {
    await query.updateEmployeeRole(answers.employee_id, answers.role_id);
    console.table(await query.getEmployees());
    start();
  })
}



start();
