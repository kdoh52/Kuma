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
    app.post("/api/users", (req, res)=>{
        //db.User.create(req.body)
        db.User
        .create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
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