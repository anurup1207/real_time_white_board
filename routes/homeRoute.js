const express= require('express')
const router= express.Router();
const { getHomePage, HandleGenerateNewShortURL}=require("../controllers/homeRoute")

router.get("/",getHomePage);
router.get("/getid",HandleGenerateNewShortURL);

module.exports=router;