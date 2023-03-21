const express=require('express');
const authController=require('../controllers/auth');
const mysql=require("mysql2");
const bcryptjs=require("bcryptjs");
const session =require("express-session");

const router = express.Router();

// var database=require('../app');
// const { response } = require('express');


// router.get('/',(req,res,next)=>{
//     res.render('home',{message_1: 'Welcome '+ req.session.userEmail})
// });

// router.post("/",authController.home);


router.post('/login',authController.login);

router.post('/register',authController.register);








module.exports=router;