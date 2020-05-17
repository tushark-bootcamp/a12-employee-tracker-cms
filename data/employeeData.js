var mysql = require("mysql");
var Department = require("../pojo/Department");
var Employee = require("../pojo/Employee");
var Role = require("../pojo/Role");

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

connection.connect(function (err) {
  if (err) throw err;
});

var addDepartmentInDB = (department) => {
  connection.query(
    "INSERT INTO department SET ?",
    {
      name: department.name
    },
    function (err) {
      if (err) throw err;
      console.log("Department " + department.name + " was created successfully!");
    }
  );
}

var getDeptListFromDB = () => {
  var deptList = [];
  connection.query(
    "SELECT * from department", function (err, results) {
      if (err) throw err;
      results.forEach((element, i) => {
        var deptId = element.id;
        var deptName = element.name;
        var department = new Department(deptId, deptName);
        deptList.push(department);
        //console.log("Department List " + deptName);
      });
    }
  );
  return deptList;
}

var createRoleInDB = (role) => {
  connection.query(
    "INSERT INTO role SET ?",
    {
      title: role.getTitle(),
      salary: role.getSalary(),
      department_id: role.getDepartment().getId()
    },
    function (err) {
      if (err) throw err;
      console.log("Role " + role.getTitle() + " was created successfully!");
    }
  );
}

var getRolesListFromDB = () => {
  var selectQry = "SELECT role.id, role.title, role.salary, role.department_id, department.name FROM role, department where role.department_id=department.id ORDER BY role.title";
  var rolesList = [];
  connection.query(
    selectQry, function (err, results) {
      if (err) throw err;
      results.forEach((element, i) => {
        var roleId = element.id;
        var title = element.title;
        var salary = element.salary;
        var deptId = element.department_id;
        var deptName = element.name;
        var department = new Department(deptId, deptName);
        var role = new Role(roleId, title, salary, department);
        rolesList.push(role);
        //console.log("Role List " + title);
      });
    }
  );
  return rolesList;
}

var createEmployeeInDB = (employee, role) => {
  var params = null;
  if (employee.getManager()) {
    params = {
      first_name: employee.getName(),
      last_name: employee.getLastName(),
      role_id: role.getId(),
      manager_id: employee.getManager().getId()
    };
  } else {
    params = {
      first_name: employee.getName(),
      last_name: employee.getLastName(),
      role_id: role.getId()
    };
  }
  connection.query(
    "INSERT INTO employee SET ?",
    params,
    function (err) {
      if (err) throw err;
      console.log("Employee " + employee.getFirstName() + " was created successfully!");
    }
  );
}

var getEmployeeListFromDB = async () => {
  var selectQry = "SELECT emp.id as id, emp.first_name as firstName, emp.last_name as lastName, emp.role_id as roleId, emp.manager_id as managerId, manager.first_name as managerName, manager.last_name as managerLName, role.title as title, role.salary as salary, dept.id as deptId, dept.name as deptName FROM employee emp inner join role role on emp.role_id = role.id inner join department dept on role.department_id = dept.id left join employee manager on emp.manager_id = manager.id ORDER BY firstName";
  var employeeList = [];
  try {
    await connection.query(
      selectQry, function (err, results) {
        //console.log("Results size: " + results.length);
        if (err) throw err;
        results.forEach((element, i) => {
          var id = element.id;
          var name = element.firstName;
          var lastName = element.lastName;
          var roleId = element.roleId;
          var title = element.title;
          var salary = element.salary;
          var deptId = element.deptId;
          var deptName = element.deptName;
          var managerId = element.managerId;
          var manager = null;
          if (managerId != null) {
            var managerName = element.managerName;
            var managerLName = element.managerLName;
            manager = new Employee(managerId, managerName, managerLName, null, null);
          }
          var department = new Department(deptId, deptName);
          var role = new Role(roleId, title, salary, department);
          //employee constructor(id, name, lastName, role, manager)
          var employee = new Employee(id, name, lastName, role, manager);
          employeeList.push(employee);
          console.log("Employee List Length for i: " + employeeList.length);
        });
      }
    );
    console.log("Employee List Length getEmployeeListFromDB(): " + employeeList.length);
    return employeeList;
  } catch (error) {
    console.log(error);
  }
}

var assignManagerInDB = (employeeId, managerId) => {

}

var exit = () => {
  connection.end();
}

module.exports = {
  addDepartmentInDB: addDepartmentInDB,
  getDeptListFromDB: getDeptListFromDB,
  createRoleInDB: createRoleInDB,
  getRolesListFromDB: getRolesListFromDB,
  createEmployeeInDB: createEmployeeInDB,
  getEmployeeListFromDB: getEmployeeListFromDB,
  assignManagerInDB: assignManagerInDB,
  exit: exit
}