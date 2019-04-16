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
    }
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
        foreignKey: "userId",
        as: "owner"
    });
    Wiki.belongsToMany(models.User, { 
        as: 'collaborators', 
        through: models.Collaborator, 
        foreignKey: 'wikiId' 
    })    
  };
  return Wiki;
};