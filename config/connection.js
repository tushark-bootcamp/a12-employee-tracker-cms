// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "app_pass01",
  database: "employee_cms_DB"
});

// Export connection for our ORM to use.
module.exports = connection;
