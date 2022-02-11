const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;
const path = require("path");
const session = require("express-session");
const Layouts = require("express-ejs-layouts");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(Layouts);
app.use(express.static(__dirname + "/public"));

app.use(require("./server/routes/AuthRoutes"));
app.use(require("./server/routes/Dashboard"));
app.use(require("./server/routes/SeniorRoutes"));
app.use(require("./server/routes/SubsetRoutes"));

app.listen(PORT, (err) => {
  if (!err) console.log("Web Server Runing..!");
});
