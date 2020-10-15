const db = require("../models");
const passport = require("../config/passport");

module.exports = (app)=>{

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // {"email":"a@a.com","password":"a"}
    console.log(`req.body: ${req.body}`);
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user
  app.post("/api/signup", (req, res) => {
    console.log(`attempting to create a user with ${JSON.stringify(req.body)}`);
    db.User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }).then((dbUser)=>{
      res.json(dbUser.id);
      // res.redirect(307, "/api/login");
    }).catch((err)=>{
      console.log(`An error occurred: ${err}`);
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
