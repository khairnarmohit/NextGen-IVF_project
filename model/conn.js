var mysql = require("mysql2");
var util = require("util");

var conn = mysql.createPool({
  host: "bprlqrokrwlzpporvdd4-mysql.services.clever-cloud.com",
  user: "uvxpln6bip7zygue",
  password: "MrfPkWRNWp90aBliN40L",
  database: "bprlqrokrwlzpporvdd4",
  port: "3306",
});

var exe = util.promisify(conn.query).bind(conn);

conn.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

module.exports = exe;
