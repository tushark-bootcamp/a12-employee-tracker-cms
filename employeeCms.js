var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "app_pass01",
    database: "employee_cms_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

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
                connection.end();
            }
        });
}

function addRecords() {
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
            var department = answer.departmentName;
            addDepartmentInDB(department);
            start();
        });
}

function addDepartmentInDB(department) {

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
                getDepartmentList();
            })
        .then(function (answer) {
            var roleName = answer.newRoleName;
            var salary = answer.salary;
            var department = answer.department;
            addDepartmentInDB(roleName, salary, department);
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
                getRoleList();
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
                getEmployeeList();
            },
            {
                name: "role",
                type: "list",
                message: "Which of the below roles would like to assign for this employee?",
                getRoleList();
            })
        .then(function (answer) {
            var employee = answer.employee;
            var role = answer.role;
            updateEmployeeRoleInDB(employee, role);
            start();
        });
}

function updateEmployeeRoleInDB(employee, role) {}


