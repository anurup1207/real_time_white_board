const express= require('express')
const router= express.Router();
const { getHomePage}=require("../controllers/homeRoute")

router.get("/",getHomePage);

module.exports=router;