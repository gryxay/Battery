const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Details = sequelize.define('details', {
  manufacturer: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  weight: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  measurements: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  packaging: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
}, { timestamps: false, freezeTableName: true });

module.exports = Details;