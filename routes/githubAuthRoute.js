const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/",
  passport.authenticate("github", { scope: ['user:email'] })
);

router.get(
  "/callback",
  passport.authenticate("github", {
    keepSessionInfo: true,
    successReturnToOrRedirect: "/home",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

module.exports = router;
