const db = require("../models");
const passport = require("../config/passport");

module.exports = (app)=>{

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }).then((dbUser)=>{
      res.json(dbUser);
      res.redirect(307, "/api/login");
    }).catch((err)=>{
      res.status(401).json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
