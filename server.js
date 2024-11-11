const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});


app.post('/', (req, res) => {
  const { fname, email, message, phoneNumber } = req.body;

  
  if (!fname || !email || !message || !phoneNumber) {
    return res.status(400).send('Missing required fields');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ifiokaniebiet044@gmail.com', 
      pass: 'mpnw zoks egbn dmvz',
    },
    tls: {
      rejectUnauthorized: false       
    }
  });

  
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #1C1A4A;
            color: #fff;
            padding: 20px;
          }
          .container {
            background-color: #1C1A4A;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #fff;
          }
            img{
            width:130px;
            margin:0 auto;}
          p {
            font-size: 16px;
            color: #fff;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #fff;
          }
        </style>
      </head>
      <body>
        <div class="container">
        <img src="https://starpips-site.vercel.app/asset/img/hero/logo.png" alt=" the logo "/>

          <h1>New Message from: ${fname}</h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
        <div class="footer">
          <h3>Starpips Forex  Learn and Earn...</h3>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: email, 
    to: 'ifiokaniebiet@gmail.com',
    subject: `Message from ${fname}`,
    html: htmlContent,  
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
