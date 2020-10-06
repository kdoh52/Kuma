const db = require("../models");

module.exports = (app)=>{
    //Join to include all of each User's Posts and profile
    app.get("/api/users", (req, res)=>{
        db.User.findAll({include: [db.Post, db.Profile]})
        .then((dbUser)=>{
            res.json(dbUser);
        });
    });
    //Join to include searched post and profile
    app.get("/api/users", (req, res)=>{
        db.User.findOne({
            include: [db.Post, db.Profile],
            where: {
                id: req.params.id
            }
        }).then((dbUser)=>{
            res.json(dbUser);
        });
    });
    //Create new user
    app.get("/api/users", (req, res)=>{
        db.User.create(req.body)
        .then((dbUser)=>{
            res.json(dbUser);
        });
    });
    //Delete a user
    app.get("api/users/:id", (req, res)=>{
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then((dbUser)=>{
            res.jsondbUser;
        });
    })
}