const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Player extends Model {}

Player.init(
  {
    rotation: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    x: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    y: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },  
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }  
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'player'
  }
);

module.exports = Player;
