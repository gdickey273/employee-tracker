const inquirer = require("inquirer");
const cTable = require("console.table");
const query = require("./db-query");
const { createPromptModule } = require("inquirer");



function start() {
  inquirer.prompt({
    name: "todo",
    type: "list",
    message: "What would you like to do?",
    choices: ["Create Employee", "Create Role", "Create Department"]
  }).then(answer => {
    switch (answer.todo) {
      case "Create Employee":
        newEmployee();
        break;

      case "Create Role":
        newRole();
        break;

      case "Create Department":
        newDepartment();
        break;


    }
  })
}

async function getEmployeeChoices(){
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

async function getDepartmentChoices(){
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
async function newEmployee() {
  let employeeChoices = await getEmployeeChoices();

  let roles = await query.getRoles();
  let roleChoices = [];
  for (let role of roles) {
    roleChoices.push(
      {
        name: role.title,
        value: role.id
      });
  }

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
        validate: function(value){
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
  ).then(async function(answers){
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
  ).then (async function(answers){
    await query.createDepartment(answers);
    console.table(await query.getDepartments());
    start();
  })
}

async function newEmployeeRole(){

}

start();
