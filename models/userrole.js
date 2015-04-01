"use strict";

module.exports = function(sequelize, DataTypes) {
  var UserRole = sequelize.define("UserRole", {
    UserId: DataTypes.INTEGER,
    RoleId: DataTypes.INTEGER,
    GrantorId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.User);
        this.belongsTo(models.Role);
        this.belongsTo(models.User, {
          as: "Grantor"
        })
      }
    }
  });

  return UserRole;
};
