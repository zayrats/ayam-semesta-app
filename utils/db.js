import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const sequelize = new Sequelize('u517506439_ayam_semesta', 'u517506439_ayam', 'Sury4t3g4r!', {
  host: 'zayratshop.com',
  dialect: 'mysql',
  dialectModule: mysql2,
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

export default sequelize;
