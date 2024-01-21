const express=require("express");
const {handleUserSignup , handleUserLogIn}=require('../controllers/user')
const router= express.Router();

router.post('/',handleUserSignup);
router.post('/login',handleUserLogIn);

module.exports= router;