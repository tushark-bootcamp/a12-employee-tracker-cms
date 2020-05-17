var employeeData = require("./data/employeeData");
const Department = require("./pojo/Department");
const Employee = require("./pojo/Employee");
const Role = require("./pojo/Role");
var appsUtil = require("./util/appsUtil");

var inquirer = require("inquirer");

start();

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
            }
        });
}

function addRecords() {
    inquirer
        .prompt({
            name: "addRecords",
            type: "list",
            message: "Which of the below functions would you like to perform?",
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
    var deptList = getDepartmentList();
    inquirer
        .prompt([
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
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < deptList.length; i++) {
                        var department = deptList[i];
                        choiceArray.push(department.getName());
                    }
                    return choiceArray;
                }
            }
        ])
        .then(function (answer) {
            var dept = getDepartment(answer.department, deptList);
            console.log("detartment selected: " + dept.getId());
            var role = new Role("", answer.newRoleName, answer.salary, dept);
            employeeData.createRoleInDB(role);
            start();
            //console.log("creatin new role");
        });
}

function getDepartmentList() {
    var departments = employeeData.getDeptListFromDB();
    return departments;
}

function getDepartment(name, deptList) {
    var department = null;
    deptList.forEach((element, i) => {
        var nameI = element.getName();
        if (nameI === name) {
            department = element;
            //console.log("detartment returned: " + department.getName() + " id: " + department.getId());
            return;
        }
    });
    return department;
}

function addEmployees() {
    var roleList = getRoleList();
    inquirer
        .prompt([
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
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < roleList.length; i++) {
                        var role = roleList[i];
                        choiceArray.push(role.getTitle());
                    }
                    return choiceArray;
                }
            }
        ])
        .then(function (answer) {
            var role = getRole(answer.role, roleList);
            console.log("Role selected: " + role.getTitle());
            var employee = new Employee("", answer.name, answer.lastName, role, null);
            //employee constructor(id, name, lastName, role, manager)
            shouldAssignManager(employee, role);
        });
}

function getRoleList() {
    var roles = employeeData.getRolesListFromDB();
    return roles;
}

function getRole(title, roleList) {
    var role = null;
    roleList.forEach((element, i) => {
        var titleI = element.getTitle();
        if (titleI === title) {
            role = element;
            //console.log("Role returned: " + role.getTitle() + " id: " + role.getId());
            return;
        }
    });
    return role;
}

function shouldAssignManager(employee, role) {
    inquirer.prompt([
        {
            type: "list",
            name: "assignMgr",
            message: "Would you like to assign a manager for this employee?",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(function (answer) {
        if (answer.assignMgr === "Yes") {
            assignManager(employee, role);
        } else {
            employeeData.createEmployeeInDB(employee, role);
            start();
        }
    });
}

function assignManager(employee, role) {
    var employeeList = getEmployeeList().then(function () {
        inquirer.prompt([
            {
                type: "list",
                name: "manager",
                message: "Select the employee you would like to assign as the manager for " + employee.getName(),
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < employeeList.length; i++) {
                        var employee = employeeList[i];
                        choiceArray.push(employee.getId() + " " + employee.getName() + " " + employee.getLastName());
                    }
                    return choiceArray;
                }
            }
        ]).then(function (answer) {
            var manager = getManager(answer.manager, employeeList);
            console.log("Manager selected: " + answer.manager);
            employee.setManager(manager);
            employeeData.createEmployeeInDB(employee, role);
            start();
        })
    });
}

function getEmployeeList() {
    var employees = employeeData.getEmployeeListFromDB();
    console.log("Employee List size: " + employees.length);
    return employees;
}

function getManager(managerString, employeeList) {
    var manager = null;
    var managerId = appsUtil.retrieveToken(managerString, 1);
    roleList.forEach((element, i) => {
        var managerIdI = element.getId();
        if (managerIdI === managerId) {
            manager = element;
            //console.log("Manager selected: " + manager.getName() + " id: " + manager.getId());
            return;
        }
    });
    return manager;
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