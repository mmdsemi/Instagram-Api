 const express = require("express");
 const app = express();
 const dotenv = require("dotenv");
 dotenv.config({path : "config.env"})
const PORT = process.env.PORT || 3000;
const path = require("path")
const http = require("http").createServer(app);
const Layouts = require("express-ejs-layouts")
 

app.set("view engine" , "ejs")
app.use(Layouts)
app.use(express.static(__dirname + "/public"));



app.use("/" , require("./server/routes/routes"));



http.listen(PORT , (err)=>{
    if(!err) console.log("Web Server Runing..!")
})




