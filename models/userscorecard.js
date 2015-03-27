"use strict";
module.exports = function(sequelize, DataTypes) {
  var UserScoreCard = sequelize.define("UserScoreCard", {
    UserId: DataTypes.INTEGER,
    ScoreCardId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.ScoreCard);
        this.belongsTo(models.User);
      }
    }
  });
  return UserScoreCard;
};