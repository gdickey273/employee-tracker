# README Generator
  ![Github Language Count](https://img.shields.io/github/languages/count/gdickey273/employee-tracker)
  ![Github Top Language](https://img.shields.io/github/languages/top/gdickey273/employee-tracker)

  ## Description 
  A Content Management System application for a company to use to keep track of their departments, roles, and employees. 

  ## Table of Contents
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)

  

  ## Usage
  
  The user can enter node employee-tracker.js to start the application. They will then be prompted for what action they'd like to take from the following list: 

  * View Employees  
  * View Roles  
  * View Departments  
  * View Employees by Manager  
  * Create Employee  
  * Create Role  
  * Create Department  
  * Update an Employee's Role  
  * Update an Employee's Manager  
  * Delete an Employee  
  * Delete a Role  
  * Delete a Department  
  * View total utilized budget of a Department  
  * Quit

  If the user chooses View Employees, View Roles, or View Departments, the contents from the corresponding table will be console logged and then the
  app will start over and ask the user what they'd like to do nex.

  If the user chooses View Employees by Manager, they will be prompted to select a manager who's employee's they'd like to see. That manager's employees will then be table logged and the app will restart.

  If the user chooses Create Employee/Role/Department, they will be prompted for the necessary information and then the item will be inserted into the appropriate db table.  The app will then restart.

  If the user chooses Update an Employee's Role/Manager, they will be prompted to select which Employee's info they'd like to update and the new info for that employee. That employee's info will then be updated in the db. The app will then restart.

  If the user chooses Delete a/an Employee/Role/Department, they will be prompted to choose which Employee/Role/Department they'd like to delete. The item will then be removed from the corresponding db table. The app will then restart.

  If the user chooses View total utilized budget of a Department, they will be prompted to choose a department. Each employee will then be logged to a table along with each employee's Role and Salary. A total of each employee's salary will then be calculated and logged below that table. The app will then restart.

  If the user chooses Quit the db connection will end and the user will exit the application!

  ### Link to Usage Video   
 https://drive.google.com/file/d/1tNlxRuRcB_bKXGOQmHxyJJIKbiFQKPrd/view


  ### Usage Screenshots    
  ![Command Line Screenshot](/images/employee-tracker-screenshot.png)

  

  ## Credits 
  * Graham Dickey gdickey273
 

  ## License 
  MIT License 
  Copyright (c) [2020] [Graham Dickey]
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.


  ## Questions
  Contact me with any questions you have regarding my project.   
  Email: gdickey273@gmail.com 
  Github: https://github.com/gdickey273  