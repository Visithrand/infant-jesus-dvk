const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001;

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

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'visithrand@gmail.com',
      pass: 'abcdabcdefghijmnop', // App password, NOT your Gmail password
    },
  });

  // Mail content
  const mailOptions = {
    from: email,
    to: 'infantjesusdvk@gmail.com',
    subject: 'New Query from Website',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
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