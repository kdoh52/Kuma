const isAuthenticated = require("../config/middleware/isAuthenticated");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "kuma_db",
  multipleStatements: true
});
connection.connect();

module.exports = (app)=>{

  app.get("/", (req, res) => {
    if(req.user) {
      res.redirect("/profile");
    }
    res.render("login");
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
    connection.query("SELECT * FROM Users WHERE id=?; SELECT * FROM Profiles WHERE id=?", ["bb5f6087-621c-462f-a633-6450af1ce9ef", 1], function(err, data) {
      if (err) throw err;
      // console.log(data[0])
      // console.log(data[1])
      res.render("profile", { Users: data[0], Profiles: data[1] });
    })
  });

  app.get("/dashboard", isAuthenticated, (req, res)=>{
    res.render("dashboard");
  })

};
