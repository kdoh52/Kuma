const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
//Protect API keys with environment variables
require("dotenv").config();


// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const HOST = process.env.PORT;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/profile-api-routes.js")(app);

//Image Storage
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});
//Upload
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
  //name from profile-setup.handlebars
}).single("img");

function checkFileType(file, cb){
  const fileTypes = /jpeg|jpg|png|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  //check mime type
  const mimeType = fileTypes.test(file.mimeType);

  if(mimeType && extname){
    return cb(null, true);
  }
  else{
    cb("Error: images only");
  }
}

//upload route
app.post('/upload', (req, res)=>{
  upload(req, res, (err) => {
    if(err){
      res.render({msg: err});
    }
    else{
      if(req.file == undefined){
        res.render("profile-setup", {
          msg: "Error: No File Selected"
        })
      }
      else{
        res.render("profile", {
          //msg: "File Uploaded",
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(()=>{
  app.listen(PORT, ()=>{
    console.log(`Server Started On PORT: ${PORT}`);
  });
});
