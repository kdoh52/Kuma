const db = require("../models");

module.exports = (app)=>{

  // GET route for getting all of the posts
  app.get("/api/profiles", (req, res)=>{
    const query = {};
    if(req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // 1. Add a join here to include all of the Authors to these posts
    db.Profile.findAll({
      include: [db.User],
      where: query
    }).then((dbProfile)=>{
      res.json(dbProfile);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/profiles/:bio", (req, res)=>{
    // 2. Add a join here to include the Author who wrote the Post
    db.Profile.findOne({
      include: [db.User],
      where: {
        bio: req.params.bio
      }
    }).then((dbProfile)=>{
      console.log(dbProfile);
      res.json(dbProfile);
    });
  });

  // POST route for saving a new post
  app.post("/api/profiles", (req, res)=>{
    db.Profile.create({
      bio: req.body.petBio,
      pet_name: req.body.petName,
      breed: req.body.petBreed,
      age: req.body.petAge,
      pet_energy: req.body.petEnergy,
      pet_personality: req.body.petPersonality,
      micro_chip: req.body.petChip,
      vet_clinic: req.body.petVet,
      profile_picture: req.body.petImg
    }).then((dbProfile)=>{
      res.json(dbProfile);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/profiles/:bio", (req, res)=>{
    db.Profile.destroy({
      where: {
        bio: req.params.bio
      }
    }).then((dbProfile)=>{
      res.json(dbProfile);
    });
  });

  // PUT route for updating posts
  app.put("/api/profiles", (req, res)=>{
    db.Profile.update(req.body,{
        where: {
          id: req.body.id
        }
      }).then((dbProfile)=>{
      res.json(dbProfile);
    });
  });
};
