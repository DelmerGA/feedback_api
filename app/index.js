var middleware = require('./middleware');
var resources = require('./resources');

function setup (app) {
  console.log("SETTING UP APP");
  /*
     configure all middleware to reference
      the app module by calling midware.setup
      with 'app'
  */

  var setupMidware = middleware.
    map(function (midware, name) {
      console.log("Configuring Middleware:", name);
      if (midware.setup !== undefined) {
        return midware.setup(app);
      } else {
        return midware;
      }
    });

  console.log("Middleware configured!");

  console.log(setupMidware.main.attach.toString());
  // add basic app middleware
  setupMidware.app.attach(app);

  /*
    setup resources with configured 
      middleware and then add to app
  */
  console.log("Setting up resources!")
  resources.
    forEach(function (resource, resourceName, resources) {
      console.log("Setting up resource:", resourceName);
      if ( resource.setup !== undefined ) {
        // configure the resource
        var config = resource.setup(setupMidware);
        // attach resource to app
        setupMidware.main.attach(config);
        console.log("Setup resource:", resourceName)
      }
    });
}

module.exports.setup = setup;