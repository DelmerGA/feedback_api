function setup(middleware) {

  var router = require('express').Router();

  var config = {
    version: "v1",
    prefix: "register",
    router: router
  };

  router.post("/", function (req, res) {
    if (req.body.user.kind !== "admin") {
      console.log(req.body.user)
      req.db.
        User.createSecure(req.body.user)
        .then(function (user) {
          var token = req.jwt.sign(user.dataValues, process.env.JWT_SECRET);
          res.send(token);
        })
    }
  });

  return config;
}

module.exports.setup = setup;

