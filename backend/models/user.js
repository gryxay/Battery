const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(100),
  },
  password: {
    type: DataTypes.STRING(255),
  },
  type: {
    type: DataTypes.ENUM('admin', 'normal'),
    defaultValue: 'normal'
  }
}, { timestamps: false, freezeTableName: true });


module.exports = User;