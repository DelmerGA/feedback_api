var db = require("../models");

// [ 
//     "defualt"
//   , "admin"
//   , "instructor"
//   , "student"
// ].forEach(function (roleTitle) {
//   db.Role.create({title: roleTitle});
// })

db.Role.find({
  where: {
    title: "defualt"
  }
}).
then(function (role){
  return db.User.createSecure({
    email: 'bbb',
    password: 'bbb',
    password_confirmation: 'bbb',
    roles: [role]
  })
}).
then(function (user){
  console.log("USERING")
  console.log(user);
})