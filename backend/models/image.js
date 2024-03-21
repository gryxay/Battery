const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Image = sequelize.define('image', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false, freezeTableName: true });

module.exports = Image;
