var path = require('path');
var expJWT = require('express-jwt');
var bodyParser = require('body-parser');

function setup(mainRouter) {

  var isAuthorized = function isAuthorized(req, res, next) {
    req.authorized = function (scopes) {
      var l;
      for (l = scopes.length; l > -1; l = l - 1) {
        if (req.scopesObj[scopes[l]] !== undefined) {
          return true;
        }
      };
      return false;
    }
    next();
  };

  function attach(opts) {

    var resourcePath = path.join('/api', opts.version, opts.prefix);

    mainRouter.use(resourcePath, expJWT({
      secret: process.env.JWT_SECRET
    }));

    mainRouter.use(resourcePath, function (req, res, next) {
      var scopes, l, scopesObj;

      req.scopesObj = {};
      scopes = req.user.scopes;
      for (l = scopes.length, scopesObj = {}; l > -1; l = l - 1) {
        req.scopesObj[scopes[l]] = l; 
      };
      next();
    });

    mainRouter.use(resourcePath, isAuthorized);

    return mainRouter;
  }


  return {
    attach: attach
  };
}

module.exports.setup = setup
