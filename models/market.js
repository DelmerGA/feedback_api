"use strict";
module.exports = function(sequelize, DataTypes) {
  var Market = sequelize.define("Market", {
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Market;
};