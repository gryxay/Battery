const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  schema: 'public',
  define: {
    timestamps: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the PostgreSQL database:', err);
  });

module.exports = sequelize;