const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { createPromptModule } = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

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
    }

  ).then(answers => {
    console.log(answers.first_name);
  })
}


start();