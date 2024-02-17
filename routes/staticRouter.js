const express= require('express')
const router= express.Router();
const {getSignupPage , getLoginPage }=require("../controllers/staticRouter")


// router.get("/",getWhiteBoard);

router.get("/signup",getSignupPage);

router.get("/login",getLoginPage);

router.get("/",(req,res)=>{
    res.redirect("/home");
})



module.exports=router;