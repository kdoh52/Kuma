const db = require("../models");

module.exports = (app)=>{

  // GET route for getting all profiles
  app.get("/api/profiles", (req, res)=>{
    let query = {};
    if(req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // 1. Add a join here to include all of the Authors to these posts
    db.Profile.findAll({
      include: [db.User],
      where: query
    }).then((dbPost)=>{
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single profile
  app.post("/api/profiles/:username", (req, res)=>{
    // 2. Add a join here to include the Author who wrote the Profile
    db.Profile.findOne({
      include: [db.User],
      where: {
        username: req.params.username
      }
    }).then((dbPost)=>{
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  // POST route for saving a new profile
  app.post("/api/profiles", (req, res)=>{
    db.Profile.create(req.body)
    .then((dbPost)=>{
      res.json(dbPost);
    });
  });

  // DELETE route for deleting profiles
  app.delete("/api/profiles/:id", (req, res)=>{
    db.Profile.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbPost)=>{
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/profiles", (req, res)=>{
    db.Profile.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then((dbPost)=>{
      res.json(dbPost);
    });
  });
};
