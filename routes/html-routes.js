const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

// var mysql = require("mysql");

// var globalVar = require("../public/js/login");
// console.log(globalVar.global)

// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "1234",
//   database: "kuma_db",
//   multipleStatements: true
// });
// connection.connect();

module.exports = (app) => {

  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/profile");
    }
    res.render("login");
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/profile");
    }
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/profile-setup", (req, res) => {
    if (req.user) {
      res.redirect("/profile");
    }
    res.render("profile-setup");
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // app.get("/profile", isAuthenticated, (req, res) => {
  //   connection.query("SELECT * FROM Users WHERE id=?; SELECT * FROM Profiles WHERE id=?", [1, 1], function(err, data) {
  //     if (err) throw err;
  //     res.render("profile", { Users: data[0], Profiles: data[1] });
  //   })
  // });

  app.get("/profile", isAuthenticated, (req, res) => {
    // connection.query("SELECT * FROM Users WHERE id=?; SELECT * FROM Profiles WHERE id=?", [2, 2], function(err, data) {
    //   if (err) throw err;
    //   res.render("profile", { Users: data[0], Profiles: data[1] });
    // })
    console.log("WE ARE HERE" + db.User.id)

    db.User.findAll({
      where: { id: 2 }
    })
      .then(function (dbUser) {
        db.Profile.findAll({
          where: { id: 2 }
        })
          .then(function (dbProfile) {
            console.log("this is", dbUser)
            console.log("this is", dbProfile)
            res.render("profile", { Users: dbUser, Profiles: dbProfile })
          })
      })
  });

  // app.get("/profile/:id", isAuthenticated, (req, res) => {
  //   connection.query("SELECT * FROM Users WHERE id=?; SELECT * FROM Profiles WHERE id=?", [req.params.id, req.params.id], function(err, data) {
  //     if (err) throw err;
  //     res.render("profile", { Users: data[0], Profiles: data[1] });
  //     console.log(req.params.id);
  //   })
  // });
  app.get("/profile/:id", isAuthenticated, (req, res) => {
    console.log('👋 loading /profile/:id');
    db.User.findAll({
      where: { 
        id: req.params.id 
      }
    })
    .then(dbUser => {
      console.log(`👋 dbUser is returned: ${JSON.stringify(dbUser)}`);
      console.log(`👋👋 req.params: ${JSON.stringify(req.params)}`);

      db.Profile.findAll({
        where: { 
          id: req.params.id 
        }
      })
      .then(dbProfile => {
        console.log(`👋 dbProfile is returned: ${JSON.stringify(dbProfile)}`);
        console.log(`👋👋 dbUser: ${JSON.stringify(dbUser)}`);
        console.log(`👋👋 dbProfile: ${JSON.stringify(dbProfile)}`);
        res.render("profile", { Users: dbUser, Profiles: dbProfile })
      })

    })
  });

  app.get("/dashboard", isAuthenticated, (req, res) => {
    // connection.query("SELECT * FROM Profiles", function(err, data) {
    //   if (err) throw err;
    //   console.log({ dogs: data })
    //   res.render("dashboard", { dogs: data });
    // })

    db.Profile.findAll()
      .then(function (dbProfile) {
        res.render("dashboard", { dogs: dbProfile })
      })
  })

};
