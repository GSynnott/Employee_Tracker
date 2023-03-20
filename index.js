const inquirer = require('inquirer');

function question(){
    inquirer
        .prompt([
            {
                type: "list", 
                name: "choice",
                message: "What would you like to do?",
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
            }
        ])
        .then((data) => {
            switch (data.choice){
                case "View all departments":
                    break;
                case "View all roles":
                    break;
                case "View all employees":
                    break;
                case "Add a department":
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "newDept",
                                message: "Enter the new department:",
                            }
                        ])
                        .then((data) => {

                        });
                    break;
                case "Add a role":
                    inquirer
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

                        });
                    break;
                case "Add an employee":
                    inquirer
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

                        });
                    break;
                case "Update an employee role":
                    inquirer
                        .prompt([
                            {
                                type: "number",
                                name: "empID",
                                message: "Enter the employee's ID:",
                            },
                            {
                                type: "number",
                                name: "empID",
                                message: "Enter the employee's new role ID:",
                            }
                        ])
                        .then((data) => {

                        });
                    break;
                default:
                    console.log("That was not a correct entry. Please start again.");
                    process.exit;
            }
        });
}