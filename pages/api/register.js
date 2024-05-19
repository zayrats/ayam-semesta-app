const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const sequelize = require('../../utils/db');

export default async function handler(req, res) {
  const { email, password, name, phone } = req.body;

  try {
    await sequelize.sync();  // Ensure the database is synced
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword, name, phone });

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);  // Log the error to the console
    res.status(500).json({ message: 'Internal server error' });
  }
}
