// pages/api/Product/index.js
// const Product = require('../../../models/menu');
import { Op } from 'sequelize';
import Product from '../../../models/menu';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { name, price, description, imageBase64 } = req.body;
  
      try {
        const newItem = await Product.create({
          name,
          price,
          description,
          imageBase64
        });
  
        res.status(201).json(newItem);
      } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else if (req.method === 'GET') {
      try {
        const menuItems = await Product.findAll();
        res.status(200).json(menuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }