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

var exit = () => {
  connection.end();
}

module.exports = {
  addDepartmentInDB: addDepartmentInDB,
  getDeptListFromDB: getDeptListFromDB,
  createRoleInDB: createRoleInDB,
  exit: exit
}