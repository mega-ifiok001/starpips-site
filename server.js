const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Enable CORS with specific options
const corsOptions = {
    origin: 'http://127.0.0.1:5500',  // Allow this origin (you can add more origins if needed)
    methods: ['GET', 'POST', 'OPTIONS'],  // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow these headers
};

app.use(cors(corsOptions));  // Applying CORS middleware with options
app.use(bodyParser.json()); // For parsing application/json data

// Nodemailer Transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ifiokaibiet@gmail.com',
        pass: '16062003mega'
    }
});

// POST route for contact form submissions
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.json({ message: 'Please fill out all required fields.' });
    }

    // Email options
    const mailOptions = {
        from: email,
        to: 'ifiokaniebiet@gmail.com',
        subject: `Contact Form Submission from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
        `
    };

    // Send email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({ message: 'There was an error sending your message.' });
        }
        res.json({ message: 'Thank you! Your message has been sent successfully.' });
    });
});

// Handle preflight requests for CORS
app.options('/contact', cors(corsOptions));

// Root route
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
