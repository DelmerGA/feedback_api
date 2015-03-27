"use strict";
module.exports = function(sequelize, DataTypes) {
  var course = sequelize.define("Course", {
    title: DataTypes.STRING,
    sequence: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return course;
};