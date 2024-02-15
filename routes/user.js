const express = require("express");
// const { handleUserSignup, handleUserLogIn } = require("../controllers/user");
const passport = require("passport");
const router = express.Router();

// router.post("/", handleUserSignup);

router.post('/', passport.authenticate('local.signup' , {
  successRedirect : '/home',
  failuerRedirect : '/signup',
  failuerFlash: true
  }));

router.post(
  "/login",
  passport.authenticate("local", {
    keepSessionInfo:true,
    successReturnToOrRedirect:'/home',
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.get("/logout",(req,res,next)=>{
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/home');
  });
  res.redirect('/home');
});

// router.post("/switchaccount",(req,res,next)=>{
//   const redirectingid=req.body;
//   console.log(redirectingid);
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     return res.redirectingid;
    
//   });
  

// })


module.exports = router;
