const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const ItemOrder = sequelize.define('item_order', {}, { timestamps: false, freezeTableName: true });


module.exports = ItemOrder;