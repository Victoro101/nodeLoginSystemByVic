
const mysql2=require("mysql2");
const jwt=require("jsonwebtoken");
const bcryptjs=require("bcryptjs");
const express=require("express");
const session=require("express-session");
const router = express.Router();
// const app=express();

const database=mysql2.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
});


exports.register = (req,res)=>{
    console.log(req.body);
    // const fname=req.body.fname;
// const lname=req.body.lname;
// const email=req.body.email;
// const password=req.body.password;
// const confirmPassword=req.body.confirmPassword;

const{fname,lname,email,phoneNumber,password,confirmPassword }=req.body;
database.query("SELECT email FROM testing WHERE email=?",[email],async(error,results)=>{
    if(error){
console.log(error);
    }
    if( results.length > 0){
return res.render("register",{
    message:"Email Already Exists !"
})
    }else if(password !== confirmPassword){
        return res.render("register",{
            message:"Password don't match !"
    });
}

let hashedPassword=await bcryptjs.hash(password,10);
console.log(hashedPassword);
database.query("INSERT INTO testing SET ?",{FirstName:fname,LastName:lname, email:email,password:password,PhoneNumber:phoneNumber,ConfirmPassword:confirmPassword,HashedPassword:hashedPassword },(error,results)=>{
if(error){
    console.log(error);
}else{
    console.log(results);
    return res.render('home',{
       
              message_1: " "+fname +" "+lname
         
    })
}
})

});

//  res.send("form submitted");
}


exports.login = (req,res)=>{

    // router.get('/',(req,res,next)=>{
    //     res.render('home',{title:'express',session:req.session})
    // });
    // router.post('/login',function (req,res,next) {
        var userEmail=req.body.email;
        var userPassword=req.body.password;
        console.log(userEmail);
        console.log(req.body);
    console.log(userPassword);

        if(userEmail && userPassword){
    //  query=`SELECT * FROM testing where email="$(userEmail)"`;
    
    database.query("SELECT * FROM testing where email=?",[userEmail],function(error,result,fields) {
        if(result.length>0)
        {
    
            for(var count=0;count<result.length;count++){
    
                if(result[count].password == userPassword){
                    req.session.id=result[count].id;
                    req.session.FirstName=result[count].FirstName;
                    req.session.LastName=result[count].LastName;

              res.redirect("/");
                    // res.send("Welcome"+ FirstName );
                    // res.render("home");
                    
                }else{
    
                  return  res.render("login",{
                       loginMessage:"Incorrect Password !"
                    })
                }
                
            }
        }
        else{
           return  res.render("login",{
                loginMessage:"Invalid Email !"
            });
    
        }
        res.end();
    });
        }
        else{
            
           return  res.render('login',
            {loginMessage:'Enter all data'});
            
            // res.end();
        }
        // });
        
        // if(error){
        
        //     console.log(error);
        // }else{
    
        //       return  res.render('/',{
        //             message_1: "Welcome" + userEmail
                  
        //          });
        // exports.home=(req,res,next)=>{

            
            // }
            
            // }
            
            router.get("/logout",function (req,res,next) {
                req.session.destroy();
                res.redirect("/login");
            })
        // }
    
   
}    
// app.use("/",require("/Users/DV DESIGNS/Desktop/NodeLoginSystem/routes/pages"));


// module.exports=router;








