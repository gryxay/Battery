const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  completed: DataTypes.BOOLEAN,
  date: DataTypes.DATE
}, { timestamps: false, freezeTableName: true });


module.exports = Order;