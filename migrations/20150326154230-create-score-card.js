"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("ScoreCards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      comprehension: {
        type: DataTypes.INTEGER
      },
      attitude: {
        type: DataTypes.INTEGER
      },
      collaboration: {
        type: DataTypes.INTEGER
      },
      application: {
        type: DataTypes.INTEGER
      },
      improvement: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("ScoreCards").done(done);
  }
};