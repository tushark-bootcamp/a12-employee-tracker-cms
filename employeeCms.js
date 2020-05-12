var employeeData = require("./data/employeeData");
const Department = require("./pojo/Department");
const Employee = require("./pojo/Employee");
const Role = require("./pojo/Role");

var inquirer = require("inquirer");

start();
console.log("past)")

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "initAction",
            type: "list",
            message: "Which of the below functions would you like to execute?",
            choices: [
                "Add department, roles or employees",
                "View departments, roles or employees",
                "Update employee roles",
                "Update employee managers",
                "View employees by managers",
                "Delete departments roles and employees",
                "View total utilised budget of department",
                "Exit"
            ]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.initAction === "Add department, roles or employees") {
                addRecords();
            }
            else if (answer.initAction === "View departments, roles or employees") {
                viewRecords();
            }
            else if (answer.initAction === "Update employee roles") {
                updateEmployeeRoles();
            }
            else if (answer.initAction === "Update employee managers") {
                updateEmployeeManagers();
            }
            else if (answer.initAction === "View employees by managers") {
                viewEmployeeByManagers();
            }
            else if (answer.initAction === "Delete departments roles and employees") {
                deleteDeptRolesEmps();
            }
            else if (answer.initAction === "View total utilised budget of department") {
                viewDeptBudget();
            }
            else {
                employeeData.exit();
                console.log("End");
                //shouldContinue = false;
            
            }
        });
}

async function addRecords() {
    inquirer
        .prompt({
            name: "addRecords",
            type: "list",
            message: "Which of the below add functions would you like to perform?",
            choices: [
                "Add department",
                "Add roles",
                "Add employees",
                "Return"
            ]
        })
        .then(function (answer) {
            if (answer.addRecords === "Add department") {
                addNewDepartment();
            }
            else if (answer.addRecords === "Add roles") {
                createNewRole();
            }
            else if (answer.addRecords === "Add employees") {
                addEmployees();
            } else {
                start();
            }
        });
}

function addNewDepartment() {
    inquirer
        .prompt({
            name: "departmentName",
            type: "input",
            message: "Please enter the name of new department"
        })
        .then(function (answer) {
            var department = new Department("", answer.departmentName);
            employeeData.addDepartmentInDB(department);
            start();
        });
}


function createNewRole() {
    inquirer
        .prompt(
            {
                name: "newRoleName",
                type: "input",
                message: "Please enter the name of new role"
            },
            {
                name: "salary",
                type: "input",
                message: "Please enter the salary for this new role"
            },
            {
                name: "department",
                type: "list",
                message: "Which of the below departments would like to add this role in?",
                choices: getDepartmentList()
            })
        .then(function (answer) {
            addDepartmentInDB(answer.newRoleName, answer.salary, answer.department);
            viewDepartments();
            start();
        });
}

function getDepartmentList() {
    var departments = ["IT", "Sales", "Marketing", "Engineering"];
    return departments;
}

function addDepartmentInDB(roleName, salary, department) {

}

function addEmployees() {
    inquirer
        .prompt(
            {
                name: "name",
                type: "input",
                message: "Please enter the first name of new employee"
            },
            {
                name: "lastName",
                type: "input",
                message: "Please enter the last name of new employee"
            },
            {
                name: "role",
                type: "list",
                message: "Which of the below roles would like to assign for this employee?",
                choices: getRoleList()
            })
        .then(function (answer) {
            var name = answer.name;
            var lastName = answer.lastName;
            var role = answer.role;
            createEmployeeInDB(roleName, salary, department);
            shouldAssignManager();
        });
}

function createEmployeeInDB(roleName, salary, department) {

}

function shouldAssignManager(employeeId) {
    inquirer
        .prompt({
            name: "managerYesNo",
            type: "list",
            message: "Would you like to assign a manager for this employee?",
            choices: ["YES", "NO"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.managerYesNo === "YES") {
                assignManagerInDB(employeeId);
                viewEmployees();
                start();
            }
            else {
                start();
            }
        });
}

function assignManagerInDB(employeeId) {

}

function viewRecords() {
    inquirer
        .prompt({
            name: "viewRecords",
            type: "list",
            message: "Which of the below add functions would you like to perform?",
            choices: [
                "View departments",
                "View roles",
                "View employees",
                "Return"
            ]
        })
        .then(function (answer) {
            if (answer.viewRecords === "View departments") {
                viewDepartments();
                start();
            }
            else if (answer.viewRecords === "View roles") {
                viewRoles();
                start();
            }
            else if (answer.viewRecords === "View employees") {
                viewEmployees();
                start();
            } else {
                start();
            }

        });
}

function viewDepartments() { }

function viewRoles() { }

function viewEmployees() { }

function updateEmployeeRoles() {
    inquirer
        .prompt(
            {
                name: "employee",
                type: "list",
                message: "Which of the below employee's role would like to update?",
                choices: getEmployeeList()
            },
            {
                name: "role",
                type: "list",
                message: "Which of the below roles would like to assign for this employee?",
                choices: getRoleList()
            })
        .then(function (answer) {
            var employee = answer.employee;
            var role = answer.role;
            updateEmployeeRoleInDB(employee, role);
            start();
        });
}

function updateEmployeeRoleInDB(employee, role) { }


console.log("EOF")