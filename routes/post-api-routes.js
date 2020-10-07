const db = require("../models");

module.exports = (app)=>{

  // GET route for getting all of the posts
  app.get("/api/posts", (req, res)=>{
    let query = {};
    if(req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // 1. Add a join here to include all of the Authors to these posts
    db.Post.findAll({
      include: [db.USer],
      where: query
    }).then((dbPost)=>{
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", (req, res)=>{
    // 2. Add a join here to include the Author who wrote the Post
    db.Post.findOne({
      include: [db.User],
      where: {
        id: req.params.id
      }
    }).then((dbPost)=>{
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", (req, res)=>{
    db.Post.create(req.body)
    .then((dbPost)=>{
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", (req, res)=>{
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbPost)=>{
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", (req, res)=>{
    db.Post.update(
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
