function MainMiddleware(mainRouter) {

  function attach(opts) {
    console.log("RUNNING")
    var path = require('path');
    var resourcePath = path.join('/api', opts.version, opts.prefix);
    console.log("RES PATH", resourcePath);
    mainRouter.use(resourcePath, opts.router);
  }

  return {
    attach: attach
  }
}

module.exports.setup = MainMiddleware;