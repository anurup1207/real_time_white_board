const express= require('express')
const router= express.Router();
const {HandleGenerateRoom}=require('../controllers/urlId')



router.get("/room/:id",HandleGenerateRoom);

module.exports=router