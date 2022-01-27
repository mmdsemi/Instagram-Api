const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "instatoos",
});
con.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected");
});

con.secondaryQuery = con.query;
con.query = (...query) =>
  new Promise((resolve, reject) => {
    try {
      con.secondaryQuery(...query, (error, results, fields) =>
        error ? reject(error) : resolve({ results, fields })
      );
    } catch (error) {
      reject(error);
    }
  });

module.exports = con;
