"use strict";
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    passwordDigest: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.UserScoreCard);
        this.hasMany(models.ScoreCard,{
          through: models.UserScoreCard
        });

        this.hasMany(models.UserRole);
        this.belongsToMany(models.Role, {
          through: models.UserRole
        });

        this.hasMany(models.UserRole, {
          as: "Grantors"
        });
      },
      createHelper: function (params) {
        var that = this;
        return sequelize.
          transaction(function (t) {
            return that.
            create(
              params.user, 
              {
                transaction: t
              }).
            then(function (user) {
              return user.
                addRoles(
                  params.roles, 
                  {
                    transaction: t
                  }).
                then(function () {
                  return user;
                });
          });
        });
      },
      createSecure: function (params) {
        var that = this;
        return Promise.promisify(bcrypt.genSalt)(10)
          .then(function (salt) {
            if (params.password === params.password_confirmation) {
              return Promise.promisify(bcrypt.hash)(params.password, salt);
            } else {
              throw new Error("PASSWORDS MUST MATCH");
            }
          }).
          then(function (hash) {
            var newParams = {};

            newParams.user = { 
              firstName: params.firstName,
              lastName: params.lastName,
              email: params.email,
              passwordDigest: hash
            };

            newParams.roles = params.roles;
            return that.createHelper(newParams);
          });

      },
      authenticate: function (params) {
        return this.find({
          where: {
            email: params.email
          }
        }).then(function (user) {
          return user.confirm(params)
        })
      }
    },
    instanceMethods: {
      confirm: function (params) {
        var that = this;
        var compare = Promise.promisify(bcrypt.compare);
        return compare(params.password, that.passwordDigest)
            .then(function (res){
              if (res === false) { throw new Error("Comparison Error");}
              return that;
            });
      }
    }
  });
  return User;
};
