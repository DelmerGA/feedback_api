var fs = require('fs')
var path = require('path');

function Context (module, files) {
  this.collection  = module.exports;
  this.subFiles = files;
};

Context.prototype.forEach = function (cb) {
  var mod, key;
  mod = this.collection;
  for ( key in mod ) {
   if ( mod.hasOwnProperty(key) ) {
      cb(mod[key], key, mod);
    }
  }
  return this;
};

Context.prototype.map = function (cb) {
  results = {};
  this.forEach(function (_, key) {
    results[key] = cb.apply(null, arguments)
  });
  return results;
};

var exportSubFiles = function (dirName, module) {
  console.log("Exporting files from:", dirName);


  if (!fs.statSync(dirName).isDirectory()) { return []; }
  var files = fs.readdirSync(dirName).
    filter(function (file) {
      var filePath = path.join(dirName,file);
      var notDir = !(fs.statSync(filePath).isDirectory());
      var notIndex = file.match(/index\.js/) === null;
      if (notIndex && notDir) {
        return true;
      }
    });

  files.
    forEach(function (file) {
      var filePath = path.join(dirName,file);
      var fileName = file.match(/^(.*)\.js/)[1];
      module.exports[fileName] = require(filePath);
    });
    console.log("Exporting to:", path.basename(module.filename));
    console.log("Exported subFiles", files);

    return new Context(module, files);
};

module.exports.exportSubFiles = exportSubFiles;

