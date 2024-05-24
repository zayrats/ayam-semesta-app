import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

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
    type: DataTypes.TEXT('long'),
    allowNull: false
  }
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ message: 'Error fetching menu items' });
    }
  } else if (req.method === 'POST') {
    const { name, price, description, imageBase64 } = req.body;
    try {
      const newProduct = await Product.create({ name, price, description, imageBase64 });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error adding menu item:', error);
      res.status(500).json({ message: 'Error adding menu item' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
