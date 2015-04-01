"use strict";

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.UserRole);
        this.belongsToMany(models.User, {
          through: models.UserRole
        })
      }
    }
  });

  return Role;
};
