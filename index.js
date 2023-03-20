//Require all packages
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

//Set up the port
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function init(){
    // Connect to database
    const db = mysql.createConnection(
        {
            host: 'localhost',
            // MySQL username,
            user: '',
            // MySQL password
            password: '',
            database: ''
        },
        console.log(`Connected to the employee_db database.`)
    );

    // Default response for any other request (Not Found)
    app.use((req, res) => {
        res.status(404).end();
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    //call the function to start the inquirer query
    question();
}

function question(){
    inquirer //Ask the user what they would like to do.
        .prompt([
            {
                type: "list", 
                name: "choice",
                message: "What would you like to do?",
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
            }
        ])
        .then((data) => {
            switch (data.choice){ //Switch case statement to go through the answer given
                case "View all departments":
                    viewAllDept();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmp();
                    break;
                case "Add a department":
                    inquirer //get more information for the new department
                        .prompt([
                            {
                                type: "input",
                                name: "newDept",
                                message: "Enter the new department:",
                            }
                        ])
                        .then((data) => {
                            addDept(data.newDept);
                        });
                    break;
                case "Add a role":
                    inquirer //get more information for the new role
                        .prompt([
                            {
                                type: "input",
                                name: "newRole",
                                message: "Enter the new role:",
                            },
                            {
                                type: "input",
                                name: "salary",
                                message: "Enter the salary of the new role:",
                            }, 
                            {
                                type: "number",
                                name: "department",
                                message: "Enter the department id for the new role:",
                            }
                        ])
                        .then((data) => {
                            addRole(data.newRole, data.salary, data.department);
                        });
                    break;
                case "Add an employee":
                    inquirer //get more information for the new employee
                        .prompt([
                            {
                                type: "input",
                                name: "newEmpFirst",
                                message: "Enter the new employee's first name:",
                            },
                            {
                                type: "input",
                                name: "newEmpLast",
                                message: "Enter the new employee's last name:",
                            },
                            {
                                type: "number",
                                name: "newEmpRoleID",
                                message: "Enter the new employee's role:",
                            },
                            {
                                type: "number",
                                name: "newEmpManager",
                                message: "Enter the new employee's manager ID. If no one, please leave blank:",
                                default: "",
                            }
                        ])
                        .then((data) => {
                            addEmp(data.newEmpFirst, data.newEmpLast, data.newEmpRoleID, data.newEmpManager);
                        });
                    break;
                case "Update an employee role":
                    inquirer //get more information in order to update the employee
                        .prompt([
                            {
                                type: "number",
                                name: "empID",
                                message: "Enter the employee's ID:",
                            },
                            {
                                type: "number",
                                name: "newRoleID",
                                message: "Enter the employee's new role ID:",
                            }
                        ])
                        .then((data) => {
                            updateEmp(data.empID, data.newRoleID);
                        });
                    break;
                default: //Not possible with inquirer selections available but if they were somehow able to answer something different, this handles it.
                    console.log("That was not a correct entry. Please start again.");
                    process.exit;
            }
        });
}

//function to display all data in the departments table
function viewAllDept(){
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
    });
    restart();
}

//function to display all data in the roles table
function viewAllRoles(){
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
    });
    restart();
}

//function to display all data in the employee table
function viewAllEmp(){
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
    });
    restart();
}

//function to add the new department entered in to the department table
function addDept(newDept){
    db.query(`INSERT INTO department (name) VALUES (${newDept})`, function (err, results) {
        console.log(results);
    });
    restart();
}

//function to add the new role entered in to the role table
function addRole(newRole, salary, department){
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (${newRole}, ${salary}, ${department})`, function (err, results) {
        console.log(results);
    });
    restart();
}

//function to add the new employee entered in to the employee table
function addEmp(newEmpFirst, newEmpLast, newEmpRoleID, newEmpManager = 0){
    db.query(`INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES (${newEmpFirst}, ${newEmpLast}, ${newEmpRoleID}, ${newEmpManager})`, function (err, results) {
        console.log(results);
    });
    restart();
}

//function to update an employees' information in the employee table
function updateEmp(empID, newRoleID){
    db.query(`UPDATE employee SET role_id = ${newRoleID} WHERE id = ${empID}`, function (err, results) {
        console.log(results);
    });
    restart();
}

//function asks the operator if they would like to continue performing more operations. If they do, it will restart the questions funciton. If no, it will exit the process
function restart(){
    inquirer
        .prompt([
            {
                type: "list", 
                name: "restart",
                message: "Would you like to perform more operations?",
                choices: ["Yes", "No"],
            }
        ])
        .then((data) => {
            if (data.restart === "Yes"){
                question();
            } else if (data.restart === "No"){
                process.exit;
            }
            updateEmp(data.empID, data.newRoleID);
        });
}

init();