const sequelize = require('../database/db');

const entities = {
  Item: require('./item'),
  Image: require('./image'),
  User: require('./user'),
  Order: require('./order'),
  ItemOrder: require('./itemOrder'),
  Address: require('./address'),
  Card: require('./card'),
  Details: require('./details')
};

entities.Item.hasMany(entities.Image);
entities.Image.belongsTo(entities.Item);
entities.User.hasMany(entities.Order);
entities.Order.belongsTo(entities.User);
entities.Item.belongsToMany(entities.Order, { through: entities.ItemOrder });
entities.Order.belongsToMany(entities.Item, { through: entities.ItemOrder });
entities.User.hasMany(entities.Address);
entities.Address.belongsTo(entities.User);
entities.User.hasMany(entities.Card);
entities.Card.belongsTo(entities.User);
entities.Item.hasOne(entities.Details);
entities.Details.belongsTo(entities.Item);

// Synchronize models with the database
// sequelize.sync({ force: true }).then(() => {
//   console.log('Models synchronized with the database.');
// }).catch(err => {
//   console.error('Unable to synchronize models with the database:', err);
// });
