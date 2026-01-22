var mysql = require("mysql2");
var util = require("util");

var conn = mysql.createConnection({
  host: "bhjwaswlf68ospas7oh3-mysql.services.clever-cloud.com",
  user: "uvetuzf7eqyshtcu",
  password: "JaV2bOZtAYjgyeZODNId",
  database: "bhjwaswlf68ospas7oh3",
  port: "3306"
});

var exe = util.promisify(conn.query).bind(conn);


conn.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

module.exports = exe;