const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Item = sequelize.define('item', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  name: {
      type: DataTypes.STRING(60),
      allowNull: false
  },
  category: {
      type: DataTypes.STRING(50),
      allowNull: false
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false
},
  price: {
      type: DataTypes.FLOAT,
      allowNull: false
  },
  amount: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
}, { timestamps: false, freezeTableName: true });


module.exports = Item;