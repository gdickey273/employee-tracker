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
  let employeeChoices = [];
  for (let employee of employees){
    employeeChoices.push(
      {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      });
  }

  let roles = await query.getRoles();
  let roleChoices = [];
  for (let role of roles){
    roleChoices.push(
      {
        name: role.title,
        value: role.id
      });
  }

  // console.log(employees);
  // console.log(roles);
    inquirer.prompt(
    [{
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
      choices: roleChoices
    },
    {
      name:"hasManager",
      type: "confirm",
      message: "Does the employee have a manger?",
      validate: function(value){
        if(value.toLowerCase() === "y" || value.toLowerCase === "n"){
          return true;
        }
        return false;
      }
    },
    {
      name:"manager_id",
      type: "list",
      message: "Who is the employee's manager?",
      choices: employeeChoices,
      when: (answ) => {return answ.hasManager;}
    }]
  ).then(answers => {
    console.log(console.table(answers));
  })
}


start();