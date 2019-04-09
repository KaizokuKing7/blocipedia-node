'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wiki = sequelize.define('Wiki', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body:{
        type: DataTypes.STRING,
        allowNull: false
    },
    private: {
        type: DataTypes.BOOLEAN,
        allownull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CollabId: {
        type: DataTypes.INTEGER
    }
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
        foreignKey: "userId"
    });
    Wiki.belongsToMany(models.User, {
        foreignKey: "CollabId",
        as: "collabs"
    });
  };
  return Wiki;
};