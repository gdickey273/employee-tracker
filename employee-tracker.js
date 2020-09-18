//require dependencies
const inquirer = require("inquirer");
const cTable = require("console.table");
const query = require("./db-query");
const { createPromptModule } = require("inquirer");
const ExpandPrompt = require("inquirer/lib/prompts/expand");


//A function that starts the application and prompts the user for what they'd like todo. Once the user answers, a corresponding funcion is called through a switch statement.
function start() {
  inquirer.prompt({
    name: "todo",
    type: "list",
    message: "What would you like to do? \n",
    choices: ["View Employees", "View Roles", "View Departments",
      "View Employees by Manager", "Create Employee", "Create Role",
      "Create Department", "Update an Employee's Role", "Update an Employee's Manager",
      "Delete an Employee", "Delete a Role", "Delete a Department",
      "View total utilized budget of a Department", "Quit"]
  }).then(async function (answer) {
    switch (answer.todo) {
      case "View Employees":
        await query.tableLogEmployees();
        start();
        break;

      //if user selects "View Employees by Manager", prompt which manager who's employees theyd like to see, and table log that managers employees
      case "View Employees by Manager":
        let employeeChoices = await getEmployeeChoices();
        inquirer.prompt({
          name: "manager_id",
          type: "list",
          message: "Choose the manager who's employee list you'd like to see.",
          choices: employeeChoices
        }).then(async function (answers) {
          await query.tableLogEmployees(answers.manager_id);
          start();
        })
        break;

      case "View Roles":
        await query.tableLogRoles();
        start();
        break;

      case "View Departments":
        console.table(await query.getDepartments());
        start();
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

      case "Update an Employee's Manager":
        newEmployeeManager();
        break;

      //If user selects "Delete an Employee", prompt which employee they'd like to delete then call deleteEmployee() function passing that employee's id.
      case "Delete an Employee":
        let deleteEmployeeChoices = await getEmployeeChoices();
        inquirer.prompt({
          name: "id",
          type: "list",
          message: "Which employee would you like to delete?",
          choices: deleteEmployeeChoices
        }).then(async function (answers) {
          await query.deleteEmployee(answers.id);
          start();
        })
        break;

       //If user selects "Delete a Role", prompt which role they'd like to delete then call deleteRole() function passing that role's id. 
      case "Delete a Role":
        let deleteRoleChoices = await getRoleChoices();
        inquirer.prompt({
          name: "id",
          type: "list",
          message: "Which Role would you like to delete?",
          choices: deleteRoleChoices
        }).then(async function (answers) {
          await query.deleteRole(answers.id);
          start();
        })
        break;

      //If user selects "Delete a Department", prompt which department they'd like to delete then call deleteDepartment() function passing that department's id. 
      case "Delete a Department":
        let deleteDepartmentChoices = await getDepartmentChoices();
        inquirer.prompt({
          name: "id",
          type: "list",
          message: "Which Department would you like to delete?",
          choices: deleteDepartmentChoices
        }).then(async function (answers) {
          await query.deleteDepartment(answers.id);
          start();
        })
        break;

      case "View total utilized budget of a Department":
        await tableLogTotal();
        break;

      case "Quit":
        query.endConnection();
        break;

    }
  })
}

//Prompts user for information on new employee and calls query.createEmployee() to insert that employee into the db
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
    start();
  })
}

//Prompts user for information on new role and calls query.createRole() to insert that role into the db
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
    start();
  })
}

//Prompts user for information on new department and calls query.createDepartment() to insert that department into the db
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
    start();
  })
}

//A helper function that calls query.getEmployees() and uses that data to create an array of employee choices to be used in inquirer lists. 
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

//A helper function that calls query.getRoles() and uses that data to create an array of role choices to be used in inquirer lists.
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

//A helper function that calls query.getDepartments() and uses that data to create an array of department choices to be used in inquirer lists.
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

//A function that prompts the user for which employee they'd like to update, and which new role they'd like to assign that employee. 
//query.updateEmployee() is then called to update that employee in the db
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
    await query.updateEmployee({ id: answers.employee_id }, { role_id: answers.role_id });
    start();
  })
}

//A function that prompts the user for which employee they'd like to update, and which new manager they'd like to assign that employee. 
//query.updateEmployee() is then called to update that employee in the db
async function newEmployeeManager() {
  let employeeChoices = await getEmployeeChoices();
  inquirer.prompt(
    [{
      name: "employee_id",
      type: "list",
      message: "Which employee would you like to update?",
      choices: employeeChoices
    },
    {
      name: "manager_id",
      type: "list",
      message: "Who is the employee's new manager?",
      choices: employeeChoices
    }]).then(async function (answers) {
      await query.updateEmployee({ id: answers.employee_id }, { manager_id: answers.manager_id });
      start();
    })
}

//A function that prompts the user for which department they'd like budget information on, console.table() is then called with employee's in that department
//and a total of those employees' salaries is calculated and logged as well. 
async function tableLogTotal() {
  let departmentChoices = await getDepartmentChoices();
  inquirer.prompt({
    name: "id",
    type: "list",
    message: "For which Department would you like to see the total utilized budget?",
    choices: departmentChoices
  }).then(async function (answers) {
    let employees = await query.getEmployeesByDepartment(answers.id);

    let total = 0;
    for (let emp of employees) {
      total += parseFloat(emp.salary);
    }

    total = total.toFixed(2);
    console.table(employees);
    console.log(`Total Budget Usage: $${total}`);
    start();
  })
}

start();
