const mysql = require("mysql");

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


async function getEmployees(){
  let promise = new Promise((resolve, reject) => {
    connection.query("SELECT * FROM employee", function(err, data){
      if (err) throw err;
      resolve(data);
    });
  });
  return await promise;
    
}

async function getRoles(){
  let promise = new Promise((resolve, reject) => {
    connection.query("SELECT * FROM role", function(err, data){
      if (err) throw err;
      resolve(data);
    });
  });  
  return await promise;
}

async function getDepartments(){
  let promise = new Promise((resolve, reject) => {
    connection.query("SELECT * FROM department", function(err, data){
      if (err) throw err;
      resolve(data);
    });
  });  
  return await promise;
}

async function createEmployee(employeeOBJ){
  let promise = new Promise((resolve, reject) => {
    connection.query("INSERT INTO employee SET ?",
    {
      first_name : employeeOBJ.first_name,
      last_name: employeeOBJ.last_name,
      role_id : employeeOBJ.role_id,
      manager_id : employeeOBJ.manager_id || -1
    },
    function(err){
      if (err) throw err;
      resolve();
    })
  })

  return await promise;
}

async function createRole(roleObj){
  let promise = new Promise((resolve, reject) => {
    connection.query("INSERT INTO role SET ?",
    {
      title : roleObj.title,
      salary : roleObj.salary,
      department_id : roleObj.department_id
    },
    function(err){
      if (err) throw err;
      resolve();
    })
  })

  return await promise;
}

async function createDepartment(deptObj){
  let promise = new Promise((resolve, reject) => {
    connection.query("INSERT INTO department SET ?",
    {
      name: deptObj.name
    },
    function(err){
      if (err) throw err;
      resolve();
    })
  })

  return await promise;
}

exports.getEmployees = getEmployees;
exports.getRoles = getRoles;
exports.getDepartments = getDepartments;
exports.createEmployee = createEmployee;
exports.createRole = createRole;
exports.createDepartment = createDepartment;

