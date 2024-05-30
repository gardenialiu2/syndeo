const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const postmark = require('postmark');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Postmark client
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API endpoint to send an email
app.post('/api/sendEmail', (req, res) => {
    console.log('Received request to send email');
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ error: 'Email, subject, and message are required' });
    }

    const emailParams = {
        "From": "gardenialiu@college.harvard.edu",
        "To": email,
        "Subject": subject,
        "TextBody": message
    };

    postmarkClient.sendEmail(emailParams, (error, result) => {
        if (error) {
            console.error('Unable to send via postmark: ' + error.message);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent: ', result);
        res.json({ success: 'Email sent successfully' });
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});