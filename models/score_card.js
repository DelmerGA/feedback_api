"use strict";
module.exports = function(sequelize, DataTypes) {
  var ScoreCard = sequelize.define("ScoreCard", {
    comprehension: DataTypes.INTEGER,
    attitude: DataTypes.INTEGER,
    collaboration: DataTypes.INTEGER,
    application: DataTypes.INTEGER,
    improvement: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.UserScoreCard);
        this.hasMany(models.User, {
          through: models.UserScoreCard
        })
      }
    }
  });
  return ScoreCard;
};