var mysql = require("mysql");
var department = require("../pojo/Department");
var employee = require("../pojo/Employee");
var role = require("../pojo/Role");

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
        function(err) {
          if (err) throw err;
          console.log("Department " + department.name + " was created successfully!");
        }
      );
}

var exit = () => {
    connection.end;
}

module.exports = {
    addDepartmentInDB: addDepartmentInDB,
    exit: exit
}