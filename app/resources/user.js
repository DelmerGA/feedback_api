function setup(middleware) {

  var router = require('express').Router();

  var config = {
    version: "v1",
    prefix: "users",
    router: router
  };

  middleware.permissions.attach(config);

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

  router.get("/:id", function (req, res) {
    if (req.authorized(["admin"])) {
      req.db.
        User.getAdminPage({
         details: req.params.id
       }).
        then(function (users) {
          res.send(arguments);
        }).
        catch(function (){
          res.send(arguments);
        });
    } else if (req.authorized(["student"])) {
      req.db.User
        .find({
          where: {
            id: req.params.id
          },
          include: [
            db.ScoreCard
          ]
        }).then(function (userInfo) {
          res.send(userInfo);
        }).catch(function (){
          res.status(500).send("OOPS");
        })
    }
  })

  return config;
}

module.exports.setup = setup;

