const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your DB connection

// Middleware to parse JSON bodies
router.use(express.json());

// Route to handle complaints
// Route to handle checking ticket status
router.post('/checkTicketStatus', async (req, res) => {
    const { ticket_id } = req.body;

    try {
        const [rows] = await db.promise().query('SELECT is_reviewed FROM complaint_details WHERE ticket_id = ?', [ticket_id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const status = rows[0].is_reviewed === 1 ? 'Reviewed' : 'Not Reviewed';
        res.json({ status });
    } catch (error) {
        console.error('Error in checkTicketStatus route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;
