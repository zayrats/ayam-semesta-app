import nextConnect from 'next-connect';
import { executeQuery } from '../../lib/db';

const handler = nextConnect();

// GET request untuk mengambil semua menu
handler.get(async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM menu');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST request untuk menambah menu baru
handler.post(async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const result = await executeQuery(
      'INSERT INTO menu (name, description, price) VALUES (?, ?, ?)',
      [name, description, price]
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default handler;
