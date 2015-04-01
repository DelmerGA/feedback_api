var db = require("../models");

[ 
    "defualt"
  , "admin"
  , "instructor"
  , "student"
].forEach(function (roleTitle) {
  db.Role.create({title: roleTitle});
})