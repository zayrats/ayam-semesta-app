const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Product = sequelize.define('products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  imageBase64: {
    type: DataTypes.TEXT('long'), // Menggunakan tipe TEXT untuk menyimpan data Base64 yang panjang
    allowNull: false
  }
});

module.exports = Product;
