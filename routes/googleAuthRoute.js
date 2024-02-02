const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    keepSessionInfo: true,
    successReturnToOrRedirect: "/home",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

module.exports = router;
