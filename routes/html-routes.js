const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app)=>{

  app.get("/", (req, res) => {
    if(req.user) {
      res.redirect("/profile");
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    if(req.user) {
      res.redirect("/profile");
    }
    res.render("login");
  });

  app.get("/profile", isAuthenticated, (req, res) => {
    res.render("profile");
  });

};
