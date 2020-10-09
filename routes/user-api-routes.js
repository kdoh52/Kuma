const db = require("../models");

module.exports = (app)=>{
  app.get("/api/users", (req, res)=>{
    db.User.findAll({include: [db.Post, db.Profile]}).then((dbUser)=>{
      res.json(dbUser);
    });
  });

  app.get("/api/users/:username", (req, res)=>{
    // 2; Add a join to include all of the Author's Posts here
    db.Author.findOne({
      include: [db.Post, db.Profile],
      where: {
        username: req.params.username
      }
    }).then((dbUser)=>{
      res.json(dbUser);
    });
  });

  app.post("/api/user", (req, res)=>{
    db.User.create(req.body).then((dbUser)=>{
      res.json(dbUser);
    });
  });

  app.delete("/api/authors/:id", function(req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

};