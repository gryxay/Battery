const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Address = sequelize.define('address', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  address: {
    type: DataTypes.STRING(255)
  },
  country: {
    type: DataTypes.STRING(50)
  },
  details: {
    type: DataTypes.STRING(255)
  },
  name: {
    type: DataTypes.STRING(50)
  },
  zip: {
    type: DataTypes.STRING(20)
  },
  number: {
    type: DataTypes.STRING(20)
  },
  region: {
    type: DataTypes.STRING(50)
  },
  city: {
    type: DataTypes.STRING(50)
  }
}, { timestamps: false, freezeTableName: true });


module.exports = Address;