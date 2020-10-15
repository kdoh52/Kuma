const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(new LocalStrategy({
    usernameField: "email"
  },
  (email, password, done)=>{
    console.log(`PASSPORT, email: ${JSON.stringify(email)}, password: ${JSON.stringify(password)}}`)
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then((dbUser)=>{
      console.log(`PASSPORT, dbUser: ${JSON.stringify(dbUser)}`);
      // If there's no user with the given email
      if (!dbUser) {
        console.log('user not found!');
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        console.log(`PASSPORT, incorrect password for user: ${password}`);
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    }).catch((err)=>{
      console.log(`PASSPORT, an error occurred: ${err}`);
      res.status(401).json(err);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
