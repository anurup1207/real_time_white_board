const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../model/user");
const { compareSync, hashSync } = require("bcrypt");

exports.intializingSignInPassport = (passport) => {
  passport.use(
    "local.signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const name = req.body.name;
          const user1 = await User.findOne({ username });

          // if no user found then create the user in database
          if (!user1) {
            const user = await User.create({
              name: name,
              username: username,
              password: hashSync(password, 10),
            });
            return done(null, user);
          }
          // else return false
          return done(
            null,
            false,
            req.flash("signupMessage", "That email is already taken.")
          );
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

exports.intializingLogInPassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        console.log(user);

        if (!user) return done(null, false);

        if (!compareSync(password, user.password)) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};

exports.isAuthenticated = (req, res, next) => {
  if (req.user) return next();

  res.redirect("/login");
};
