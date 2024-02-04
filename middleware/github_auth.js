const GithubStrategy = require("passport-github2").Strategy;
const User = require('../model/user');



exports.initializingGithubPassport = (passport) => {
  passport.use(
    new GithubStrategy({
    
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      passReqToCallback : true,
    },async function(req, accessToken,refreshToken,profile,done){
    
        const profileJson = profile._json;
        var name = profile.displayName;
        if(!name){
            name="null";
        }
        const username = profileJson.login;
        const password = "Github_sign_in";
        console.log(username)
        console.log(name)
        
      
      const user = await User.findOne({username});

      if(!user){
       const user1 = await User.create({
          name,
          username,
          password

        });
        return done(null,user1)
      }
    
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
