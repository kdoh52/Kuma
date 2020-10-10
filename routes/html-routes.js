const isAuthenticated = require("../config/middleware/isAuthenticated");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "kuma_db"
});

module.exports = (app)=>{

  app.get("/", (req, res) => {
    if(req.user) {
      res.redirect("/profile");
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    if(req.user){
      res.redirect("/profile");
    }
    res.render("login");
  });

  app.get("/signup", (req, res)=>{
    res.render("signup");
  });

  app.get("/profile-setup", (req, res)=>{
    if(req.user){
      res.redirect("/profile");
    }
    res.render("profile-setup");
  });

  app.get("/profile", isAuthenticated, (req, res) => {
    connection.query("SELECT * FROM Profiles WHERE id=1", function(err, data) {
      if (err) throw err;
      // console.log(Profiles: data[0].pet_name)
      res.render("profile", { Profiles: data });
    })
  });

  app.get("/dashboard", isAuthenticated, (req, res)=>{
    res.render("dashboard");
  })

};
