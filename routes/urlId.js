const express= require('express')
const router= express.Router();
const {HandleGenerateNewShortURL,HandleGenerateRoom}=require('../controllers/urlId')


router.get("/getId", HandleGenerateNewShortURL);
router.get("/room/:id",HandleGenerateRoom);

module.exports=router