function setup(middleware) {

  var router = require('express').Router();

  var config = {
    version: "v1",
    prefix: "sessions",
    router: router
  };
  
  router.get("/", function (req, res) {
    if (req.authorized(["admin"])) {
      req.db.
        User.getAdminPage({ all: req.query.page }).
        then(function (users) {
          res.send(arguments);
        }).
        catch(function (){
          req.send(arguments);
        });
    } else {
      res.status(403).send("Forbidden")
    }
  });


  return config;
}

module.exports.setup = setup;

