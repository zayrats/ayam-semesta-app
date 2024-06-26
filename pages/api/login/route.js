// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import styles from '../../styles/Login.module.css';
// import User from '../../models/User';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import sequelize from '../../utils/db';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     try {
//       await sequelize.sync(); // Ensure the database is synced
//       const user = await User.findOne({ where: { email } });
//       if (!user) {
//         return res.status(400).json({ message: 'User not found' });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//       res.status(200).json({ user, token });
//     } catch (error) {
//       console.error('Login error:', error); // Log the error to the console
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../../../utils/db");
const { executeQuery } = require("../../../lib/db");
 
export default async function POST(req, res) {
  // if (req.method === 'POST') {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // await sequelize.sync(); // Ensure the database is synced
    const user = await executeQuery('SELECT * FROM menu WHERE email=${email}');
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Login error:", error); // Log the error to the console
    res.status(500).json({ message: "Internal server error" });
  }
  // } else {
  //   res.setHeader('Allow', ['POST']);
  //   res.status(405).end(`Method ${req.method} Not Allowed`);
  // }
}
