'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    quantity_type: DataTypes.STRING,
  }, {});
  Ingredient.associate = function(models) {
    // associations can be defined here
  };
  return Ingredient;
};