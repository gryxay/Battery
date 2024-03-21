const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Card = sequelize.define('card', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  security_code: DataTypes.STRING(10),
  name: DataTypes.STRING(100),
  expiration: DataTypes.DATE,
  number: DataTypes.STRING(20)
}, { timestamps: false, freezeTableName: true });


module.exports = Card;