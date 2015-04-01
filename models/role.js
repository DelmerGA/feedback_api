"use strict";

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(db.UserRole);
        this.belongsToMany(db.User, {
          through: db.UserRole
        })
      }
    }
  });

  return Role;
};
