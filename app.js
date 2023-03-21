const express=require("express");
const mysql2=require("mysql2");
const dotenv=require("dotenv");
const path=require("path");
const console = require("console");
dotenv.config({
path:"./.env"

});
const session=require("express-session");
const  route  = require("./controllers/auth");

const app=express();

app.use(session({
secret:'victor',
resave:true,
saveUninitialized:true

}))




const database=mysql2.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
});


const publicDirect=path.join(__dirname,'./public');
app.use(express.static(publicDirect));
app.use(express.static(__dirname));
// console.log(__dirname);



//parse url encoded bodies(as sent by html forms)
app.use(express.urlencoded({
    extended:false
}));
//parse json bodies(as sent by API)
app.use(express.json());

app.set("view engine","hbs");



//database connection
database.connect((error)=>{
    if(error){
        console.log("database error")
        // throw error
    }else{
        console.log("mysql connected successfully");
    }
});

module.exports=database;
// app.get("/", function(req,res) {
//     res.render("home");
// });
// app.get("/login", function(req,res) {
//     res.render("login");
// });
// app.get("/register", function(req,res) {
//     res.render("register");
// });

//define routes
app.use("/",require("./routes/pages"));

app.use("/auth",require("./routes/auth"));

// module.exports=route;

// app.listen(4002);
app.listen(3002,function () {
    console.log("server is working perfectly on port 3002 and yes")
});