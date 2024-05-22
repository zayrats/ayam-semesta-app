const Product = require('../../../models/menu');
const sequelize = require('../../../utils/db');

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
  } else if (req.method === 'PUT') {
    const { id, name, price, description, imageBase64 } = req.body;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      product.name = name;
      product.price = price;
      product.description = description;
      product.imageBase64 = imageBase64;
      await product.save();
      res.status(200).json(product);
    } catch (error) {
      console.error('Error updating menu item:', error);
      res.status(500).json({ message: 'Error updating menu item' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
