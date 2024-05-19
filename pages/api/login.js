import User from '../../models/User';
import bcrypt from 'bcryptjs';
import sequelize from '../../utils/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await sequelize.sync();  // Ensure the database is synced
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Assuming you have a function to generate JWT token
      const token = generateToken(user); 

      res.status(200).json({ user, token });
    } catch (error) {
      console.error('Login error:', error);  // Log the error to the console
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Example function to generate a JWT token
function generateToken(user) {
  const jwt = require('jsonwebtoken');
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
