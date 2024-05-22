import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('ayam_semesta', 'root', '', {
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
