const db = require("../models");

module.exports = (app)=>{

  // GET route for getting all of the posts
  app.get("/api/posts", (req, res)=>{
    const query = {};
    if(req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // 1. Add a join here to include all of the Authors to these posts
    db.Post.findAll({
      include: [db.User],
      where: query
    }).then((dbPost)=>{
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:title", (req, res)=>{
    // 2. Add a join here to include the Author who wrote the Post
    db.Post.findOne({
      include: [db.User],
      where: {
        title: req.params.title
      }
    }).then((dbPost)=>{
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", (req, res)=>{
    db.Post.create(req.body).then((dbPost)=>{
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:title", (req, res)=>{
    db.Post.destroy({
      where: {
        title: req.params.title
      }
    }).then((dbPost)=>{
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", (req, res)=>{
    db.Post.update(req.body,{
        where: {
          id: req.body.id
        }
      }).then((dbPost)=>{
      res.json(dbPost);
    });
  });
};
