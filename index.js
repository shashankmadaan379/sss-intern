var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var app = express();
var mysql = require("mysql2");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "thepizzastory",
});
con.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});
app.get("/", function (req, res) {
  con.query("SELECT * FROM products", (err, result) => {
    res.render("pages/index", { result: result });
  });
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
