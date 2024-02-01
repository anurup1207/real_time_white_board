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
    successRedirect: "/home",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

module.exports = router;
