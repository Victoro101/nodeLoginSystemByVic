const express=require('express');
const session=require("express-session");
// const kcontroller=require("../con/")
const authController=require("../controllers/auth")
const router = express.Router();


// exports.login=(req,res)=>{
//     var userEmail=req.body.email;
// }


// router.post('/login',(req,res)=>{
//     // var userEmail=req.body.email;
//     // var userPassword=req.body.password;
//     res.render("login");
//     // router.get('/',(req,res,next)=>{
//     //       res.render('home',{message_1: 'Welcome '+ req.session.userEmail})
//     //   });
// })


router.get('/',(req,res)=>{
  if((req.session.FirstName== undefined) &&(req.session.LastName==undefined)){
      var fname=req.session.FirstName;
      var lname=req.session.LastName;
    //   res.render("home",{
    //       message_1:'Welcome '+ fname +" "+lname
    //   });
      
      res.render("home");
      

  }else{
    var fname=req.session.FirstName;
    var lname=req.session.LastName;
       res.render("home",{
          message_1:' '+ fname +" "+lname
      });
  }
})

router.get('/login',(req,res)=>{
//   var userEmail=req.body.userEmail;
    res.render("login");
})

router.get("/logout",function (req,res) {
    // req.session.destroy();
res.redirect("/login");
})



router.get('/register',(req,res)=>{
    res.render("register");
})

module.exports=router;