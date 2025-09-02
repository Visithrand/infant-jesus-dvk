const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Debug environment configuration on startup
console.log('=== MAIL CONFIG CHECK ===');
console.log('MAIL_FROM:', process.env.MAIL_FROM || '❌ MISSING');
console.log('MAIL_APP_PASSWORD:', process.env.MAIL_APP_PASSWORD ? '✅ SET' : '❌ MISSING');
console.log('MAIL_TO:', process.env.MAIL_TO || '❌ MISSING (will use fallback below)');
console.log('=========================');

// Fallback defaults (edit these if you want hardcoded values)
const DEFAULT_MAIL_FROM = 'visithrand@gmail.com';
const DEFAULT_MAIL_APP_PASSWORD = 'qssqatorlbdwvnpu'; // 16-char Gmail App Password (no spaces)
const DEFAULT_MAIL_TO = 'infantjesusdvk@gmail.com';

// ✅ Middleware to parse JSON and handle CORS
app.use(cors());
app.use(express.json());

// ✅ GET route to check if server is running
app.get('/', (req, res) => {
  res.send('🚀 Server is running. Use POST /send-query to send data.');
});



// ✅ POST route to handle contact form query
app.post('/send-query', async (req, res) => {
  const { name, email, message } = req.body;

  const fromAddress = process.env.MAIL_FROM || DEFAULT_MAIL_FROM;
  const appPassword = process.env.MAIL_APP_PASSWORD || DEFAULT_MAIL_APP_PASSWORD;
  const toAddress = process.env.MAIL_TO || DEFAULT_MAIL_TO;

  if (!fromAddress || !appPassword) {
    return res.status(500).json({ success: false, message: 'Email service not configured' });
  }

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: fromAddress,
      pass: appPassword,
    },
  });

  // Mail content
  const mailOptions = {
    from: fromAddress,
    replyTo: email || fromAddress,
    to: toAddress,
    subject: 'New Query from Website',
    text: `Name: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nMessage: ${message || ''}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');
    res.status(200).json({ success: true, message: 'Query sent successfully' });
  } catch (error) {
    console.error('❌ Email send failed:', error);
    res.status(500).json({ success: false, message: 'Email failed to send' });
  }
});

// ✅ Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server is running at http://0.0.0.0:${port}`);
});