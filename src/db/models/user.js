'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "must be a valid email" }
        }
    },
    username: {
        type :DataTypes.STRING,
        allowNull: false,
        
    },
    password: {
        type :DataTypes.STRING,
        allowNull: false,
        
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Wiki, {
        foreignKey: "userId",
        as: "wikis"
    });
    User.belongsToMany(models.Wiki, { 
        as: 'collaborators', 
        through: models.Collaborator, 
        foreignKey: 'userId' 
    })
  };
  return User;
};