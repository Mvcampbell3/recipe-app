'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
  };
  return Recipe;
};