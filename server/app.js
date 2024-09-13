const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRouter = require('./Routes/loginRouter'); // Update the path as needed
const submitComplaint = require('./Routes/complaintRoutes');
const checkTicketStatus = require('./Routes/checkTicketStatus');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api', loginRouter);
app.use('/api', submitComplaint);
app.use('/api', checkTicketStatus);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
