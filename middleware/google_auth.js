const GoogleStrategy = require("passport-google-oauth2").Strategy;
require('dotenv').config({path:'../.env'})
const User = require('../model/user');


exports.initializingGooglePassport = (passport) => {
  passport.use(
    new GoogleStrategy({
    
      clientID: '909433016100-il9nqnueeou32t2b5qch5ngjvnai6gci.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/google/callback',
      passReqToCallback : true,
    },async function(req, accessToken,refreshToken,profile,done){
        const profileJson = profile._json;
        const name = profile.displayName;
        const username = profileJson.email;
        const password = "Google_sign_in";
        
      
      const user = await User.findOne({username});

      if(!user){
       const user1 = await User.create({
          name,
          username,
          password

        });
        return done(null,user1)
      }
      // req.user=user;
        return done(null,user);
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
