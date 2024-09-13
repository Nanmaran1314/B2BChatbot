const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your DB connection

// Middleware to parse JSON bodies
router.use(express.json());

// Route to handle complaints
router.post('/submit-complaint', (req, res) => {
  const { email, company_name, complaint } = req.body;

  // Validate input
  if (!email || !company_name || !complaint) {
    return res.status(400).json({ message: 'Email, company name, and complaint are required' });
  }

  // Generate a unique ticket ID
  const ticket_id = `TICKET-${Date.now()}`;

  // Insert complaint into the database
  const query = 'INSERT INTO complaint_details (email, company_name, complaint, ticket_id) VALUES (?, ?, ?, ?)';
  db.query(query, [email, company_name, complaint, ticket_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Return the ticket ID and company name
    res.status(200).json({ ticket_id, company_name });
  });
});

module.exports = router;
