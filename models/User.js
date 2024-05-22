const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user' // default role is user, can be 'admin'
  }
}, {
  timestamps: true // This will add the createdAt and updatedAt columns
});

module.exports = User;
