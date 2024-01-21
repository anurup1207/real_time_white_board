const express= require('express')
const router= express.Router();
const {getSignupPage , getLoginPage }=require("../controllers/staticRouter")


// router.get("/",getWhiteBoard);

router.get("/signup",getSignupPage);

router.get("/login",getLoginPage);



module.exports=router;