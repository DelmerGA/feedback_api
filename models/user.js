"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.UserScoreCard);
        this.hasMany(models.ScoreCard,{
          through: models.UserScoreCard
        });
      }
    }
  });
  return User;
};
