// routes/login.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Ensure this is the correct path to your DB connection

// Route to handle login
router.post('/login', (req, res) => {
  const { email, passwd } = req.body;

  if (!email || !passwd) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Query to fetch the user with the given email
  const query = 'SELECT passwd, company_name FROM b2b_credentials WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { passwd: storedPassword, company_name } = results[0];

    if (storedPassword === passwd) {
      return res.status(200).json({ message: 'Login successful', company_name });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

module.exports = router;
