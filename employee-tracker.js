const inquirer = require("inquirer");
const cTable = require("console.table");
const query = require("./db-query");



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
        newDeparment();
        break;


    }
  })
}

async function newEmployee() {
  let employees = await query.getEmployees();
  let roles = await query.getRoles();
  console.log(employees);
  console.log(roles);
    inquirer.prompt(
    {
      name:"first_name",
      type: "input",
      message: "What is the employee's first name?",
      validate: function(value){
      if(!/[^a-z-\s]/.test(value.toLowerCase())){
        return true;
      }
      return false;
    }
    },
    {
      name:"last_name",
      type: "input",
      message: "What is the employee's last name?",
      validate: function(value){
        if(!/[^a-z-\s]/.test(value.toLowerCase())){
          return true;
        }
        return false;
      }
    },
    {
      name: "role_id",
      type: "list",
      message: "What is the employee's role?",

    }

  ).then(answers => {
    console.log(answers.first_name);
  })
}


start();